import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";

const WorldDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCountry, setActiveCountry] = useState("All");
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const topWorldDishes = [
      {
        id: 1,
        name: "Sushi",
        country: "Japan",
        image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
        description: "A traditional Japanese dish consisting of vinegared rice with various toppings, usually seafood.",
        recipeId: 716429
      },
      {
        id: 2,
        name: "Pizza Margherita",
        country: "Italy",
        image: "https://spoonacular.com/recipeImages/715495-556x370.jpg",
        description: "A classic Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil.",
        recipeId: 715495
      },
      {
        id: 3,
        name: "Pad Thai",
        country: "Thailand",
        image: "https://spoonacular.com/recipeImages/716381-556x370.jpg",
        description: "A stir-fried rice noodle dish commonly served as street food in Thailand.",
        recipeId: 716381
      },
      {
        id: 4,
        name: "Biryani",
        country: "India",
        image: "https://spoonacular.com/recipeImages/642129-556x370.jpg",
        description: "A fragrant rice dish made with spices, rice, and meat or vegetables.",
        recipeId: 642129
      },
      {
        id: 5,
        name: "Paella",
        country: "Spain",
        image: "https://spoonacular.com/recipeImages/660306-556x370.jpg",
        description: "A Spanish rice dish with saffron and various meats, seafood, and vegetables.",
        recipeId: 660306
      },
      {
        id: 6,
        name: "Tacos",
        country: "Mexico",
        image: "https://spoonacular.com/recipeImages/715533-556x370.jpg",
        description: "Traditional Mexican dish consisting of a corn or wheat tortilla folded around a filling.",
        recipeId: 715533
      },
      {
        id: 7,
        name: "Pho",
        country: "Vietnam",
        image: "https://spoonacular.com/recipeImages/716217-556x370.jpg",
        description: "A Vietnamese soup consisting of broth, rice noodles, herbs, and meat.",
        recipeId: 716217
      },
      {
        id: 8,
        name: "Hamburger",
        country: "USA",
        image: "https://spoonacular.com/recipeImages/642540-556x370.jpg",
        description: "A sandwich consisting of a cooked patty of ground meat placed between slices of a bread roll.",
        recipeId: 642540
      },
      {
        id: 9,
        name: "Croissant",
        country: "France",
        image: "https://spoonacular.com/recipeImages/655219-556x370.jpg",
        description: "A buttery, flaky, French viennoiserie pastry inspired by the shape of the Austrian kipferl.",
        recipeId: 655219
      }
    ];

    setDishes(topWorldDishes);
    setFilteredDishes(topWorldDishes);
    setIsLoading(false);
  }, []);

  // Filter dishes when country changes
  useEffect(() => {
    if (activeCountry === "All") {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter(dish => dish.country === activeCountry);
      setFilteredDishes(filtered);
    }
  }, [activeCountry, dishes]);

  // Get unique countries for filter buttons
  const countries = ["All", ...new Set(dishes.map(dish => dish.country))];

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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionWrapper
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <SectionHeader>
        <SectionTitle>
          <FaGlobeAmericas className="icon" />
          World Famous Dishes
          <TitleHighlight />
        </SectionTitle>
        <SectionDescription>Explore iconic dishes from around the globe</SectionDescription>
      </SectionHeader>

      <CountryFilter>
        {countries.map(country => (
          <CountryButton 
            key={country}
            $active={activeCountry === country}
            onClick={() => setActiveCountry(country)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {country}
            {activeCountry === country && <ActiveIndicator layoutId="activeCountry" />}
          </CountryButton>
        ))}
      </CountryFilter>

      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <LoadingText>Discovering world cuisines...</LoadingText>
        </LoadingContainer>
      ) : (
        <AnimatePresence mode="wait">
          <DishesGrid
            key={activeCountry}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDishes.map((dish, index) => (
              <DishCard
                key={dish.id}
                variants={itemVariants}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
              >
                <Link to={`/recipeDetails/${dish.recipeId}`}>
                  <FlagBadge>{dish.country}</FlagBadge>
                  <DishImage>
                    <img src={dish.image} alt={dish.name} />
                    <Gradient />
                  </DishImage>
                  <DishContent>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                    <ViewButton>
                      <span>View Recipe</span>
                      <ButtonArrow>→</ButtonArrow>
                    </ViewButton>
                  </DishContent>
                </Link>
              </DishCard>
            ))}
          </DishesGrid>
        </AnimatePresence>
      )}
    </SectionWrapper>
  );
};

const SectionWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 6rem auto 4rem;
  padding: 0 1rem;
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 2.2rem;
  display: inline-block;
  position: relative;
  
  .icon {
    margin-right: 0.5rem;
    color: #FFB800;
    vertical-align: middle;
    font-size: 1.8rem;
  }
`;

const TitleHighlight = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(to right, rgba(255, 184, 0, 0.3), rgba(255, 160, 0, 0.1));
  border-radius: 4px;
  z-index: -1;
`;

const SectionDescription = styled.p`
  color: ${props => props.theme.isDarkMode ? '#ccc' : '#777'};
  font-size: 1.1rem;
  transition: color 0.3s ease;
`;

const CountryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const CountryButton = styled(motion.button)`
  background: ${props => props.$active 
    ? props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255, 184, 0, 0.1)'
    : props.theme.isDarkMode ? '#2d2d2d' : 'white'
  };
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  color: ${props => props.$active 
    ? '#FFB800' 
    : props.theme.isDarkMode ? '#ddd' : '#555'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => props.$active 
      ? props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.25)' : 'rgba(255, 184, 0, 0.15)'
      : props.theme.isDarkMode ? '#3d3d3d' : '#f5f5f5'
    };
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #FFB800;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 184, 0, 0.1);
  border-top-color: #FFB800;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: ${props => props.theme.isDarkMode ? '#ccc' : '#777'};
  font-size: 1rem;
`;

const DishesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const DishCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const FlagBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 184, 0, 0.9);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 10;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;

const DishImage = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${DishCard}:hover & img {
    transform: scale(1.05);
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  z-index: 1;
`;

const DishContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    transition: color 0.3s ease;
  }
  
  p {
    color: ${props => props.theme.isDarkMode ? '#ccc' : '#666'};
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
  }
`;

const ViewButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.isDarkMode ? '#3d3d3d' : '#f9f9f9'};
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  span {
    font-size: 0.95rem;
    font-weight: 500;
    color: ${props => props.theme.isDarkMode ? '#ddd' : '#555'};
  }
  
  ${DishCard}:hover & {
    background: #FFB800;
    
    span {
      color: white;
    }
  }
`;

const ButtonArrow = styled.span`
  transition: transform 0.3s ease;
  
  ${DishCard}:hover & {
    transform: translateX(5px);
  }
`;

export default WorldDishes; 