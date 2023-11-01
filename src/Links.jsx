import {Routes, Route} from 'react-router-dom'

// Import Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Project from './pages/Project'
import Birds from './pages/Birds'


// Import Components
import Post from './components/Post'
import SingleProject from './components/SingleProject'
import Bird from './components/Bird'
import BirdsViaKinds from './pages/BirdsViaKinds'


// Import Shop Pages
import Shopfront from './pages/Shopfront'
import Product from './components/Product'


const Links = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='/projects' element={<Project/>}/>
        <Route path='/project/:id' element={<SingleProject/>}/>
        <Route path='/birds' element={<Birds/>}/>
        <Route path='/birds/:id' element={<Bird/>}/>
        <Route path='/kind/:id' element={<BirdsViaKinds/>}/>
        
        {/* Shop Pages */}
        <Route path="/shop" element={<Shopfront/>}/>
        <Route path="/product/:id" element={<Product/>}/>
    </Routes>
  )
}

export default Links
