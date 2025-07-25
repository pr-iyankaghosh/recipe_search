import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <LogoContainer to={"/"}>
          <LogoIcon 
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <GiKnifeFork />
          </LogoIcon>
          <Logo
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            CULINARY
          </Logo>
        </LogoContainer>
        
        {windowWidth <= 768 ? (
          <>
            <MobileControls>
              <ThemeToggle 
                onClick={toggleTheme} 
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mobile-theme-toggle"
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
                <ToggleRipple 
                  animate={{ 
                    scale: [1, 1.5, 1], 
                    opacity: [0, 0.2, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: 1 
                  }}
                />
              </ThemeToggle>
              <MobileMenuButton 
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </MobileMenuButton>
            </MobileControls>
            
            <AnimatePresence>
              {isMobileMenuOpen && (
                <MobileMenu
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MobileNavLinks>
                    <MobileNavLink 
                      to="/" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Home
                    </MobileNavLink>
                    <MobileNavLink 
                      to="/about" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      About
                    </MobileNavLink>
                    <MobileNavLink 
                      to="/contact" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Contact
                    </MobileNavLink>
                  </MobileNavLinks>
                </MobileMenu>
              )}
            </AnimatePresence>
          </>
        ) : (
          <NavLinks>
            <NavLinkAnimation
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <NavLink to="/">Home</NavLink>
            </NavLinkAnimation>
            <NavLinkAnimation
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <NavLink to="/about">About</NavLink>
            </NavLinkAnimation>
            <NavLinkAnimation
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <NavLink to="/contact">Contact</NavLink>
            </NavLinkAnimation>
            <ThemeToggle 
              onClick={toggleTheme} 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
              <ToggleRipple 
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [0, 0.2, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 1 
                }}
              />
            </ThemeToggle>
          </NavLinks>
        )}
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: ${props => props.theme?.isDarkMode ? '#222' : 'white'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  backdrop-filter: blur(10px);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 425px) {
    padding: 0 1rem;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
`;

const LogoIcon = styled(motion.div)`
  font-size: 2rem;
  color: #FFB800;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 425px) {
    font-size: 1.8rem;
  }
`;

const Logo = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme?.isDarkMode ? '#fff' : '#333'};
  letter-spacing: 1px;
  transition: color 0.3s ease;
  background: linear-gradient(to right, #FFB800, #FFA000);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0px 2px 4px rgba(255, 184, 0, 0.15);
  
  @media (max-width: 425px) {
    font-size: 1.3rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkAnimation = styled(motion.div)`
  position: relative;
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme?.isDarkMode ? '#ddd' : '#555'};
  transition: all 0.3s ease;
  position: relative;
  padding: 0.3rem 0;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #FFB800;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #FFB800;
    
    &::after {
      width: 100%;
    }
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme?.isDarkMode ? '#FFD54F' : '#FFB800'};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: ${props => props.theme?.isDarkMode ? '#FFECB3' : '#FF8F00'};
    background-color: ${props => props.theme?.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  &.mobile-theme-toggle {
    font-size: 1.1rem;
    padding: 0.4rem;
  }
`;

const ToggleRipple = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.theme?.isDarkMode ? 'rgba(255, 213, 79, 0.2)' : 'rgba(255, 184, 0, 0.2)'};
  border-radius: 50%;
  z-index: -1;
`;

// Mobile Menu Components
const MobileControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MobileMenuButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme?.isDarkMode ? '#ddd' : '#555'};
  font-size: 1.3rem;
  padding: 0.4rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #FFB800;
    background-color: ${props => props.theme?.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme?.isDarkMode ? '#222' : 'white'};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 99;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  
  @media (max-width: 425px) {
    padding: 1rem;
  }
`;

const MobileNavLink = styled(motion(Link))`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme?.isDarkMode ? '#ddd' : '#555'};
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme?.isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: #FFB800;
    padding-left: 0.5rem;
  }
`;

export default Navbar;
