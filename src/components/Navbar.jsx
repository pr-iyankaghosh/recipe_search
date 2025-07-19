import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

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
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
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
`;

const ToggleRipple = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.theme?.isDarkMode ? 'rgba(255, 213, 79, 0.2)' : 'rgba(255, 184, 0, 0.2)'};
  border-radius: 50%;
  z-index: -1;
`;

export default Navbar;
