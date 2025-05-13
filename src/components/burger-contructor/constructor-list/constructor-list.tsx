import React from 'react';
import styles from './constructor-list.module.css';
import { TIngredient } from '@/utils/types';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { Price } from '@/components/price/price';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

type TBurgerIngredientsProps = {
	bun: TIngredient;
	ingredients: TIngredient[];
};

export const ConstructorList = ({
	bun,
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<>
			<ConstructorItem ingredient={bun} text='верх' />
			<div className={styles.list}>
				{ingredients.map((ingredient) => {
					if (ingredient.type !== 'bun')
						return (
							<ConstructorItem ingredient={ingredient} key={ingredient._id} />
						);
				})}
			</div>
			<ConstructorItem ingredient={bun} text='низ' />
			<div className={`${styles.total_price}`}>
				<Price price={610} className={styles.price} size='large' />
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</>
	);
};
