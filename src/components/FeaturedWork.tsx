import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function FeaturedWork() {
  return (
    <section className="relative z-[3] bg-base px-[4vw] py-14 hover:z-10">
      <h2 className="mb-3.5 text-xl font-bold text-[#e5e5e5]">Featured Work</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            edge={i === 0 ? 'first' : i === projects.length - 1 ? 'last' : 'middle'}
          />
        ))}
      </div>
    </section>
  )
}
