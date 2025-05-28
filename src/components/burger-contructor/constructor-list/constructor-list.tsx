import React from 'react';
import styles from './constructor-list.module.css';
import { TIngredient } from '@/utils/types';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { useDispatch } from 'react-redux';
import {
	DECREASE_ITEM,
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	SWAP_ITEMS,
} from '../../../services/actions/constructor';

type TBurgerIngredientsProps = {
	ingredients?: TIngredient[];
	bun?: TIngredient;
};

export const ConstructorList = ({
	ingredients,
	bun,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const deleteItem = (item: TIngredient, index: number) => {
		dispatch({ type: DECREASE_ITEM, item });
		dispatch({ type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, index });
	};
	const moveCardHandler = (dragIndex: number, hoverIndex: number): void => {
		const dragItem = ingredients && ingredients[dragIndex];
		if (dragItem) {
			const coppiedStateArray = [...ingredients];
			const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
			coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
			dispatch({ type: SWAP_ITEMS, newarr: coppiedStateArray });
		}
	};

	return (
		<div>
			{bun ? <ConstructorItem ingredient={bun} text='верх' /> : null}
			<div className={styles.list}>
				{ingredients?.map((ingredient: TIngredient, index: number) => {
					if (ingredient.type !== 'bun')
						return (
							<ConstructorItem
								ingredient={ingredient}
								key={`${ingredient._id} ${index}`}
								index={index}
								onDelete={() => deleteItem(ingredient, index)}
								moveCardHandler={moveCardHandler}
							/>
						);
				})}
			</div>
			{bun ? <ConstructorItem ingredient={bun} text='низ' /> : null}
		</div>
	);
};
