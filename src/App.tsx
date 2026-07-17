import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import RecentlyAdded from './components/RecentlyAdded'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudyPage from './components/CaseStudyPage'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <RecentlyAdded />
      <About />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
      </Routes>
      <Footer />
    </>
  )
}
