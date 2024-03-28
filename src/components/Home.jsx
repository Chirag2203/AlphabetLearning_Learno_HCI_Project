import React from 'react'
import { JoinUs } from './JoinUs'
import { TestimonyPage } from './Testimonials'
import { About } from './About'
import Hero from './Hero'

const Home = () => {
  return (
    <div className='w-full'>
        <Hero/>
        <About />
        {/* <TestimonyPage/> */}
        <JoinUs />
      
    </div>
  )
}

export default Home
