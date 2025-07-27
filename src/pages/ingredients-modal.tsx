import { IngredientDetails } from '@/components/modal/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { CLOSE_INGREDIENTS_MODAL } from '@/services/actions/currentIngredient';
import { TIngredient } from '@/services/types';
import { useDispatch, useSelector } from '@/services/types/hooks';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

export const IngredientModalPage = (): React.JSX.Element => {
	const { currentIngredient } = useSelector((state) => state.ingredients);
	const { ingredients } = useSelector((state) => state.app);
	const dispatch = useDispatch();
	const navigate: NavigateFunction = useNavigate();
	const [ingredient, setIngredient] = useState<TIngredient | undefined>(
		currentIngredient || undefined
	);
	const { id } = useParams<string>();

	useEffect((): void => {
		if (!currentIngredient) {
			const item: TIngredient | undefined = ingredients.find(
				(obj: TIngredient) => obj._id === id
			);
			setIngredient(item);
		}
	}, [ingredients]);
	const handleCloseModal = (): void => {
		dispatch({ type: CLOSE_INGREDIENTS_MODAL });
		navigate('/');
	};
	return (
		<>
			{ingredient && (
				<Modal header='Детали ингредиента' onCloseModal={handleCloseModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</>
	);
};
