import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Arrival from '../components/Arrival'
import Footer from '../components/Footer'
import CTA from '../components/CTA'
import { Outlet } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className=''>
        <Nav />
        <Hero />
        <Arrival />
        <CTA />
        <Footer />
        <Outlet />
    </div>
  )
}

export default HomePage