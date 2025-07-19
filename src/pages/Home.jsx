import React from "react";
import GlutenFree from "../components/GlutenFree";
import Lowcarb from "../components/Lowcarb";
import Popular from "../components/Popular";
import Veggie from "../components/Veggie";
import { motion } from "framer-motion";
import styled from "styled-components";

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

const Home = () => {
  return (
    <HomeContainer
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div variants={item}>
        <Popular />
      </motion.div>
      <motion.div variants={item}>
        <Veggie />
      </motion.div>
      <motion.div variants={item}>
        <Lowcarb />
      </motion.div>
      <motion.div variants={item}>
        <GlutenFree />
      </motion.div>
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
