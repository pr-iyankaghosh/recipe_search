import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaCheck } from "react-icons/fa";
import { GiGrain, GiMuscleUp, GiCarrot, GiMeat } from "react-icons/gi";
import { MdOutlineNoFood } from "react-icons/md";

const DietaryFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    glutenFree: false,
    lowCarb: false,
    highProtein: false,
    vegetarian: false,
    nonVegetarian: false,
  });

  useEffect(() => {
    // Notify parent component when filters change
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const clearFilters = () => {
    setFilters({
      glutenFree: false,
      lowCarb: false,
      highProtein: false,
      vegetarian: false,
      nonVegetarian: false,
    });
  };

  return (
    <FilterContainer>
      <FilterButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-label="Filter recipes"
      >
        <FaFilter />
        <span>Filter</span>
        <FilterCount
          initial={{ scale: 0 }}
          animate={Object.values(filters).some(Boolean) ? { scale: 1 } : { scale: 0 }}
        >
          {Object.values(filters).filter(Boolean).length}
        </FilterCount>
      </FilterButton>

      <AnimatePresence>
        {isOpen && (
          <FilterDropdown
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <FilterHeader>
              <h3>Dietary Preferences</h3>
              <ClearButton onClick={clearFilters}>Clear All</ClearButton>
            </FilterHeader>

            <FilterOptions>
              <FilterOption 
                onClick={() => toggleFilter("glutenFree")}
                $active={filters.glutenFree}
                whileHover={{ backgroundColor: filters.glutenFree ? "#FFB800" : "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
              >
                <FilterIcon $active={filters.glutenFree}>
                  <GiGrain />
                  {filters.glutenFree && <CheckIcon><FaCheck /></CheckIcon>}
                </FilterIcon>
                <span>Gluten Free</span>
              </FilterOption>

              <FilterOption 
                onClick={() => toggleFilter("lowCarb")}
                $active={filters.lowCarb}
                whileHover={{ backgroundColor: filters.lowCarb ? "#FFB800" : "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
              >
                <FilterIcon $active={filters.lowCarb}>
                  <MdOutlineNoFood />
                  {filters.lowCarb && <CheckIcon><FaCheck /></CheckIcon>}
                </FilterIcon>
                <span>Low Carb</span>
              </FilterOption>

              <FilterOption 
                onClick={() => toggleFilter("highProtein")}
                $active={filters.highProtein}
                whileHover={{ backgroundColor: filters.highProtein ? "#FFB800" : "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
              >
                <FilterIcon $active={filters.highProtein}>
                  <GiMuscleUp />
                  {filters.highProtein && <CheckIcon><FaCheck /></CheckIcon>}
                </FilterIcon>
                <span>High Protein</span>
              </FilterOption>

              <FilterOption 
                onClick={() => toggleFilter("vegetarian")}
                $active={filters.vegetarian}
                whileHover={{ backgroundColor: filters.vegetarian ? "#FFB800" : "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
              >
                <FilterIcon $active={filters.vegetarian}>
                  <GiCarrot />
                  {filters.vegetarian && <CheckIcon><FaCheck /></CheckIcon>}
                </FilterIcon>
                <span>Vegetarian</span>
              </FilterOption>

              <FilterOption 
                onClick={() => toggleFilter("nonVegetarian")}
                $active={filters.nonVegetarian}
                whileHover={{ backgroundColor: filters.nonVegetarian ? "#FFB800" : "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
              >
                <FilterIcon $active={filters.nonVegetarian}>
                  <GiMeat />
                  {filters.nonVegetarian && <CheckIcon><FaCheck /></CheckIcon>}
                </FilterIcon>
                <span>Non-Vegetarian</span>
              </FilterOption>
            </FilterOptions>

            <ApplyButton
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Filters
            </ApplyButton>
          </FilterDropdown>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {Object.values(filters).some(Boolean) && (
          <ActiveFilters
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {filters.glutenFree && (
              <ActiveFilter
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter("glutenFree")}
              >
                <span>Gluten Free</span>
                <span className="remove">×</span>
              </ActiveFilter>
            )}
            {filters.lowCarb && (
              <ActiveFilter
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter("lowCarb")}
              >
                <span>Low Carb</span>
                <span className="remove">×</span>
              </ActiveFilter>
            )}
            {filters.highProtein && (
              <ActiveFilter
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter("highProtein")}
              >
                <span>High Protein</span>
                <span className="remove">×</span>
              </ActiveFilter>
            )}
            {filters.vegetarian && (
              <ActiveFilter
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter("vegetarian")}
              >
                <span>Vegetarian</span>
                <span className="remove">×</span>
              </ActiveFilter>
            )}
            {filters.nonVegetarian && (
              <ActiveFilter
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter("nonVegetarian")}
              >
                <span>Non-Vegetarian</span>
                <span className="remove">×</span>
              </ActiveFilter>
            )}
          </ActiveFilters>
        )}
      </AnimatePresence>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    margin: 0 auto 1.5rem auto;
  }
  
  @media (max-width: 425px) {
    padding: 0 0.5rem;
    margin: 0 auto 1.2rem auto;
  }
`;

const FilterButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
  box-shadow: 0 4px 15px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 425px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    gap: 0.4rem;
  }
  
  svg {
    color: #FFB800;
    font-size: 1.2rem;
    
    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }
  
  &:hover {
    box-shadow: 0 6px 20px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

const FilterCount = styled(motion.span)`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #FFB800;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 425px) {
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    top: -6px;
    right: -6px;
  }
`;

const FilterDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 300px;
  background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
  border-radius: 15px;
  box-shadow: 0 10px 30px ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 1.5rem;
  z-index: 100;
  
  @media (max-width: 425px) {
    width: 100%;
    padding: 1.2rem;
    border-radius: 12px;
  }
  
  @media (max-width: 375px) {
    padding: 1rem;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 20px;
    width: 16px;
    height: 16px;
    background: ${props => props.theme.isDarkMode ? '#2d2d2d' : 'white'};
    transform: rotate(45deg);
    z-index: -1;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.isDarkMode ? '#f5f5f5' : '#333'};
    
    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #FFB800;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 425px) {
    font-size: 0.8rem;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 425px) {
    gap: 0.6rem;
    margin-bottom: 1.2rem;
  }
`;

const FilterOption = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.$active 
    ? props.theme.isDarkMode 
      ? 'rgba(255, 184, 0, 0.2)' 
      : 'rgba(255, 184, 0, 0.1)'
    : props.theme.isDarkMode 
      ? '#3d3d3d' 
      : '#f9f9f9'
  };
  transition: all 0.3s ease;
  
  @media (max-width: 425px) {
    padding: 0.7rem;
    gap: 0.8rem;
  }
  
  span {
    font-size: 1rem;
    color: ${props => props.$active 
      ? '#FFB800' 
      : props.theme.isDarkMode 
        ? '#f5f5f5' 
        : '#555'
    };
    font-weight: ${props => props.$active ? '600' : '400'};
    transition: all 0.3s ease;
    
    @media (max-width: 425px) {
      font-size: 0.9rem;
    }
  }
`;

const FilterIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.$active 
    ? '#FFB800' 
    : props.theme.isDarkMode 
      ? '#4d4d4d' 
      : '#f0f0f0'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 425px) {
    width: 32px;
    height: 32px;
  }
  
  svg {
    font-size: 1.2rem;
    color: ${props => props.$active 
      ? 'white' 
      : props.theme.isDarkMode 
        ? '#ccc' 
        : '#777'
    };
    transition: all 0.3s ease;
    
    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }
`;

const CheckIcon = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 425px) {
    width: 14px;
    height: 14px;
    bottom: -1px;
    right: -1px;
  }
  
  svg {
    font-size: 0.6rem;
    color: #FFB800;
    
    @media (max-width: 425px) {
      font-size: 0.5rem;
    }
  }
`;

const ApplyButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(to right, #FFB800, #FFA000);
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 425px) {
    padding: 0.7rem;
    font-size: 0.9rem;
    border-radius: 6px;
  }
  
  &:hover {
    filter: brightness(1.05);
    box-shadow: 0 4px 8px rgba(255, 184, 0, 0.3);
  }
`;

const ActiveFilters = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 425px) {
    gap: 0.4rem;
    margin-top: 0.8rem;
  }
`;

const ActiveFilter = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.2)' : 'rgba(255, 184, 0, 0.1)'};
  color: ${props => props.theme.isDarkMode ? '#FFD54F' : '#FFB800'};
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 425px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }
  
  .remove {
    font-size: 1.2rem;
    line-height: 1;
    
    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }
  
  &:hover {
    background: ${props => props.theme.isDarkMode ? 'rgba(255, 184, 0, 0.3)' : 'rgba(255, 184, 0, 0.2)'};
  }
`;

export default DietaryFilter; 