import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import RecentlyAdded from './components/RecentlyAdded'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudyPage from './components/CaseStudyPage'
import ThreadsDemoPage from './components/ThreadsDemoPage'
import PrReviewDemoPage from './components/PrReviewDemoPage'
import ArcadePage from './components/ArcadePage'
import ComingSoonPage from './components/ComingSoonPage'

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
        <Route path="/case-study/case-study-launch/demo" element={<ThreadsDemoPage />} />
        <Route path="/case-study/case-study-platform/demo" element={<PrReviewDemoPage />} />
        <Route path="/arcade" element={<ArcadePage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
      </Routes>
      <Footer />
    </>
  )
}
