import { TIngredient } from '@/services/types';
import styles from './images-stack.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactNode, useEffect, useState } from 'react';

type TFeedItemProps = {
	ingredients: TIngredient[];
};

export const ImagesStack = ({
	ingredients,
}: TFeedItemProps): React.JSX.Element => {
	const [stack, setStack] = useState<TIngredient[]>([]);
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		if (ingredients.length > 5) {
			setStack(ingredients.slice(0, 6));
			setCount(ingredients.length - 5);
		} else {
			setStack(ingredients);
		}
	}, [ingredients]);

	return (
		<div>
			{stack.map((ingredient: TIngredient, index: number): ReactNode => {
				return (
					<Button
						htmlType='button'
						size='small'
						extraClass={styles.button}
						style={{ zIndex: ingredients.length - index }}
						onClick={(): void => {}}
						key={index}>
						<img
							src={ingredient.image_mobile}
							className={styles.image}
							alt={ingredient.name}
						/>
						{count ? (
							<div
								className={`${styles.counter} text_type_main-default`}>{`+${count}`}</div>
						) : null}
					</Button>
				);
			})}
		</div>
	);
};
