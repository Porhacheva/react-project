import { IngredientDetails } from '@/components/modal/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { TDispatch, TState } from '@/main';
import { getIngredients } from '@/services/actions/app';
import { CLOSE_INGREDIENTS_MODAL } from '@/services/actions/currentIngredient';
import { TIngredient } from '@/utils/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

export const IngredientModalPage = (): React.JSX.Element => {
	const { currentIngredient } = useSelector(
		(state: TState) => state.ingredients
	);
	const { ingredients } = useSelector((state: TState) => state.app);
	const dispatch = useDispatch<TDispatch>();
	const navigate: NavigateFunction = useNavigate();
	const [ingredient, setIngredient] = useState<TIngredient>(currentIngredient);
	const { id } = useParams<string>();

	useEffect((): void => {
		(async (): Promise<void> => {
			if (!currentIngredient) {
				await dispatch(getIngredients());
			}
		})();
	}, []);

	useEffect((): void => {
		if (!currentIngredient) {
			const item: TIngredient = ingredients.find(
				(obj: TIngredient) => obj._id === id
			);
			setIngredient(item);
		}
	}, [ingredients]);
	const handleCloseModal = (): void => {
		dispatch({ type: CLOSE_INGREDIENTS_MODAL });
		navigate(-1);
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
