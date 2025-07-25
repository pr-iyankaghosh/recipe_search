import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FaIceCream } from "react-icons/fa";

const DessertDishes = () => {
  const [desserts, setDesserts] = useState([]);
  const [filteredDesserts, setFilteredDesserts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeType, setActiveType] = useState("All");
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
    const topDesserts = [
      {
        id: 1,
        name: "Tiramisu",
        type: "Italian",
        image: "https://spoonacular.com/recipeImages/637162-556x370.jpg",
        description: "A coffee-flavored Italian dessert made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.",
        recipeId: 637162
      },
      {
        id: 2,
        name: "Chocolate Lava Cake",
        type: "Chocolate",
        image: "https://spoonacular.com/recipeImages/634006-556x370.jpg",
        description: "A popular dessert that combines the elements of a chocolate cake and a soufflé with a liquid chocolate center.",
        recipeId: 634006
      },
      {
        id: 3,
        name: "Apple Pie",
        type: "American",
        image: "https://spoonacular.com/recipeImages/632660-556x370.jpg",
        description: "A classic American dessert consisting of apple filling between two layers of pastry crust.",
        recipeId: 632660
      },
      {
        id: 4,
        name: "Crème Brûlée",
        type: "French",
        image: "https://spoonacular.com/recipeImages/640352-556x370.jpg",
        description: "A rich custard base topped with a layer of hardened caramelized sugar.",
        recipeId: 640352
      },
      {
        id: 5,
        name: "Cheesecake",
        type: "American",
        image: "https://spoonacular.com/recipeImages/641730-556x370.jpg",
        description: "A sweet dessert consisting of a thick, creamy filling on a crust, typically made with cream cheese.",
        recipeId: 641730
      },
      {
        id: 6,
        name: "Macarons",
        type: "French",
        image: "https://spoonacular.com/recipeImages/648439-556x370.jpg",
        description: "Sweet meringue-based confections made with egg white, icing sugar, granulated sugar, almond meal, and food coloring.",
        recipeId: 648439
      },
      {
        id: 7,
        name: "Baklava",
        type: "Middle Eastern",
        image: "https://spoonacular.com/recipeImages/633547-556x370.jpg",
        description: "A rich, sweet dessert pastry made of layers of filo filled with chopped nuts and sweetened with syrup or honey.",
        recipeId: 633547
      },
      {
        id: 8,
        name: "Mochi Ice Cream",
        type: "Japanese",
        image: "https://spoonacular.com/recipeImages/655219-556x370.jpg",
        description: "A Japanese dessert consisting of a small round ball of ice cream wrapped in a thin layer of mochi (pounded sticky rice).",
        recipeId: 655219
      },
      {
        id: 9,
        name: "Churros",
        type: "Spanish",
        image: "https://spoonacular.com/recipeImages/637876-556x370.jpg",
        description: "Fried dough pastry snacks, often dipped in chocolate sauce or dulce de leche.",
        recipeId: 637876
      }
    ];

    setDesserts(topDesserts);
    setFilteredDesserts(topDesserts);
    setIsLoading(false);
  }, []);

  // Filter desserts when type changes
  useEffect(() => {
    if (activeType === "All") {
      setFilteredDesserts(desserts);
    } else {
      const filtered = desserts.filter(dessert => dessert.type === activeType);
      setFilteredDesserts(filtered);
    }
  }, [activeType, desserts]);

  // Get unique types for filter buttons
  const types = ["All", ...new Set(desserts.map(dessert => dessert.type))];

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
          <FaIceCream className="icon" />
          Sweet Delights
          <TitleHighlight />
        </SectionTitle>
        <SectionDescription>Indulge in these delicious desserts from around the world</SectionDescription>
      </SectionHeader>

      <TypeFilter>
        {types.map(type => (
          <TypeButton 
            key={type}
            $active={activeType === type}
            onClick={() => setActiveType(type)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {type}
            {activeType === type && <ActiveIndicator layoutId="activeType" />}
          </TypeButton>
        ))}
      </TypeFilter>

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
          <LoadingText>Finding sweet treats...</LoadingText>
        </LoadingContainer>
      ) : (
        <AnimatePresence mode="wait">
          <DessertsGrid
            key={activeType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDesserts.map((dessert, index) => (
              <DessertCard
                key={dessert.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 } 
                }}
              >
                <Link to={`/recipeDetails/${dessert.recipeId}`}>
                  <TypeBadge>{dessert.type}</TypeBadge>
                  <DessertImage>
                    <img src={dessert.image} alt={dessert.name} />
                    <Gradient />
                  </DessertImage>
                  <DessertContent>
                    <h3>{dessert.name}</h3>
                    <p>{dessert.description}</p>
                    <ViewButton>
                      <span>View Recipe</span>
                      <ButtonArrow>→</ButtonArrow>
                    </ViewButton>
                  </DessertContent>
                </Link>
              </DessertCard>
            ))}
          </DessertsGrid>
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

const TypeFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const TypeButton = styled(motion.button)`
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

const DessertsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

const DessertCard = styled(motion.div)`
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

const TypeBadge = styled.div`
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

const DessertImage = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${DessertCard}:hover & img {
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

const DessertContent = styled.div`
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
  
  ${DessertCard}:hover & {
    background: #FFB800;
    
    span {
      color: white;
    }
  }
`;

const ButtonArrow = styled.span`
  transition: transform 0.3s ease;
  
  ${DessertCard}:hover & {
    transform: translateX(5px);
  }
`;

export default DessertDishes; 