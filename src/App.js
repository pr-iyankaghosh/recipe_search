import "./app.css";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Cuisines from "./pages/Cuisines";
import SingleRecipe from "./pages/SingleRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

function App() {
  const location = useLocation();
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  
  return (
    <StyledThemeProvider theme={{ isDarkMode }}>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cuisine/:type" element={<Cuisines />}></Route>
            <Route path="/recipe/:search" element={<SingleRecipe />}></Route>
            <Route
              path="/recipeDetails/:name"
              element={<RecipeDetails />}
            ></Route>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer>
        <FooterContainer>
          <FooterSection>
            <h3>Culinary</h3>
            <p>Discover delicious recipes from around the world. Our mission is to inspire home cooks with diverse and tasty meal ideas.</p>
          </FooterSection>
          <FooterSection>
            <h4>Explore</h4>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/cuisine/Italian">Italian</FooterLink>
            <FooterLink href="/cuisine/American">American</FooterLink>
            <FooterLink href="/cuisine/Thai">Thai</FooterLink>
            <FooterLink href="/cuisine/Japanese">Japanese</FooterLink>
            <FooterLink href="/cuisine/Indian">Indian</FooterLink>
          </FooterSection>
          <FooterSection>
            <h4>Connect With Us</h4>
            <SocialLinks>
              <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContainer>
        <Copyright>
          © {new Date().getFullYear()} Culinary. All rights reserved.
        </Copyright>
      </Footer>
    </StyledThemeProvider>
  );
}

const Footer = styled.footer`
  background-color: ${props => props.theme.isDarkMode ? '#222' : '#333'};
  color: #fff;
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
  border-top: 5px solid #FFB800;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #FFB800;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  h4 {
    color: #FFECB3;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  
  p {
    color: #ccc;
    line-height: 1.6;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #ccc;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #FFB800;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FFB800;
    color: #fff;
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #999;
  font-size: 0.9rem;
`;

export default App;
