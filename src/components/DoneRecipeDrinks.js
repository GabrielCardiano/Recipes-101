import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipeDrinks() {
  // const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  const arraytest = [
    {
      id: '12557',
      type: 'drink',
      nationality: '',
      category: '',
      alcoholicOrNot: 'alcoholic',
      name: 'vasco',
      image: 'naotem',
      doneDate: 'amanhã',
      tags: ['tag1', 'tag2', 'tag3'],
    },
  ];

  const [copiado, setCopiado] = useState(false);

  const handleShare = (id) => {
    console.log(id);
    setCopiado(true);
    const MN = 5000;
    setTimeout(() => {
      setCopiado(false);
    }, MN);
    // event.preventDefault();
    // setCopyId(id);
    copy(`http://localhost:3000/drinks/${id}`);
  };

  return (
    <div>
      { arraytest.length >= 1
      && arraytest.map((recipe, index) => (
        <div key={ index }>
          <a href={ `http://localhost:3000/drinks/${recipe.id}` }>
            <img
              src={ shareIcon }
              data-testid={ `${index}-horizontal-image` }
              alt="phot"
            />
            <h4 data-testid={ `"${index}-horizontal-name` }>
              {recipe.name}
            </h4>
          </a>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          {recipe.tags.map((tag, indextag) => (
            <p
              key={ indextag }
              data-testid={ `data-testid=${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.alcoholicOrNot }
          </p>
          <button
            onClick={ () => handleShare(recipe.id) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          { copiado && <p>Link Copied!</p>}
        </div>
      ))}
      <h1> Drinks </h1>

    </div>
  );
}

export default DoneRecipeDrinks;
