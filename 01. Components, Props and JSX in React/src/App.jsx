import './App.css'

import Card from './components/Card'
import Navbar from './components/Navbar'
function App() {
  return (
    <>
      <Navbar/>
      
      <div className="main">

        <Card link='https://currenwatches.com.pk/cdn/shop/products/ec11af70f7f5a02faf8338e93a823e39_1445x.jpg?v=1716452915' category='Watch' heading='A watch is a compact timekeeping device designed for convenience and style.' author='janisar' />

        <Card link='https://c0.wallpaperflare.com/preview/932/979/739/dark-mode-black-late-night-work-inspiration.jpg' category='Laptop' heading='A laptop is a portable computer designed for convenience and mobility, featuring an integrated screen, keyboard, and battery.' author='janisar' />

      </div>



    </>
  )
}

export default App
