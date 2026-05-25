import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './homepage/Hero.jsx'
import About from './homepage/About.jsx'
import Projects from './homepage/Projects.jsx'
import Achieves from './homepage/Achieves.jsx'
import Testimonial from './homepage/Testimonial.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './homepage/Layout.jsx'
import Homepage from './homepage/Homepage.jsx'
import ReactLenis from 'lenis/react'
import 'lenis/dist/lenis.css'
import Intro from './homepage/Intro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root options={{lerp: 0.08, duration: 1.2, smoothWheel: true, wheelMultiplier: 1.9}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route element={<Layout/>}>
            <Route path="/home" element={<Homepage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  </StrictMode>,
)
