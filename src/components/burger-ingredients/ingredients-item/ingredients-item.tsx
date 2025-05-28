import { TIngredient } from '@/utils/types';
import { Price } from '@/components/price/price';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/modal/ingredient-details/ingredient-details';
import styles from './ingredients-item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_INGREDIENTS_MODAL,
	OPEN_INGREDIENTS_MODAL,
} from '../../../services/actions/currentIngredient';
import { useDrag } from 'react-dnd';

type TBurgerIngredientsProps = {
	ingredient: TIngredient;
};

export const IngredientsItem = ({
	ingredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const dispatch = useDispatch();
	const { isModalOpen, currentIngredient } = useSelector(
		(state: any) => state.ingredients
	);
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { ingredient },
	});

	const handleOpenModal = () => {
		dispatch({ type: OPEN_INGREDIENTS_MODAL, ingredient });
	};

	const handleCloseModal = () => {
		dispatch({ type: CLOSE_INGREDIENTS_MODAL });
	};

	return (
		<>
			<div
				ref={dragRef}
				className={styles.card}
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
			</div>
			{isModalOpen && (
				<Modal header='Детали ингредиента' onCloseModal={handleCloseModal}>
					<IngredientDetails ingredient={currentIngredient} />
				</Modal>
			)}
		</>
	);
};
