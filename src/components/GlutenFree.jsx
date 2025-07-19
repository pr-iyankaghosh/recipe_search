import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GlutenFree = ({ filters }) => {
  const [glutenFree, setGlutenFree] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    getGlutenFree();
  }, []);

  // Apply filters when they change or when recipes change
  useEffect(() => {
    if (!glutenFree.length) return;
    
    // If no filters are active, show all recipes
    if (!Object.values(filters || {}).some(Boolean)) {
      setFilteredRecipes(glutenFree);
      return;
    }
    
    // Apply filters - for GlutenFree component, we already know all recipes are gluten-free
    const filtered = glutenFree.filter(recipe => {
      // High Protein filter (assuming recipes with > 15g protein per serving are high protein)
      if (filters?.highProtein && (!recipe.nutrition || recipe.nutrition.nutrients.find(n => n.name === "Protein")?.amount < 15)) {
        return false;
      }
      
      // Low Carb filter (assuming recipes with < 20g carbs per serving are low carb)
      if (filters?.lowCarb && (!recipe.nutrition || recipe.nutrition.nutrients.find(n => n.name === "Carbohydrates")?.amount >= 20)) {
        return false;
      }
      
      // Vegetarian filter
      if (filters?.vegetarian && !recipe.vegetarian) {
        return false;
      }
      
      // Non-Vegetarian filter
      if (filters?.nonVegetarian && recipe.vegetarian) {
        return false;
      }
      
      return true;
    });
    
    setFilteredRecipes(filtered);
  }, [filters, glutenFree]);

  const getGlutenFree = async () => {
    setIsLoading(true);
    const check = localStorage.getItem("glutenFree");

    try {
      if (check) {
        const parsedData = JSON.parse(check);
        setGlutenFree(parsedData);
        setFilteredRecipes(parsedData);
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=gluten-free`
        );
        const data = await api.json();
        console.log(data);
        setGlutenFree(data.recipes);
        setFilteredRecipes(data.recipes);
        localStorage.setItem("glutenFree", JSON.stringify(data.recipes));
      }
    } catch (error) {
      console.error("Error fetching gluten-free recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
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
      <SectionHeader variants={headerVariants}>
        <SectionTitle>
          Gluten-Free Delights
          <TitleHighlight />
        </SectionTitle>
        <SectionDescription>
          {Object.values(filters || {}).some(Boolean) 
            ? "Filtered gluten-free recipes based on your preferences" 
            : "Tasty recipes without gluten"}
        </SectionDescription>
      </SectionHeader>

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
          <LoadingText>Finding gluten-free recipes...</LoadingText>
        </LoadingContainer>
      ) : filteredRecipes.length === 0 ? (
        <NoResultsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NoResultsIcon>🍞</NoResultsIcon>
          <NoResultsText>No gluten-free recipes match your current filters</NoResultsText>
          <NoResultsSubtext>Try adjusting your dietary preferences</NoResultsSubtext>
        </NoResultsContainer>
      ) : (
        <Splide
          options={{
            perPage: 4,
            gap: "2rem",
            arrows: true,
            pagination: false,
            drag: "free",
            breakpoints: {
              1024: {
                perPage: 3,
              },
              768: {
                perPage: 2,
              },
              640: {
                perPage: 1,
              },
            },
          }}
        >
          {filteredRecipes.map((recipe, index) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card 
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/recipeDetails/${recipe.id}`}>
                    <CardImage>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                      <RecipeTag>Gluten Free</RecipeTag>
                      {recipe.vegetarian && (
                        <RecipeTag className="vegetarian">Vegetarian</RecipeTag>
                      )}
                      {recipe.lowCarb && (
                        <RecipeTag className="low-carb">Low Carb</RecipeTag>
                      )}
                      <RecipeTime>
                        <TimeIcon />
                        <span>{recipe.readyInMinutes} min</span>
                      </RecipeTime>
                    </CardImage>
                    <CardContent>
                      <h3 className="card-title">{recipe.title}</h3>
                      <CardMeta className="card-text">
                        <span>{recipe.readyInMinutes} min</span>
                        <span>•</span>
                        <span>{recipe.servings} servings</span>
                      </CardMeta>
                      <ViewRecipeButton>
                        <span>View Recipe</span>
                        <ButtonArrow>→</ButtonArrow>
                      </ViewRecipeButton>
                    </CardContent>
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      )}
    </SectionWrapper>
  );
};

const SectionWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
  position: relative;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 2.2rem;
  display: inline-block;
  position: relative;
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

const NoResultsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
`;

const NoResultsIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const NoResultsText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
  margin-bottom: 0.5rem;
`;

const NoResultsSubtext = styled.p`
  color: ${props => props.theme.isDarkMode ? '#ccc' : '#777'};
  font-size: 1rem;
`;

const Card = styled(motion.div)`
  overflow: hidden;
  border-radius: 15px;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  box-shadow: 0 5px 15px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  height: 100%;
  border-bottom: 3px solid #FFB800;
  
  a {
    display: block;
    height: 100%;
  }
`;

const CardImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const RecipeTag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 184, 0, 0.9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  z-index: 2;
  
  &.vegetarian {
    top: 50px;
  }
  
  &.low-carb {
    top: 90px;
  }
`;

const RecipeTime = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
`;

const TimeIcon = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 2px;
    background: white;
    transform: translate(-50%, -50%) rotate(45deg);
    transform-origin: 0 0;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 3rem;
    transition: color 0.3s ease;
  }
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.isDarkMode ? '#aaa' : '#777'};
  transition: color 0.3s ease;
  margin-bottom: 1rem;
  
  span {
    margin-right: 0.5rem;
  }

  span:first-child {
    color: #FFB800;
    font-weight: 600;
  }
`;

const ViewRecipeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.isDarkMode ? '#3d3d3d' : '#f9f9f9'};
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${props => props.theme.isDarkMode ? '#ddd' : '#555'};
  }
  
  ${Card}:hover & {
    background: ${props => props.theme.isDarkMode ? '#FFB800' : '#FFB800'};
    
    span {
      color: white;
    }
  }
`;

const ButtonArrow = styled.span`
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: translateX(5px);
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  z-index: 1;
`;

export default GlutenFree;
