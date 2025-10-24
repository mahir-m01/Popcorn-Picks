import { Link } from "react-router-dom";
import './Navbar.css'
import { AiFillHome, AiFillHeart } from 'react-icons/ai';

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/" style={{color: '#b5a7f7'}}>Popcorn Picks</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">
                <AiFillHome /> Home
            </Link>
            <Link to="/favorites" className="nav-link">
                <AiFillHeart /> Favorites
            </Link>
        </div>
    </nav>
}

export default NavBar