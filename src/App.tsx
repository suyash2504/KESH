import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { BookingProvider } from './booking'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Booking } from './sections/Booking'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Offers } from './sections/Offers'
import { Reviews } from './sections/Reviews'
import { Services } from './sections/Services'
import { Studio } from './sections/Studio'
import { Stylists } from './sections/Stylists'
import { Visit } from './sections/Visit'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <BookingProvider>
          <Nav />
          <main>
            <Hero />
            <Studio />
            <Services />
            <Stylists />
            <Gallery />
            <Offers />
            <Reviews />
            <Booking />
            <Visit />
          </main>
          <Footer />
        </BookingProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
