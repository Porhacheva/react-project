import { Price } from '@/components/price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-item.module.css';
import { OPEN_INGREDIENTS_MODAL } from '../../../services/actions/currentIngredient';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from '@/services/types/hooks';
import { TIngredient } from '@/services/types';

type TBurgerIngredientsProps = {
	ingredient: TIngredient;
};

export const IngredientsItem = ({
	ingredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const { state } = useLocation();
	const dispatch = useDispatch();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ingredient },
	});

	const handleOpenModal = (): void => {
		dispatch({ type: OPEN_INGREDIENTS_MODAL, ingredient });
	};

	return (
		<>
			<Link
				to={`ingredients/${ingredient._id}`}
				state={state}
				ref={dragRef}
				className={`${styles.card} text_color_primary`}
				onClick={handleOpenModal}
				role='presentation'>
				{ingredient.__v ? <Counter count={ingredient.__v} /> : null}
				<img
					className={styles.image}
					src={ingredient.image}
					alt={ingredient.name}
				/>
				<Price price={ingredient.price} />
				<span className={styles.name}>{ingredient.name}</span>
			</Link>
		</>
	);
};
