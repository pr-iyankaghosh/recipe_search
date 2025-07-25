import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const RecipeDetails = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(
          `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailsData = await data.json();
        setDetails(detailsData);
        console.log(detailsData);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [params.name]);

  // Function to format instructions with proper numbering
  const formatInstructions = (instructions) => {
    if (!instructions) return { __html: "" };
    
    // Check if instructions already have HTML list items
    if (instructions.includes("<li>")) {
      return { __html: instructions };
    }
    
    // Split by periods or line breaks to create steps
    const steps = instructions
      .split(/\.\s+|[\r\n]+/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim() + (step.endsWith('.') ? '' : '.'));
    
    // Return formatted HTML
    return { __html: steps.map(step => `<li>${step}</li>`).join('') };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <DetailContainer>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          <LoadingText
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            Loading recipe...
          </LoadingText>
        </LoadingContainer>
      ) : (
        <DetailWrapper
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="image-container" variants={itemVariants}>
            <TitleContainer>
              <h2>{details.title}</h2>
              {details.diets && details.diets.length > 0 && (
                <DietTags>
                  {details.diets.map((diet, index) => (
                    <DietTag key={index}>{diet}</DietTag>
                  ))}
                </DietTags>
              )}
            </TitleContainer>
            {details.image && (
              <ImageWrapper
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img src={details.image} alt={details.title} />
                <ImageOverlay />
              </ImageWrapper>
            )}
            {details.readyInMinutes && (
              <RecipeInfo className="card">
                <InfoItem
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="label">Ready in</span>
                  <span className="value">{details.readyInMinutes} min</span>
                </InfoItem>
                <InfoItem
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="label">Servings</span>
                  <span className="value">{details.servings}</span>
                </InfoItem>
                {details.healthScore && (
                  <InfoItem
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="label">Health Score</span>
                    <span className="value">{details.healthScore}</span>
                  </InfoItem>
                )}
              </RecipeInfo>
            )}
          </motion.div>
          <Info variants={itemVariants}>
            <TabContainer>
              <Button
                className={activeTab === "instructions" ? "active button" : "button"}
                onClick={() => setActiveTab("instructions")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Instructions
              </Button>
              <Button
                className={activeTab === "ingredients" ? "active button" : "button"}
                onClick={() => setActiveTab("ingredients")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Ingredients
              </Button>
            </TabContainer>
            
            <TabContent className="tab-content">
              <AnimatedTabContent
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key={activeTab}
              >
                {activeTab === "instructions" && (
                  <div>
                    {details.instructions ? (
                      <InstructionsList dangerouslySetInnerHTML={formatInstructions(details.instructions)}></InstructionsList>
                    ) : (
                      <p className="card-text">No instructions available for this recipe.</p>
                    )}
                  </div>
                )}
                
                {activeTab === "ingredients" && (
                  <IngredientsList>
                    {details.extendedIngredients?.map((ingredient, index) => (
                      <IngredientItem
                        key={ingredient.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="ingredient-name card-text">{ingredient.original}</span>
                      </IngredientItem>
                    ))}
                  </IngredientsList>
                )}
              </AnimatedTabContent>
            </TabContent>
          </Info>
        </DetailWrapper>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 60vh;
  
  @media (max-width: 425px) {
    padding: 0 0.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 184, 0, 0.1);
  border-left-color: #FFB800;
  border-radius: 50%;
  margin-bottom: 1rem;
  
  @media (max-width: 425px) {
    width: 50px;
    height: 50px;
    border-width: 3px;
  }
`;

const LoadingText = styled(motion.p)`
  font-size: 1.2rem;
  color: #FFB800;
  font-weight: 500;
  
  @media (max-width: 425px) {
    font-size: 1rem;
  }
`;

const DetailWrapper = styled(motion.div)`
  margin: 5rem 0;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  @media (max-width: 768px) {
    margin: 3rem 0;
    gap: 2.5rem;
  }
  
  @media (max-width: 425px) {
    margin: 2rem 0;
    gap: 2rem;
  }
  
  .image-container {
    h2 {
      margin-bottom: 1rem;
      font-weight: 700;
      
      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
      
      @media (max-width: 425px) {
        font-size: 1.6rem;
      }
    }
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 425px) {
    margin-bottom: 1.2rem;
  }
  
  h2 {
    background: linear-gradient(to right, #FFB800, #FFA000);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    display: inline-block;
  }
`;

const DietTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 425px) {
    gap: 0.4rem;
    margin-top: 0.8rem;
  }
