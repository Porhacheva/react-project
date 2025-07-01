import { IngredientDetails } from '@/components/modal/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { getIngredients } from '@/services/actions/app';
import { CLOSE_INGREDIENTS_MODAL } from '@/services/actions/currentIngredient';
import { TIngredient } from '@/utils/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

export const IngredientModalPage = () => {
	const { currentIngredient } = useSelector((state: any) => state.ingredients);
	const { ingredients } = useSelector((state: any) => state.app);
	const dispatch: (...args: any[]) => any = useDispatch();
	const navigate: NavigateFunction = useNavigate();
	const [ingredient, setIngredient] = useState<TIngredient>(currentIngredient);
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			if (!currentIngredient) {
				await dispatch(getIngredients());
			}
		})();
	}, []);

	useEffect(() => {
		if (!currentIngredient) {
			const item: TIngredient = ingredients.find(
				(obj: TIngredient) => obj._id === id
			);
			setIngredient(item);
		}
	}, [ingredients]);
	const handleCloseModal = () => {
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
