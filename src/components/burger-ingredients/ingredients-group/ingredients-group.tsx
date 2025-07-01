import React, { ReactNode } from 'react';
import styles from './ingredients-group.module.css';
import { TIngredient } from '@/utils/types';
import { IngredientsItem } from '../ingredients-item/ingredients-item';
import { nanoid } from '@reduxjs/toolkit';

type TBurgerIngredientsProps = {
	groupName: string;
	groupItems: TIngredient[];
};

export const IngredientsGroup = React.forwardRef<
	HTMLHeadingElement,
	TBurgerIngredientsProps
>((props, ref): ReactNode => {
	const { groupName, groupItems } = props;
	return (
		<>
			<h2 className={styles.headline} ref={ref}>
				{groupName}
			</h2>
			<div className={styles.group}>
				{groupItems.map((item): ReactNode => {
					return <IngredientsItem ingredient={item} key={nanoid()} />;
				})}
			</div>
		</>
	);
});
