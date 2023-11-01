import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import useCustomiser from './hooks/useCustomiser'

import Header from './components/Header'
import Footer from './components/Footer'
import Links from './Links'


function App() {
  const {bgColor, fontFamily, navColor} = useCustomiser()

  useEffect(() => {

// apply the bg color
document.body.style.backgroundColor = `#${bgColor}`

// Change the font based on the returned value
if (fontFamily === 'Abel') {
  document.body.style.fontFamily = `'Abel', sans-serif`
}
if (fontFamily === 'Cinzel') {
  document.body.style.fontFamily = `'Cinzel', serif`
}
if (fontFamily === 'Zilla Slab') {
  document.body.style.fontFamily = `'Zilla Slab', serif`
}

 // change nav colour
 document.getElementById("topnav").style.backgroundColor = `${navColor}`



  }, [bgColor, fontFamily, navColor])
  

  return (
    <HashRouter>
      <Header/>
      <Links/>
      <Footer/>
    </HashRouter>
  )
}

export default App
