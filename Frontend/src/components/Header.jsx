
import React, { useState, useEffect } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Page.css';
import LoginForm from './LoginForm';

const Header = ({ cartItemCount, setAuth, auth, setCart, cart }) => {
    const [isActive, setIsActive] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [activeLink, setActiveLink] = useState('/');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            const savedCart = JSON.parse(localStorage.getItem('userCart')) || [];
            setCart(savedCart);
        }
    }, [auth, setCart]);

    const handleBarClick = () => setIsActive(true);
    const handleCloseClick = () => setIsActive(false);
    const handleLoginClick = () => setShowLoginForm(true);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        console.log('Logging out...');
        // Save cart to local storage before clearing it
        localStorage.setItem('userCart', JSON.stringify(cart));
        setCart([]);
        setAuth(false);
        handleClose();
        navigate('/');
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        window.scrollTo(0, 0);
        navigate(link);
    };

    return (
        <section id="header">
            <Link to="/" onClick={() => handleLinkClick('/')}>
                <img src="./images/logo.png" alt="Logo" />
            </Link>
            <div>
                <ul id="navbar" className={isActive ? 'active' : ''}>
                    <li><Link to="/" className={activeLink === '/' ? 'active' : ''} onClick={() => handleLinkClick('/')}>Home</Link></li>
                    <li><Link to="/shop" className={activeLink === '/shop' ? 'active' : ''} onClick={() => handleLinkClick('/shop')}>Shop</Link></li>
                    <li><Link to="/contact" className={activeLink === '/contact' ? 'active' : ''} onClick={() => handleLinkClick('/contact')}>Contact</Link></li>
                    <li>
                        <Link to="/cart" className={activeLink === '/cart' ? 'active' : ''} onClick={() => handleLinkClick('/cart')}>
                            <ShoppingCartOutlinedIcon />
                            <span className="quantity">{cartItemCount}</span>
                        </Link>
                    </li>
                    {auth ? (
                        <li>
                            <IconButton size="large" edge="end" color="inherit" aria-label="account" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu}>
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={() => { handleClose(); navigate('/MyOrders'); }}>Orders</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </li>
                    ) : (
                        <Button id="login-button" onClick={handleLoginClick}>
                            Login<LoginIcon />
                        </Button>
                    )}
                    <div id="close" onClick={handleCloseClick}>
                        <i><CloseOutlinedIcon /></i>
                    </div>
                </ul>
            </div>
            
            <div id="mobile">
                <div id="bar" onClick={handleBarClick}>
                    <i><MenuOutlinedIcon /></i>
                </div>
                
            </div>

            {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} setAuth={setAuth} />}
        </section>
    );
};

export default Header;
