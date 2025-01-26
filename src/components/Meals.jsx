import React from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

const requestConfig = { method: 'GET' };

export default function Meals() {
    const url = 'http://localhost:3000/meals';
    const { data: meals, isLoading, error } = useHttp(url, requestConfig, []);

    if (isLoading) {
        return <p>Loading meals...</p>;
    }

    return (
        <ul id='meals'>
            {meals.map(meal => (
                <MealItem key={meal.id} {...meal} />
            ))}
        </ul>
    )
}
