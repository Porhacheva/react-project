import React from 'react';
import styles from './price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconTypes } from '@/services/types';

type TPriceProps = {
	price?: number;
	iconType?: TIconTypes;
	size?: string;
	className?: string;
};

export const Price = ({
	price,
	iconType = 'primary',
	size,
	className,
}: TPriceProps): React.JSX.Element => {
	return (
		<div className={`${styles.price} text_type_digits-default ${className}`}>
			<span
				className={
					size === 'large'
						? `${styles.number} text_type_digits-medium`
						: styles.number
				}>
				{price}
			</span>
			<CurrencyIcon type={iconType} />
		</div>
	);
};
