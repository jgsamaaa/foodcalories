import React, { useState } from 'react';
import MealList from './MealList';

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(200);

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_FOOD_API}&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  function handleChange(e) {
    getMealData(e.target.value);
  }

  //NOTe When user press ENTER key to get daily meal plan
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setCalories(e.target.value);
    }
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 200)"
          onChange={handleChange}
        />
        <button onClick={getMealData} onKeyDown={handleKeyDown}>
          Get Daily Meal Plan
        </button>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default App;
