import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import classes from '../Meals/AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

const AvailableMeals = () => {

  const [mealData, setMealData] = useState([]);
  const {isLoading, error, sendRequest: fetchData} = useHttp();


    useEffect(() => {
      const processData = (data) => {
        const mealData = [];
        for(const mealKey in data){
          mealData.push(
            {
              id: mealKey, 
              name: data[mealKey].name, 
              description: data[mealKey].description, 
              price: data[mealKey].price
            })
        }
        setMealData(mealData);
      }
      fetchData({url:'https://food-order-0617-default-rtdb.firebaseio.com/meals.json'}, processData);
    }, [fetchData])

    let content;
    if(isLoading){
      content = <p>Loading data</p>
    }
    if(error){
      content = <p>Something went wrong, please try again</p>
    }

    const meals = mealData.map(meal => 
        <MealItem 
            id= {meal.id} 
            key= {meal.id} 
            name={meal.name} 
            description={meal.description} 
            price={meal.price}
        />)
    return(
        <section className={classes.meals}>
            {isLoading && <Card><p>Loading...</p></Card>}
            {error && <Card><p>Something went wrong, please try again</p></Card>}
            {!isLoading && !error && 
              <Card>
                  <ul>{meals}</ul>
              </Card>
            }
        </section>
    )
}

export default AvailableMeals;