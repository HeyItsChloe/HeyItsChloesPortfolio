import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const WIDTH = 720
const HEIGHT = 560
const PLAYER_W = 32
const PLAYER_H = 24
const PLAYER_SPEED = 320
const BULLET_SPEED = 480
const ENEMY_BULLET_SPEED = 260
const ENEMY_W = 28
const ENEMY_H = 22
const ROWS = 4
const COLS = 8
const GRID_PAD_X = 48
const GRID_TOP = 70
const GRID_GAP_X = 18
const GRID_GAP_Y = 16

type Enemy = {
  x: number
  y: number
  gridX: number
  gridY: number
  alive: boolean
  boss: boolean
  hp: number
  diving: boolean
  diveT: number
  diveStartX: number
  diveStartY: number
}

type Bullet = { x: number; y: number; vy: number }

type GameState = 'start' | 'playing' | 'gameover'

export default function ArcadePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<GameState>('start')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [wave, setWave] = useState(1)

  const stateRef = useRef<GameState>('start')
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const waveRef = useRef(1)

  const playerX = useRef(WIDTH / 2 - PLAYER_W / 2)
  const keys = useRef<Record<string, boolean>>({})
  const bullets = useRef<Bullet[]>([])
  const enemyBullets = useRef<Bullet[]>([])
  const enemies = useRef<Enemy[]>([])
  const formationDir = useRef(1)
  const formationOffset = useRef(0)
  const fireCooldown = useRef(0)
  const diveCooldown = useRef(1.5)
  const invuln = useRef(0)

  function spawnWave(waveNum: number) {
    const list: Enemy[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const boss = r === 0 && (c === 2 || c === 5)
        list.push({
          x: GRID_PAD_X + c * (ENEMY_W + GRID_GAP_X),
          y: GRID_TOP + r * (ENEMY_H + GRID_GAP_Y),
          gridX: GRID_PAD_X + c * (ENEMY_W + GRID_GAP_X),
          gridY: GRID_TOP + r * (ENEMY_H + GRID_GAP_Y),
          alive: true,
          boss,
          hp: boss ? 2 : 1,
          diving: false,
          diveT: 0,
          diveStartX: 0,
          diveStartY: 0,
        })
      }
    }
    enemies.current = list
    formationOffset.current = 0
    formationDir.current = 1
    void waveNum
  }

  function resetGame() {
    scoreRef.current = 0
    livesRef.current = 3
    waveRef.current = 1
    setScore(0)
    setLives(3)
    setWave(1)
    playerX.current = WIDTH / 2 - PLAYER_W / 2
    bullets.current = []
    enemyBullets.current = []
    invuln.current = 2
    spawnWave(1)
  }

  function startGame() {
    resetGame()
    stateRef.current = 'playing'
    setState('playing')
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true
      if (e.key === ' ' && stateRef.current !== 'playing') {
        e.preventDefault()
        startGame()
      }
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let last = performance.now()

    function loop(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (stateRef.current === 'playing') {
        update(dt)
      }
      draw(ctx!)
      raf = requestAnimationFrame(loop)
    }

    function update(dt: number) {
      if (keys.current['ArrowLeft'] || keys.current['a'] || keys.current['A']) {
        playerX.current = Math.max(4, playerX.current - PLAYER_SPEED * dt)
      }
      if (keys.current['ArrowRight'] || keys.current['d'] || keys.current['D']) {
        playerX.current = Math.min(WIDTH - PLAYER_W - 4, playerX.current + PLAYER_SPEED * dt)
      }

      fireCooldown.current -= dt
      if ((keys.current[' '] || keys.current['Spacebar']) && fireCooldown.current <= 0) {
        bullets.current.push({ x: playerX.current + PLAYER_W / 2 - 2, y: HEIGHT - PLAYER_H - 44, vy: -BULLET_SPEED })
        fireCooldown.current = 0.28
      }

      for (const b of bullets.current) b.y += b.vy * dt
      bullets.current = bullets.current.filter((b) => b.y > -20)

      for (const b of enemyBullets.current) b.y += b.vy * dt
      enemyBullets.current = enemyBullets.current.filter((b) => b.y < HEIGHT + 20)

      const alive = enemies.current.filter((e) => e.alive)
      const speed = 40 + waveRef.current * 6
      formationOffset.current += formationDir.current * speed * dt
      if (Math.abs(formationOffset.current) > 60) {
        formationDir.current *= -1
      }

      diveCooldown.current -= dt
      if (diveCooldown.current <= 0 && alive.length > 0) {
        const candidates = alive.filter((e) => !e.diving)
        if (candidates.length > 0) {
          const diver = candidates[Math.floor(Math.random() * candidates.length)]
          diver.diving = true
          diver.diveT = 0
          diver.diveStartX = diver.gridX + formationOffset.current
          diver.diveStartY = diver.gridY
        }
        diveCooldown.current = Math.max(0.6, 1.8 - waveRef.current * 0.08)
      }

      for (const e of alive) {
        if (!e.diving) {
          e.x = e.gridX + formationOffset.current
          e.y = e.gridY
        } else {
          e.diveT += dt
          const t = e.diveT
          e.x = e.diveStartX + Math.sin(t * 2) * 90
          e.y = e.diveStartY + t * (110 + waveRef.current * 8)
          if (Math.random() < dt * 0.6) {
            enemyBullets.current.push({ x: e.x + ENEMY_W / 2 - 2, y: e.y + ENEMY_H, vy: ENEMY_BULLET_SPEED })
          }
          if (e.y > HEIGHT + 30) {
            e.diving = false
            e.diveT = 0
          }
        }
      }

      const py = HEIGHT - PLAYER_H - 40
      for (const b of bullets.current) {
        for (const e of alive) {
          if (!e.alive) continue
          if (b.x < e.x + ENEMY_W && b.x + 4 > e.x && b.y < e.y + ENEMY_H && b.y + 8 > e.y) {
            b.y = -999
            e.hp -= 1
            if (e.hp <= 0) {
              e.alive = false
              scoreRef.current += e.boss ? 200 : 50
              setScore(scoreRef.current)
            }
          }
        }
      }
      bullets.current = bullets.current.filter((b) => b.y > -20)

      if (invuln.current > 0) invuln.current -= dt
      if (invuln.current <= 0) {
        for (const e of alive) {
          if (!e.alive) continue
          const hitsPlayer =
            e.x < playerX.current + PLAYER_W &&
            e.x + ENEMY_W > playerX.current &&
            e.y < py + PLAYER_H &&
            e.y + ENEMY_H > py
          if (hitsPlayer) {
            e.alive = false
            loseLife()
          }
        }
        for (const b of enemyBullets.current) {
          const hit = b.x < playerX.current + PLAYER_W && b.x + 4 > playerX.current && b.y < py + PLAYER_H && b.y + 8 > py
          if (hit) {
            b.y = HEIGHT + 999
            loseLife()
          }
        }
        enemyBullets.current = enemyBullets.current.filter((b) => b.y < HEIGHT + 20)
      }

      if (enemies.current.every((e) => !e.alive)) {
        waveRef.current += 1
        setWave(waveRef.current)
        spawnWave(waveRef.current)
        invuln.current = 1.5
      }
    }

    function loseLife() {
      livesRef.current -= 1
      setLives(livesRef.current)
      invuln.current = 1.5
      if (livesRef.current <= 0) {
        stateRef.current = 'gameover'
        setState('gameover')
      }
    }

    function draw(c: CanvasRenderingContext2D) {
      c.fillStyle = '#05050a'
      c.fillRect(0, 0, WIDTH, HEIGHT)

      c.fillStyle = 'rgba(255,255,255,0.5)'
      for (let i = 0; i < 40; i++) {
        const sx = (i * 53) % WIDTH
        const sy = (i * 97 + (stateRef.current === 'playing' ? performance.now() * 0.02 : 0)) % HEIGHT
        c.fillRect(sx, sy, 2, 2)
      }

      if (stateRef.current === 'playing' || stateRef.current === 'gameover') {
        const py = HEIGHT - PLAYER_H - 40
        if (invuln.current <= 0 || Math.floor(performance.now() / 100) % 2 === 0) {
          c.fillStyle = '#39ff88'
          c.beginPath()
          c.moveTo(playerX.current + PLAYER_W / 2, py)
          c.lineTo(playerX.current, py + PLAYER_H)
          c.lineTo(playerX.current + PLAYER_W, py + PLAYER_H)
          c.closePath()
          c.fill()
        }

        c.fillStyle = '#ffe14d'
        for (const b of bullets.current) c.fillRect(b.x, b.y, 4, 12)
        c.fillStyle = '#ff4d6a'
        for (const b of enemyBullets.current) c.fillRect(b.x, b.y, 4, 12)

        for (const e of enemies.current) {
          if (!e.alive) continue
          c.fillStyle = e.boss ? '#c77dff' : e.hp > 1 ? '#ff9f1c' : '#4dd0ff'
          c.beginPath()
          c.ellipse(e.x + ENEMY_W / 2, e.y + ENEMY_H / 2, ENEMY_W / 2, ENEMY_H / 2, 0, 0, Math.PI * 2)
          c.fill()
          c.fillStyle = '#05050a'
          c.beginPath()
          c.ellipse(e.x + ENEMY_W / 2 - 6, e.y + ENEMY_H / 2, 3, 3, 0, 0, Math.PI * 2)
          c.ellipse(e.x + ENEMY_W / 2 + 6, e.y + ENEMY_H / 2, 3, 3, 0, 0, Math.PI * 2)
          c.fill()
        }
      }

      if (stateRef.current === 'start') {
        c.fillStyle = '#fff'
        c.textAlign = 'center'
        c.font = 'bold 28px Inter, sans-serif'
        c.fillText('ARCADE', WIDTH / 2, HEIGHT / 2 - 40)
        c.font = '15px Inter, sans-serif'
        c.fillStyle = '#b3b3b3'
        c.fillText('Arrow keys / A-D to move · Space to shoot', WIDTH / 2, HEIGHT / 2)
        c.fillStyle = '#39ff88'
        c.font = 'bold 16px Inter, sans-serif'
        c.fillText('Press Space to Start', WIDTH / 2, HEIGHT / 2 + 40)
      }

      if (stateRef.current === 'gameover') {
        c.fillStyle = 'rgba(5,5,10,0.75)'
        c.fillRect(0, 0, WIDTH, HEIGHT)
        c.fillStyle = '#ff4d6a'
        c.textAlign = 'center'
        c.font = 'bold 30px Inter, sans-serif'
        c.fillText('GAME OVER', WIDTH / 2, HEIGHT / 2 - 30)
        c.fillStyle = '#fff'
        c.font = '16px Inter, sans-serif'
        c.fillText(`Score: ${scoreRef.current}`, WIDTH / 2, HEIGHT / 2 + 4)
        c.fillStyle = '#39ff88'
        c.font = 'bold 15px Inter, sans-serif'
        c.fillText('Press Space to Play Again', WIDTH / 2, HEIGHT / 2 + 40)
      }
    }

    spawnWave(1)
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const touch = (dir: 'left' | 'right' | 'fire', down: boolean) => {
    const map = { left: 'ArrowLeft', right: 'ArrowRight', fire: ' ' }
    keys.current[map[dir]] = down
    if (dir === 'fire' && down && stateRef.current !== 'playing') startGame()
  }

  return (
    <div className="relative z-[4] min-h-screen bg-base px-[4vw] pb-16 pt-24">
      <div className="mx-auto max-w-[760px]">
        <Link to="/" className="mb-4 inline-block text-xs font-bold uppercase tracking-[3px] text-accent hover:underline">
          ← Back to portfolio
        </Link>
        <h1 className="mb-1 font-display text-[clamp(28px,4vw,44px)] leading-none">Arcade</h1>
        <p className="mb-4 text-sm text-[#b3b3b3]">
          A small formation shooter in the spirit of Galaga — not a pixel-perfect clone, just a fun break. No
          ship-capture mechanic, kept it simple.
        </p>

        <div className="mb-3 flex justify-between text-sm font-medium text-[#e5e5e5]">
          <span>Score: {score}</span>
          <span>Wave: {wave}</span>
          <span>Lives: {'▲'.repeat(Math.max(lives, 0))}</span>
        </div>

        <div className="overflow-hidden rounded-md border border-white/10">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            className="block w-full cursor-pointer bg-[#05050a]"
            onClick={() => state !== 'playing' && startGame()}
          />
        </div>

        <div className="mt-4 flex justify-center gap-3 sm:hidden">
          <button
            className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white active:bg-white/10"
            onTouchStart={() => touch('left', true)}
            onTouchEnd={() => touch('left', false)}
          >
            ◀
          </button>
          <button
            className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white active:bg-white/10"
            onTouchStart={() => touch('fire', true)}
            onTouchEnd={() => touch('fire', false)}
          >
            FIRE
          </button>
          <button
            className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white active:bg-white/10"
            onTouchStart={() => touch('right', true)}
            onTouchEnd={() => touch('right', false)}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
