import React from 'react';
import styles from './constructor-list.module.css';
import { TIngredient } from '@/utils/types';
import { ConstructorItem } from '../constructor-item/constructor-item';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
	bun?: TIngredient;
};

export const ConstructorList = ({
	ingredients,
	bun,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<>
			{bun ? <ConstructorItem ingredient={bun} text='верх' /> : null}
			<div className={styles.list}>
				{ingredients.map((ingredient: TIngredient) => {
					if (ingredient.type !== 'bun')
						return (
							<ConstructorItem
								ingredient={ingredient}
								key={`${ingredient._id}`}
							/>
						);
				})}
			</div>
			{bun ? <ConstructorItem ingredient={bun} text='низ' /> : null}
		</>
	);
};
