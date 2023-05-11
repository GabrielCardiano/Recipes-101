import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import FavoriteButton from './buttons/FavoriteButton';
import ShareButton from './buttons/ShareButton';
import AppContext from '../context/AppContext';

function RecipeInProgressMeals() {
  const location = useLocation();
  const { copyId } = useContext(AppContext);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [id, setId] = useState('');
  const [recipeButton, setRecipeButton] = useState([]);

  useEffect(() => {
    async function fetchRecipesMeals() {
      const idPage = location.pathname.split('/')[2];
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPage}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipe(data.meals);
      const objectEntries = Object.entries(data.meals[0]);
      const mapToFilterIngredients = objectEntries
        .filter((entrie) => entrie[0].includes('strIngredient'))
        .filter((ingredient) => ingredient[1]
      !== null && ingredient[1] !== '');
      setIngredients(mapToFilterIngredients);
      setRecipeButton({ ...data.meals[0] });
      setId(idPage);
    }
    fetchRecipesMeals();
  }, [location]);

  const handleClick = (index) => {
    const input = document.getElementById(`input-${index}`);
    input.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
  };

  return (
    recipe.map((recipeDetail) => (
      <div key={ recipeDetail.idMeal }>
        <img
          data-testid="recipe-photo"
          src={ recipeDetail.strMealThumb }
          alt="recipe-foto"
          width="300px"
        />
        <h3 data-testid="recipe-title">{recipeDetail.strMeal}</h3>
        <p data-testid="recipe-category">{recipeDetail.strCategory}</p>
        <section className="ingridients">
          {ingredients.map((recipeMeal, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ `${index}-ingredient-step` }
              id={ `input-${index}` }
            >
              <input
                id={ `${index}-ingredient-step` }
                type="checkbox"
                name={ `${index}-ingredient-step` }
                onClick={ () => handleClick(index) }
              />
              {recipeMeal[1]}
            </label>
          ))}
        </section>
        {copyId && <p>Link copied!</p>}
        <ShareButton id={ id } />
        <FavoriteButton recipe={ recipeButton } />
        <p data-testid="instructions">{recipeDetail.strInstructions}</p>
        <button data-testid="finish-recipe-btn"> Finalizar receita </button>
      </div>
    ))

  );
}

export default RecipeInProgressMeals;