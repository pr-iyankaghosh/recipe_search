import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

const QuickDishes = () => {
  const quickDishes = [
    {
      id: 1,
      name: "Avocado Toast with Egg",
      image: "https://spoonacular.com/recipeImages/635446-556x370.jpg",
      time: "15 min",
      difficulty: "Easy",
      recipeId: 635446
    },
    {
      id: 2,
      name: "Quick Chicken Quesadillas",
      image: "https://spoonacular.com/recipeImages/715521-556x370.jpg",
      time: "20 min",
      difficulty: "Easy",
      recipeId: 715521
    },
    {
      id: 3,
      name: "Shrimp Pasta",
      image: "https://spoonacular.com/recipeImages/654812-556x370.jpg",
      time: "25 min",
      difficulty: "Medium",
      recipeId: 654812
    }
  ];

  return (
    <Container>
      <Header>
        <TitleContainer>
          <FaClock className="icon" />
          <Title>Quick & Easy Dishes</Title>
        </TitleContainer>
        <Subtitle>Ready in under 30 minutes</Subtitle>
      </Header>

      <CardsContainer>
        {quickDishes.map((dish, index) => (
          <Card
            key={dish.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                delay: index * 0.15,
                duration: 0.5
              }
            }}
            viewport={{ once: true }}
          >
            <Link to={`/recipeDetails/${dish.recipeId}`}>
              <CardImageContainer>
                <CardImage src={dish.image} alt={dish.name} />
                <TimeTag>{dish.time}</TimeTag>
              </CardImageContainer>
              <CardContent>
                <CardTitle>{dish.name}</CardTitle>
                <DifficultyBadge difficulty={dish.difficulty}>
                  {dish.difficulty}
                </DifficultyBadge>
              </CardContent>
            </Link>
          </Card>
        ))}
        
        <ViewMoreCard
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            transition: { 
              delay: quickDishes.length * 0.15,
              duration: 0.5
            }
          }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/cuisines">
            <ViewMoreContent>
              <ViewMoreText>View More Quick Recipes</ViewMoreText>
              <ViewMoreIcon>→</ViewMoreIcon>
            </ViewMoreContent>
          </Link>
        </ViewMoreCard>
      </CardsContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  .icon {
    color: #FFB800;
    font-size: 1.4rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.isDarkMode ? '#aaa' : '#777'};
  font-size: 1rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.12)'};
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 160px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TimeTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
  margin: 0;
`;

const DifficultyBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    if (props.difficulty === 'Easy') return props.theme.isDarkMode ? '#2d5f2d' : '#e6f7e6';
    if (props.difficulty === 'Medium') return props.theme.isDarkMode ? '#5f5f2d' : '#f7f7e6';
    return props.theme.isDarkMode ? '#5f2d2d' : '#f7e6e6';
  }};
  color: ${props => {
    if (props.difficulty === 'Easy') return props.theme.isDarkMode ? '#90ee90' : '#006400';
    if (props.difficulty === 'Medium') return props.theme.isDarkMode ? '#eeee90' : '#646400';
    return props.theme.isDarkMode ? '#ee9090' : '#640000';
  }};
  width: fit-content;
`;

const ViewMoreCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 184, 0, 0.05)'};
  border: 2px dashed ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.3)' : 'rgba(255, 184, 0, 0.2)'};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  a {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }
  
  &:hover {
    background: ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255, 184, 0, 0.1)'};
    border-color: ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.4)' : 'rgba(255, 184, 0, 0.3)'};
  }
`;

const ViewMoreContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
`;

const ViewMoreText = styled.p`
  font-weight: 600;
  color: #FFB800;
  margin-bottom: 0.5rem;
`;

const ViewMoreIcon = styled.span`
  font-size: 1.5rem;
  color: #FFB800;
  transition: transform 0.3s ease;
  
  ${ViewMoreCard}:hover & {
    transform: translateX(5px);
  }
`;

export default QuickDishes; 