`;

const DietTag = styled.span`
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255, 184, 0, 0.1)'};
  color: ${props => props.theme.isDarkMode ? '#FFECB3' : '#FF8F00'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  
  @media (max-width: 425px) {
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
    border-radius: 15px;
  }
`;

const ImageWrapper = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  position: relative;
  
  @media (max-width: 425px) {
    border-radius: 10px;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%);
  pointer-events: none;
`;

const RecipeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border-radius: 10px;
  box-shadow: 0 4px 15px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  border-left: 4px solid #FFB800;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 425px) {
    padding: 1rem;
    margin-top: 1.2rem;
    border-left-width: 3px;
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .label {
    font-size: 0.9rem;
    color: ${props => props.theme.isDarkMode ? '#aaa' : '#777'};
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
    
    @media (max-width: 425px) {
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
    }
  }
  
  .value {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.isDarkMode ? '#FFECB3' : '#FFB800'};
    transition: color 0.3s ease;
    
    @media (max-width: 425px) {
      font-size: 1.1rem;
    }
  }
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 425px) {
    margin-bottom: 1.2rem;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
  border: none;
  border-radius: 10px;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  
  @media (max-width: 768px) {
    padding: 0.9rem 1.8rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 425px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
    margin-right: 0.8rem;
    border-radius: 8px;
  }
  
  &.active {
    background: linear-gradient(to right, #FFB800, #FFA000);
    color: white;
  }
  
  &:hover:not(.active) {
    background: ${props => props.theme.isDarkMode ? '#3d3d3d' : '#FFECB3'};
  }
`;

const TabContent = styled.div`
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  border-top: 3px solid #FFB800;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 425px) {
    padding: 1.2rem;
    border-radius: 10px;
    border-top-width: 2px;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 184, 0, 0.03), transparent);
    background-size: 200% 200%;
    animation: shine 3s infinite linear;
    pointer-events: none;
  }
  
  @keyframes shine {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 200% 200%;
    }
  }
`;

const AnimatedTabContent = styled(motion.div)`
  width: 100%;
`;

const InstructionsList = styled.ol`
  counter-reset: step-counter;
  list-style: none;
  
  li {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    position: relative;
    padding-left: 3rem;
    transition: color 0.3s ease;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 1.2rem;
    }
    
    @media (max-width: 425px) {
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      padding-left: 2.5rem;
    }
    
    &::before {
      content: counter(step-counter);
      counter-increment: step-counter;
      color: white;
      font-weight: bold;
      background: #FFB800;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 0.9rem;
      
      @media (max-width: 425px) {
        width: 24px;
        height: 24px;
        font-size: 0.8rem;
      }
    }
  }
`;

const IngredientsList = styled.ul`
  list-style-type: none;
`;

const IngredientItem = styled(motion.li)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
  
  @media (max-width: 425px) {
    font-size: 0.95rem;
    line-height: 1.6;
    padding-left: 1.8rem;
    margin-bottom: 0.8rem;
  }
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #FFB800;
    border-radius: 50%;
    box-shadow: 0 0 0 3px rgba(255, 184, 0, 0.2);
    
    @media (max-width: 425px) {
      width: 10px;
      height: 10px;
      box-shadow: 0 0 0 2px rgba(255, 184, 0, 0.2);
    }
  }
  
  .ingredient-name {
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    transition: color 0.3s ease;
  }
`;

export default RecipeDetails;
