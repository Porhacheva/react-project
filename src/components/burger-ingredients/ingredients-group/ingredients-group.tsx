import React from 'react';
import styles from './ingredients-group.module.css';
import { TIngredient } from '@/utils/types';
import { IngredientsItem } from '../ingredients-item/ingredients-item';

type TBurgerIngredientsProps = {
	groupName: string;
	groupItems: TIngredient[];
};

export const IngredientsGroup = React.forwardRef(
	(props: TBurgerIngredientsProps, ref) => {
		const { groupName, groupItems } = props;
		return (
			<>
				<h2 className={styles.headline} ref={ref}>
					{groupName}
				</h2>
				<div className={styles.group}>
					{groupItems.map((item) => {
						return <IngredientsItem ingredient={item} key={item._id} />;
					})}
				</div>
			</>
		);
	}
);
