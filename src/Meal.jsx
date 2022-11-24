import React, { useState, useEffect } from 'react';

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=2bd207f7572842b3bb082bba4fdd1714&includeNutrition=false`
    )
      .then((response) => response.json())

      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log('error');
      });
  }, [meal.id]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />
      <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
        <li>Calories: {meal.calories}</li>
      </ul>

      <div className="recipeButton">
        <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">
          Go to Recipe
        </a>
      </div>
    </article>
  );
}
