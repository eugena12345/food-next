
'use client'

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './DinnerParty.module.scss';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';

const DinnerParty = observer(({ }) => {
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const { dinnerPartyStore } = useRootStore();

    const calculateIngredients = () => {
        const ingredientsMap: Record<string, { amount: number; unit: string | null }> = {};

        dinnerPartyStore.recepiesDinner.forEach(recipe => {
            const servings = recipe.servings || 1;
            const multiplier = numberOfGuests / servings;

            recipe.ingradients?.forEach(ingredient => {
                const normalizedName = ingredient.name.toLowerCase().trim();
                const quantity = (ingredient.amount || 1) * multiplier;

                if (ingredientsMap[normalizedName]) {
                    ingredientsMap[normalizedName].amount += quantity;
                } else {
                    ingredientsMap[normalizedName] = {
                        amount: quantity,
                        unit: ingredient.unit
                    };
                }
            });
        });

        return ingredientsMap;
    };

    const ingredients = calculateIngredients();

    const handleRemoveRecipe = (recipeId: number) => {
        dinnerPartyStore.removeRecepeForDinner(recipeId);
    };

    return (
        <div className={styles.container}>
            <div className={styles[`container--maxWidth`]}>
                <h1>Menu Dinner Party</h1>
                <div className={styles.recipeList}>
                    {dinnerPartyStore.recepiesDinner.length === 0 
                    ? <>
                    <h1>No Recipes Found for Your Dinner Party</h1>
                    <p>Currently, there are no recipes available for your dinner party. To add recipes, please register an account. Once registered, you can navigate to the recipes page and click the knife and fork icon on a recipe card to add them here. After doing so, they will appear along with your shopping list.</p>
                    </> 
                    : dinnerPartyStore.recepiesDinner.map(recipe => (
                        <div className={styles.recipeItem} key={recipe.id}>
                            <img src={recipe.images[0]?.url} alt={recipe.name} />
                            <h2>{recipe.name}</h2>
                            <button onClick={() => handleRemoveRecipe(recipe.id)}>x</button>
                        </div>
                    ))}
                </div>

                <div className={styles.guestCount}>
                    <h2>Number of Guests</h2>
                    <button className={styles.btnChangeGuest} onClick={() => setNumberOfGuests(prev => Math.max(1, prev - 1))}>-</button>
                    <span>{numberOfGuests}</span>
                    <button className={styles.btnChangeGuest} onClick={() => setNumberOfGuests(prev => prev + 1)}>+</button>
                </div>

                <div className={styles.ingredientsList}>
                    <h2>Shopping List</h2>
                    <ul>
                        {Object.entries(ingredients).map(([name, { amount, unit }]) => (
                            <li key={name}>{`${name}: ${amount.toFixed(2)} ${unit || ''}`}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default DinnerParty;