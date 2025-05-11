import React from 'react';
import styles from './ingredients-group.module.css';
import { TIngredient } from '@/utils/types';
import { IngredientsItem } from '../ingredients-item/ingredients-item';
type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const IngredientsGroup = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const buns: TIngredient[] = [];
	const mains: TIngredient[] = [];
	const sauces: TIngredient[] = [];

	function getGroups() {
		ingredients.forEach((ingredient) => {
			if (ingredient.type === 'bun') {
				buns.push(ingredient);
			}
			if (ingredient.type === 'main') {
				mains.push(ingredient);
			}
			if (ingredient.type === 'sauce') {
				sauces.push(ingredient);
			}
		});
	}
	getGroups();
	return (
		<>
			<section className={`${styles.section} custom-scroll`}>
				<h2 className={styles.headline}>Булки</h2>
				<div className={styles.group}>
					<IngredientsItem ingredients={buns} />
				</div>
				<h2 className={styles.headline}>Начинки</h2>
				<div className={styles.group}>
					<IngredientsItem ingredients={mains} />
				</div>
				<h2 className={styles.headline}>Соусы</h2>
				<div className={styles.group}>
					<IngredientsItem ingredients={sauces} />
				</div>
			</section>
		</>
	);
};
