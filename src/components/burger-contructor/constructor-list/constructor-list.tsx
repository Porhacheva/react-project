import React from 'react';
import styles from './constructor-list.module.css';
import { TIngredient } from '@/utils/types';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { Price } from '@/components/price/price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const ConstructorList = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<>
			<ConstructorItem
				ingredient={ingredients[0]}
				className={styles.top_bun}
				text='верх'
				key={ingredients[0]._id}
			/>
			<div className={styles.list}>
				{ingredients.map((ingredient, index) => {
					if (ingredient.type !== 'bun')
						return <ConstructorItem ingredient={ingredient} key={index} />;
				})}
			</div>
			<ConstructorItem
				ingredient={ingredients[ingredients.length - 1]}
				className={styles.bottom_bun}
				text='низ'
			/>
			<div className={`${styles.total_price}`}>
				<Price price={610} className={styles.price} size='large' />
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</>
	);
};
