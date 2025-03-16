import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import ScrollToTopComponent from '../../components/ScrollToTopComponent/ScrollToTopComponent'
import BottomMenuComponent from '../../components/BottomMenuComponent/BottomMenuComponent'

const DefaultLayout = ({ children }) => {
  return (
    <div>
        <Header />
        <div className='mt-24'>
          {children}
        </div>
        {/* <BottomMenuComponent /> */}
        <ScrollToTopComponent />
        <Footer />
    </div>
  )
}

export default DefaultLayout