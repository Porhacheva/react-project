import { TIngredient } from '@/services/types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactNode } from 'react';
import styles from './ingredients-list.module.css';
import { Price } from '@/components/price/price';

type TIngredientsListProps = {
	ingredients: TIngredient[];
};

export const IngredientsList = ({
	ingredients,
}: TIngredientsListProps): React.JSX.Element => {
	return (
		<div className={`${styles.list} pr-6`}>
			{ingredients.map((ingredient: TIngredient): ReactNode => {
				return (
					<div className={`${styles['list-item']} mb-4`}>
						<Button
							htmlType='button'
							size='small'
							extraClass={styles.button}
							onClick={(): void => {}}
							key={ingredient._id}>
							<img
								src={ingredient.image_mobile}
								className={styles.image}
								alt={ingredient.name}
							/>
						</Button>
						<div className={`${styles.name} text_type_main-default mr-6 ml-6`}>
							{ingredient.name}
						</div>
						<div className={`${styles.price} text_type_digits-default`}>
							{ingredient.type === 'bun' ? '2 x ' : '1 x '}
							<Price price={ingredient.price} className='ml-2' />
						</div>
					</div>
				);
			})}
		</div>
	);
};
