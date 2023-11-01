import {Link} from 'react-router-dom'
import { X } from 'react-bootstrap-icons'


const MobileMenu = ({closeMethod}) => {
  return (
    <>
    <button id='close-nav-menu' onClick={closeMethod}>
      <X />
    </button>

    <ul id='mobile-menu'>

      {/* Mobile Nav Links */}
      <li>
        <Link to='/' onClick={closeMethod}>Home</Link>
      </li>
      <li>
        <Link to='/about' onClick={closeMethod}>About Us</Link>
      </li>

      <li>
        <Link to='/birds' onClick={closeMethod}>Our Birds</Link>
      </li>

      <li>
        <Link to='/projects' onClick={closeMethod}>Our Projects</Link>
      </li>

      <li>
        <Link to='/involved' onClick={closeMethod}>Get Involved</Link>
      </li>

      <li>
        <Link to='/library' onClick={closeMethod}>Library</Link>
      </li>

      <li>
        <Link to='/contact' onClick={closeMethod}>Contact Us</Link>
      </li>

      <li>
        <Link to='/shop' onClick={closeMethod}>Shop</Link>
      </li>

      <li>
        <Link to='/donate' onClick={closeMethod}>Donate</Link>
      </li>

    </ul>
  </>
  )
}

export default MobileMenu
