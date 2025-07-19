import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const FeaturedDishes = () => {
  const featuredDishes = [
    {
      id: 1,
      name: "Garlic Butter Steak",
      image: "https://spoonacular.com/recipeImages/642539-556x370.jpg",
      cuisine: "American",
      rating: 4.9,
      prepTime: "25 mins",
      recipeId: 642539
    },
    {
      id: 2,
      name: "Spicy Thai Basil Chicken",
      image: "https://spoonacular.com/recipeImages/663050-556x370.jpg",
      cuisine: "Thai",
      rating: 4.8,
      prepTime: "20 mins",
      recipeId: 663050
    },
    {
      id: 3,
      name: "Creamy Mushroom Risotto",
      image: "https://spoonacular.com/recipeImages/640117-556x370.jpg",
      cuisine: "Italian",
      rating: 4.7,
      prepTime: "35 mins",
      recipeId: 640117
    },
    {
      id: 4,
      name: "Honey Glazed Salmon",
      image: "https://spoonacular.com/recipeImages/646512-556x370.jpg",
      cuisine: "Seafood",
      rating: 4.9,
      prepTime: "22 mins",
      recipeId: 646512
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    })
  };

  return (
    <Container>
      <Header>
        <Title>
          <span>Featured Dishes</span>
          <Underline />
        </Title>
        <ViewAll to="/cuisines">View All</ViewAll>
      </Header>

      <CardsWrapper>
        {featuredDishes.map((dish, index) => (
          <DishCard
            key={dish.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <Link to={`/recipeDetails/${dish.recipeId}`}>
              <CardImage>
                <img src={dish.image} alt={dish.name} />
                <CuisineTag>{dish.cuisine}</CuisineTag>
              </CardImage>
              <CardContent>
                <DishName>{dish.name}</DishName>
                <InfoRow>
                  <Rating>
                    <FaStar /> {dish.rating}
                  </Rating>
                  <PrepTime>{dish.prepTime}</PrepTime>
                </InfoRow>
                <ViewRecipe>
                  <span>View Recipe</span>
                  <Arrow>→</Arrow>
                </ViewRecipe>
              </CardContent>
            </Link>
          </DishCard>
        ))}
      </CardsWrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
`;

const Underline = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(to right, rgba(255, 184, 0, 0.4), rgba(255, 184, 0, 0.1));
  border-radius: 3px;
`;

const ViewAll = styled(Link)`
  color: #FFB800;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateX(5px);
  }
  
  &:after {
    content: "→";
    margin-left: 5px;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: translateX(3px);
  }
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
`;

const DishCard = styled(motion.div)`
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)'};
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CardImage = styled.div`
  height: 180px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${DishCard}:hover & img {
    transform: scale(1.08);
  }
`;

const CuisineTag = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 184, 0, 0.9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;

const CardContent = styled.div`
  padding: 1.2rem;
`;

const DishName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
  transition: color 0.3s ease;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  color: #FFB800;
  font-weight: 500;
  font-size: 0.9rem;
  
  svg {
    margin-right: 4px;
  }
`;

const PrepTime = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.isDarkMode ? '#aaa' : '#777'};
  display: flex;
  align-items: center;
  
  &:before {
    content: "⏱";
    margin-right: 4px;
  }
`;

const ViewRecipe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.isDarkMode ? '#3d3d3d' : '#f9f9f9'};
  padding: 0.7rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  span {
    font-size: 0.9rem;
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

const Arrow = styled.span`
  transition: transform 0.3s ease;
  
  ${DishCard}:hover & {
    transform: translateX(5px);
  }
`;

export default FeaturedDishes; 