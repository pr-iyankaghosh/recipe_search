import React, { useState, useCallback } from "react";
import GlutenFree from "../components/GlutenFree";
import Lowcarb from "../components/Lowcarb";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import DietaryFilter from "../components/DietaryFilter";
import Category from "../components/Category";
import Search from "../components/Search";
import WorldDishes from "../components/WorldDishes";
import DessertDishes from "../components/DessertDishes";
import FeaturedDishes from "../components/FeaturedDishes";
import QuickDishes from "../components/QuickDishes";
import { motion } from "framer-motion";
import styled from "styled-components";

const Home = () => {
  const [activeFilters, setActiveFilters] = useState({
    glutenFree: false,
    lowCarb: false,
    highProtein: false,
    vegetarian: false,
    nonVegetarian: false,
  });

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);
  }, []);

  // Determine which components to show based on filters
  const showPopular = !Object.values(activeFilters).some(Boolean) || 
    (activeFilters.highProtein && !activeFilters.glutenFree && 
     !activeFilters.lowCarb && !activeFilters.vegetarian && 
     !activeFilters.nonVegetarian);
  
  const showVeggie = !Object.values(activeFilters).some(Boolean) || 
    activeFilters.vegetarian;
  
  const showLowcarb = !Object.values(activeFilters).some(Boolean) || 
    activeFilters.lowCarb;
  
  const showGlutenFree = !Object.values(activeFilters).some(Boolean) || 
    activeFilters.glutenFree;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  return (
    <HomeContainer
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Search />
      <Category />
      <DietaryFilter onFilterChange={handleFilterChange} />
      
      <motion.div variants={item}>
        <FeaturedDishes />
      </motion.div>
      
      <motion.div variants={item}>
        <QuickDishes />
      </motion.div>
      
      <motion.div variants={item}>
        <WorldDishes />
      </motion.div>
      
      <motion.div variants={item}>
        <DessertDishes />
      </motion.div>
      
      {showPopular && (
        <motion.div variants={item}>
          <Popular filters={activeFilters} />
        </motion.div>
      )}
      
      {showVeggie && (
        <motion.div variants={item}>
          <Veggie filters={activeFilters} />
        </motion.div>
      )}
      
      {showLowcarb && (
        <motion.div variants={item}>
          <Lowcarb filters={activeFilters} />
        </motion.div>
      )}
      
      {showGlutenFree && (
        <motion.div variants={item}>
          <GlutenFree filters={activeFilters} />
        </motion.div>
      )}
      
      <BackgroundBlur />
      <BackgroundCircle1 />
      <BackgroundCircle2 />
    </HomeContainer>
  );
};

const HomeContainer = styled(motion.div)`
  position: relative;
  overflow-x: hidden;
  padding-bottom: 4rem;
`;

const BackgroundBlur = styled.div`
  position: fixed;
  top: 30%;
  left: -10%;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 184, 0, 0.15) 0%, rgba(255, 184, 0, 0) 70%);
  filter: blur(50px);
  z-index: -1;
  pointer-events: none;
`;

const BackgroundCircle1 = styled.div`
  position: fixed;
  top: 10%;
  right: -5%;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 160, 0, 0.1) 0%, rgba(255, 160, 0, 0) 70%);
  filter: blur(60px);
  z-index: -1;
  pointer-events: none;
`;

const BackgroundCircle2 = styled.div`
  position: fixed;
  bottom: -10%;
  right: 20%;
  width: 35%;
  height: 35%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 214, 0, 0.08) 0%, rgba(255, 214, 0, 0) 70%);
  filter: blur(80px);
  z-index: -1;
  pointer-events: none;
`;

export default Home;
