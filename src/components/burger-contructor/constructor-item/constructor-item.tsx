import React from 'react';
import styles from './constructor-item.module.css';
import { TIngredient } from '@/utils/types';
import { Price } from '@/components/price/price';
import {
	DragIcon,
	DeleteIcon,
	LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

type TConstructorItemProps = {
	ingredient: TIngredient;
	text?: string;
	className?: string;
};

export const ConstructorItem = ({
	ingredient,
	text,
	className,
}: TConstructorItemProps): React.JSX.Element => {
	return (
		<>
			<div className={styles.item} key={ingredient._id}>
				<DragIcon type='primary' />
				<div className={`${className} ${styles.constructor_inredient}`}>
					<img src={ingredient.image} alt='' className={styles.image} />
					<span className={`${styles.name} text_type_main-default`}>
						{ingredient.name} {text && `(${text})`}
					</span>
					<Price price={ingredient.price} className={styles.price} />
					{ingredient.type === 'bun' ? (
						<LockIcon type='secondary' className={styles.icon} />
					) : (
						<DeleteIcon type='primary' className={styles.icon} />
					)}
				</div>
			</div>
		</>
	);
};
