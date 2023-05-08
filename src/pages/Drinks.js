import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import FilterComponent from '../components/FilterComponent';

const FILTER_NUMBER = 5;

function Drinks(props) {
  const { setTitle, dataDrinks } = useContext(AppContext);
  const { history } = props;
  const VALIDATE_ARRAY = 12;

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    async function fetchCategorys() {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      setCategorys(data.drinks);
    }
    fetchCategorys();
    setTitle('Drinks');
  });

  return (
    <main className="recipeContainer">
      <Header />
      <SearchBar />
      <Footer { ...props } />
      <section className="filters">
        {categorys.map((category, index) => (
          index < FILTER_NUMBER && <FilterComponent { ...category } key={ index } />
        ))}
      </section>
      <section className="cardContainer">
        {dataDrinks
          ? dataDrinks.map((meal, index) => {
            if (dataDrinks.length === 1) {
              history.push(`/drinks/${dataDrinks[0].idDrink}`);
            } else if (index < VALIDATE_ARRAY) {
              return (
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ meal.idDrink }
                  className="recipeCard"
                >
                  <p data-testid={ `${index}-card-name` }>{meal.strDrink}</p>
                  <img
                    src={ meal.strDrinkThumb }
                    width="100px"
                    alt={ meal.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              );
            }
            return index;
          }) : global.alert('Sorry, we haven\'t found any recipes for these filters.')}
      </section>
    </main>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
