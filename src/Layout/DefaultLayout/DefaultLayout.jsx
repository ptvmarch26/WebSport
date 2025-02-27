import React from 'react'
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import ScrollToTopComponent from '../../components/ScrollToTopComponent/ScrollToTopComponent'

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header />
        <div className='mt-24'>
          {children}
        </div>
        <ScrollToTopComponent />
        <Footer />
    </div>
  )
}

export default DefaultLayout