import React from 'react';
import styles from './ingredients-item.module.css';
import { TIngredient } from '@/utils/types';
import { Price } from '@/components/price/price';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const IngredientsItem = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<>
			{ingredients.map((ingredient) => {
				return (
					<div className={styles.card} key={ingredient._id}>
						<img className={styles.image} src={ingredient.image} alt='' />
						<Price price={ingredient.price} />
						<span className={styles.name}>{ingredient.name}</span>
					</div>
				);
			})}
		</>
	);
};
