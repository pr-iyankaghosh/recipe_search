import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import DietaryFilter from "../components/DietaryFilter";

const SingleRecipe = () => {
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    glutenFree: false,
    lowCarb: false,
    highProtein: false,
    vegetarian: false,
    nonVegetarian: false,
  });
  let params = useParams();

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // Apply filters when they change or when recipes change
  useEffect(() => {
    if (!singleRecipe.length) return;
    
    // If no filters are active, show all recipes
    if (!Object.values(activeFilters).some(Boolean)) {
      setFilteredRecipes(singleRecipe);
      return;
    }
    
    // Apply filters
    const filtered = singleRecipe.filter(recipe => {
      // Gluten Free filter
      if (activeFilters.glutenFree && !recipe.glutenFree) {
        return false;
      }
      
      // Vegetarian filter
      if (activeFilters.vegetarian && !recipe.vegetarian) {
        return false;
      }
      
      // Non-Vegetarian filter
      if (activeFilters.nonVegetarian && recipe.vegetarian) {
        return false;
      }
      
      // For lowCarb and highProtein, we need to fetch additional details
      // These will be handled when displaying the recipe details
      
      return true;
    });
    
    setFilteredRecipes(filtered);
  }, [activeFilters, singleRecipe]);

  const getSingleRecipe = async (name) => {
    setIsLoading(true);
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12&query=${name}&addRecipeInformation=true`
      );
      const data = await api.json();
      setSingleRecipe(data.results);
      setFilteredRecipes(data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleRecipe(params.search);
  }, [params.search]);

  return (
    <Container>
      <Header>
        <h2>Search Results for "{params.search}"</h2>
        <p>{filteredRecipes.length} recipes found</p>
      </Header>
      
      <DietaryFilter onFilterChange={handleFilterChange} />
      
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
          <LoadingText>Searching for recipes...</LoadingText>
        </LoadingContainer>
      ) : filteredRecipes.length === 0 ? (
        <NoResultsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NoResultsIcon>🍽️</NoResultsIcon>
          <NoResultsText>No recipes match your current filters</NoResultsText>
          <NoResultsSubtext>Try adjusting your dietary preferences</NoResultsSubtext>
        </NoResultsContainer>
      ) : (
        <Grid>
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => {
              return (
                <Card 
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/recipeDetails/${recipe.id}`}>
                    <ImageContainer>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                      {recipe.vegetarian && (
                        <RecipeTag>Vegetarian</RecipeTag>
                      )}
                      {recipe.glutenFree && (
                        <RecipeTag className="gluten-free">Gluten Free</RecipeTag>
                      )}
                      <RecipeTime>
                        <TimeIcon />
                        <span>{recipe.readyInMinutes} min</span>
                      </RecipeTime>
                    </ImageContainer>
                    <CardContent>
                      <h4>{recipe.title}</h4>
                      <CardMeta>
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
              );
            })}
          </AnimatePresence>
        </Grid>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin: 2rem 0;
  
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, #FFB800, #FFA000);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  
  p {
    color: ${props => props.theme.isDarkMode ? '#ccc' : '#777'};
    font-size: 1rem;
  }
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 2rem;
  margin: 2rem 0;
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
    text-decoration: none;
    display: block;
    height: 100%;
  }
`;

const ImageContainer = styled.div`
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

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  z-index: 1;
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
  
  &.gluten-free {
    top: 50px;
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
  
  h4 {
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

export default SingleRecipe;
