import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      navigate(`/recipe/${input}`);
    }
  };

  return (
    <SearchContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <FormStyle 
        onSubmit={handleSubmit}
        animate={{ 
          boxShadow: isFocused 
            ? "0 10px 25px rgba(255, 184, 0, 0.2)" 
            : "0 4px 15px rgba(0, 0, 0, 0.05)"
        }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <SearchIcon 
            animate={{ 
              scale: isFocused ? 1.1 : 1,
              rotate: isFocused ? [0, -10, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <FaSearch />
          </SearchIcon>
          <input
            onChange={(event) => setInput(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type="text"
            value={input}
            placeholder="Search for recipes..."
            className="input-text"
          />
          <AnimatePresence>
            {input && (
              <ClearButton
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setInput("")}
                type="button"
              >
                ×
              </ClearButton>
            )}
          </AnimatePresence>
        </div>
        <SearchButton 
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={!input.trim()}
        >
          Search
          <ButtonSparkles
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </SearchButton>
      </FormStyle>
      <SearchSuggestions
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span>Popular:</span>
        <SuggestionTag 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/recipe/pasta')}
        >
          Pasta
        </SuggestionTag>
        <SuggestionTag 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/recipe/chicken')}
        >
          Chicken
        </SuggestionTag>
        <SuggestionTag 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/recipe/vegetarian')}
        >
          Vegetarian
        </SuggestionTag>
        <SuggestionTag 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/recipe/dessert')}
        >
          Dessert
        </SuggestionTag>
      </SearchSuggestions>
    </SearchContainer>
  );
};

const SearchContainer = styled(motion.div)`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const FormStyle = styled(motion.form)`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border-radius: 50px;
  padding: 0.2rem;
  box-shadow: 0 4px 15px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 25px;
    padding: 0.2rem 0.2rem 0.8rem 0.2rem;
  }
  
  div {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  
  input {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    padding: 1rem 3rem;
    outline: none;
    border-radius: 50px;
    transition: color 0.3s ease;
    
    @media (max-width: 425px) {
      padding: 0.9rem 2.8rem;
      font-size: 0.9rem;
    }
    
    &::placeholder {
      color: ${props => props.theme.isDarkMode ? '#999' : '#aaa'};
      
      @media (max-width: 425px) {
        font-size: 0.9rem;
      }
    }
  }
`;

const SearchIcon = styled(motion.div)`
  position: absolute;
  left: 1rem;
  color: ${props => props.theme.isDarkMode ? '#999' : '#FFB800'};
  font-size: 1rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 425px) {
    left: 0.8rem;
    font-size: 0.9rem;
  }
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.isDarkMode ? '#999' : '#aaa'};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  line-height: 1;
  
  @media (max-width: 425px) {
    right: 0.8rem;
    font-size: 1.3rem;
  }
`;

const SearchButton = styled(motion.button)`
  background: linear-gradient(to right, #FFB800, #FFA000);
  border: none;
  padding: 0.8rem 2rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin-top: 0.8rem;
    width: 80%;
    align-self: center;
  }
  
  @media (max-width: 425px) {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    width: 90%;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(255, 184, 0, 0.4);
    filter: brightness(1.05);
  }
`;

const ButtonSparkles = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
`;

const SearchSuggestions = styled(motion.div)`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 425px) {
    margin-top: 0.8rem;
    gap: 0.4rem;
  }
  
  span {
    color: ${props => props.theme.isDarkMode ? '#aaa' : '#777'};
    font-size: 0.9rem;
    margin-right: 0.5rem;
    
    @media (max-width: 425px) {
      font-size: 0.8rem;
      margin-right: 0.3rem;
    }
  }
`;

const SuggestionTag = styled(motion.button)`
  background: ${props => props.theme.isDarkMode ? '#3d3d3d' : '#f0f0f0'};
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: ${props => props.theme.isDarkMode ? '#ddd' : '#555'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 425px) {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
  
  &:hover {
    background: ${props => props.theme.isDarkMode ? '#4d4d4d' : '#FFECB3'};
    color: ${props => props.theme.isDarkMode ? '#fff' : '#333'};
  }
`;

export default Search;
