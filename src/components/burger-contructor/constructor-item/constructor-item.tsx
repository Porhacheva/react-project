import React, { Ref, useRef } from 'react';
import styles from './constructor-item.module.css';
import { TIngredient } from '@/utils/types';
import { Price } from '@/components/price/price';
import {
	DragIcon,
	DeleteIcon,
	LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

type TConstructorItemProps = {
	ingredient: TIngredient;
	index?: number;
	text?: string;
	onDelete?: () => void;
	moveCardHandler?: (dragIndex: number, hoverIndex: number) => void;
};

export const ConstructorItem = ({
	ingredient,
	index,
	text,
	onDelete,
	moveCardHandler,
}: TConstructorItemProps): React.JSX.Element => {
	const ref: Ref<HTMLElement> = useRef<HTMLElement>(null);
	const [, drag] = useDrag({
		type: 'item',
		item: { index },
	});

	const [, drop] = useDrop({
		accept: 'item',
		hover(item: any) {
			if (item.index === index || index == undefined || !moveCardHandler)
				return;
			moveCardHandler(item.index, index);
			item.index = index;
		},
	});
	drag(drop(ref));
	return (
		<div className={styles.item} ref={ref}>
			{!text && (
				<div className={styles.drag}>
					<DragIcon type='primary' />
				</div>
			)}
			<div
				className={`${styles.constructor_inredient} ${text && styles.bun} ${text && text === 'низ' && styles.bottom_border}`}>
				<img
					src={ingredient.image}
					alt={ingredient.name}
					className={styles.image}
				/>
				<span className={`${styles.name} text_type_main-default`}>
					{ingredient.name} {text && `(${text})`}
				</span>
				<Price price={ingredient.price} className={styles.price} />
				{ingredient.type === 'bun' ? (
					<LockIcon type='secondary' className={styles.icon} />
				) : (
					<DeleteIcon
						type='primary'
						className={styles.icon}
						onClick={onDelete}
					/>
				)}
			</div>
		</div>
	);
};
