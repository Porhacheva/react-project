import { TIngredient } from '@utils/types.ts';
import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorList } from './constructor-list/constructor-list';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const ingredientsList: TIngredient[] = [];
	function createBurger() {
		ingredientsList.push(
			ingredients[1],
			ingredients[3],
			ingredients[1],
			ingredients[9],
			ingredients[10],
			ingredients[5],
			ingredients[6],
			ingredients[7]
		);
		ingredientsList.unshift(ingredients[0]);
		ingredientsList.push(ingredients[0]);
	}
	createBurger();
	return (
		<section className={styles.burger_constructor}>
			<ConstructorList ingredients={ingredientsList} />
		</section>
	);
};
