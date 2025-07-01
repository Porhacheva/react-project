import React, { ReactNode } from 'react';
import styles from './constructor-list.module.css';
import { TIngredient } from '@/utils/types';
import { ConstructorItem } from '../constructor-item/constructor-item';
import { useDispatch } from 'react-redux';
import {
	DECREASE_ITEM,
	DELETE_INGREDIENT_FROM_CONSTRUCTOR,
	SWAP_ITEMS,
} from '../../../services/actions/constructor';
import { TDispatch } from '@/main';

type TBurgerIngredientsProps = {
	ingredients?: TIngredient[];
	bun?: TIngredient;
};

export const ConstructorList = ({
	ingredients,
	bun,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const dispatch = useDispatch<TDispatch>();
	const deleteItem = (item: TIngredient, index: number): void => {
		dispatch({ type: DECREASE_ITEM, item });
		dispatch({ type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, index });
	};
	const moveCardHandler = (dragIndex: number, hoverIndex: number): void => {
		const dragItem: TIngredient | undefined =
			ingredients && ingredients[dragIndex];
		if (dragItem) {
			const coppiedStateArray: TIngredient[] | undefined = ingredients && [
				...ingredients,
			];
			const prevItem: TIngredient[] | undefined = coppiedStateArray?.splice(
				hoverIndex,
				1,
				dragItem
			);
			prevItem && coppiedStateArray?.splice(dragIndex, 1, prevItem[0]);
			dispatch({ type: SWAP_ITEMS, newarr: coppiedStateArray });
		}
	};

	return (
		<div>
			{bun ? <ConstructorItem ingredient={bun} text='верх' /> : null}
			<div className={styles.list}>
				{ingredients?.map(
					(ingredient: TIngredient, index: number): ReactNode => {
						if (ingredient.type !== 'bun')
							return (
								<ConstructorItem
									ingredient={ingredient}
									key={ingredient.key}
									index={index}
									onDelete={(): void => deleteItem(ingredient, index)}
									moveCardHandler={moveCardHandler}
								/>
							);
					}
				)}
			</div>
			{bun ? <ConstructorItem ingredient={bun} text='низ' /> : null}
		</div>
	);
};
