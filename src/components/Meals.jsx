import React from 'react'
import MealItem from './MealItem';

export default function Meals() {
    const url = 'http://localhost:3000/meals';
    const [meals, setMeals] = React.useState([])

    React.useEffect(() => {
        try {
            async function fetchMeals() {
                const response = await fetch(url);
                const data = await response.json();
                setMeals(data);
            }
            fetchMeals();
        } catch (error) {
            console.log(error);
        }
    }, []);
    // console.log(meals);


    return (
        <ul id='meals'>
            {meals.map(meal => (
                <MealItem key={meal.id} {...meal} />
            ))}
        </ul>
    )
}
