import { useEffect, useState } from 'react';
// import mobile menu
import MobileMenu from './MobileMenu'
import { Link } from 'react-router-dom'
import { List } from 'react-bootstrap-icons';
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_BASEURL

const Header = () => {
//set a state to check if the mobile menu is open or not
const [menuIsOpen, openMenu] = useState(false);
const [logoUrl, setLogoUrl] = useState('')


//fetch the logo with useEffect:
useEffect(() => {
    const fetchNavLogo = async () => {
        try {
            const response = await axios.get(`${baseUrl}wp-json/custom/v1/nav-logo`)
            if (response.status === 200) {
                const data = response.data
                console.log(response.data);
                setLogoUrl(data[0])
            } else {
                console.error("Failed to fetch logo URL")
            }
        } catch (error) {
            console.error("Error fetching lol URL" , error)
        }
    }
    fetchNavLogo();
}, [])



const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    document.body.classList.toggle('no-scroll');
}


  return (
    <>
    <div id='topnav'>
    <div id='logo'>
    <Link to="/">
                <img src={logoUrl} alt="West Coast Penguin Trust Website Logo"/>
    </Link>

  {/*<Link to="/">
    <img src="/src/assets/logo 400x400.jpg" alt="West Coast Penguin Trust Logo" />
  </Link> */}
</div>

       {/* Desktop Menu */}
       <ul id='menu'>
       <li>
               <Link to="/">Home</Link>
           </li>

           <li>
               <Link to="/about">About Us</Link>
           </li>

           <li>
               <Link to="/birds">Our Birds</Link>
           </li>

           <li>
               <Link to="/projects">Our Projects</Link>
           </li>

           <li>
               <Link to="/involved">Get Involved</Link>
           </li>

           <li>
               <Link to="/library">Library</Link>
           </li>

           <li>
               <Link to="/contact">Contact Us</Link>
           </li>

           <li>
               <Link to="/shop">Shop</Link>
           </li>
          
           <li>
               <Link to="/donate">Donate</Link>
           </li>
       </ul>

       {/* Hamburger on desktop */}
       <div id='menu-container'>
           <button id='menu-button' className='show-mobile-menu-button' onClick={toggleMobileMenu}>
               <List id='hamburger-icon'/>
           </button>
       </div>
    </div>

    {/* If menuIsOpen, show the mobile menu */}
    {/* give the mobile menu our close method as a prop */}
    {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu}/>}
   </>
  )
}

export default Header
