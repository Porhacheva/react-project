import React from 'react';
import styles from './ingredients-group.module.css';
import { TIngredient } from '@/utils/types';
import { IngredientsItem } from '../ingredients-item/ingredients-item';

type TBurgerIngredientsProps = {
	groupName: string;
	groupItems: TIngredient[];
};

export const IngredientsGroup = ({
	groupName,
	groupItems,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<>
			<h2 className={styles.headline}>{groupName}</h2>
			<div className={styles.group}>
				{groupItems.map((item) => {
					return <IngredientsItem ingredient={item} key={item._id} />;
				})}
			</div>
		</>
	);
};
