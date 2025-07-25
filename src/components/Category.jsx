import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks, GiIndianPalace } from "react-icons/gi";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const Category = () => {
  return (
    <CategoryContainer>
      <CategoryHeading
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Explore Cuisines</h2>
        <HeadingUnderline 
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </CategoryHeading>
      <List
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SLink 
          to={"/cuisine/Italian"}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-container">
            <IconWrapper>
              <FaPizzaSlice />
            </IconWrapper>
          </div>
          <h4>Italian</h4>
        </SLink>
        <SLink 
          to={"/cuisine/American"}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-container">
            <IconWrapper>
              <FaHamburger />
            </IconWrapper>
          </div>
          <h4>American</h4>
        </SLink>
        <SLink 
          to={"/cuisine/Japanese"}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-container">
            <IconWrapper>
              <GiChopsticks />
            </IconWrapper>
          </div>
          <h4>Japanese</h4>
        </SLink>
        <SLink 
          to={"/cuisine/Thai"}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-container">
            <IconWrapper>
              <GiNoodles />
            </IconWrapper>
          </div>
          <h4>Thai</h4>
        </SLink>
        <SLink 
          to={"/cuisine/Indian"}
          variants={itemVariants}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="icon-container">
            <IconWrapper>
              <GiIndianPalace />
            </IconWrapper>
          </div>
          <h4>Indian</h4>
        </SLink>
      </List>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto 4rem auto;
  padding: 0 1rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 1.5rem auto 3rem auto;
  }
  
  @media (max-width: 425px) {
    margin: 1rem auto 2.5rem auto;
  }
`;

const CategoryHeading = styled(motion.div)`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 425px) {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    margin-bottom: 0.8rem;
    font-weight: 600;
    font-size: 2rem;
    background: linear-gradient(to right, #FFB800, #FFA000);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
    
    @media (max-width: 425px) {
      font-size: 1.6rem;
      margin-bottom: 0.6rem;
    }
  }
`;

const HeadingUnderline = styled(motion.div)`
  height: 3px;
  background: linear-gradient(to right, #FFB800, #FFA000);
  border-radius: 4px;
  
  @media (max-width: 425px) {
    height: 2px;
  }
`;

const List = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 425px) {
    gap: 1rem;
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SLink = styled(motion(NavLink))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 150px;
  padding: 1.5rem 0;
  border-radius: 10px;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  box-shadow: 0 4px 15px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 130px;
    padding: 1.2rem 0;
  }
  
  @media (max-width: 425px) {
    width: 100px;
    padding: 1rem 0;
    border-radius: 8px;
  }
  
  @media (max-width: 375px) {
    width: 85px;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 25%, rgba(255, 184, 0, 0.1) 50%, transparent 75%);
    background-size: 200% 200%;
    background-position: 0% 0%;
    transition: background-position 0.5s ease;
    z-index: 0;
  }
  
  &:hover::before {
    background-position: 100% 100%;
  }
  
  .icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${props => props.theme.isDarkMode ? '#3d3d3d' : '#FFECB3'};
    margin-bottom: 0.8rem;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
      width: 55px;
      height: 55px;
    }
    
    @media (max-width: 425px) {
      width: 50px;
      height: 50px;
      margin-bottom: 0.6rem;
    }
    
    @media (max-width: 375px) {
      width: 45px;
      height: 45px;
    }
    
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid transparent;
      top: 0;
      left: 0;
      transition: all 0.3s ease;
    }
  }
  
  h4 {
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
    z-index: 1;
    
    @media (max-width: 425px) {
      font-size: 0.9rem;
    }
    
    @media (max-width: 375px) {
      font-size: 0.8rem;
    }
  }
  
  svg {
    color: ${props => props.theme.isDarkMode ? '#ccc' : '#FF8F00'};
    font-size: 1.8rem;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
    
    @media (max-width: 425px) {
      font-size: 1.4rem;
    }
    
    @media (max-width: 375px) {
      font-size: 1.2rem;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
    
    .icon-container {
      background: #FFB800;
      transform: scale(1.1);
      
      &::after {
        border-color: rgba(255, 184, 0, 0.3);
        transform: scale(1.2);
      }
    }
    
    svg {
      color: white;
      transform: scale(1.1);
    }
  }

  &.active {
    background: linear-gradient(to right, #FFB800, #FFA000);
    
    .icon-container {
      background: rgba(255, 255, 255, 0.2);
    }
    
    svg, h4 {
      color: white;
    }
  }
`;

export default Category;
