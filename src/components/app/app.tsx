import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { doRequest } from '@/utils/helper';
import { url } from '@/utils/constants';
import { Preloader } from '../preloader/preloader';
import { TIngredient, TIngredientData } from '@/utils/types';

export const App = (): React.JSX.Element => {
	const [state, setState] = useState({ isLoading: false, isError: false });
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);

	useEffect(() => {
		(async (): Promise<void> => {
			setState({ ...state, isLoading: true });
			try {
				const ingredients: TIngredientData = await doRequest(
					url.ingredientsUrl
				);
				setIngredients(ingredients.data);
			} catch {
				setState({ ...state, isError: true });
			}
			setState({ ...state, isLoading: false });
		})();
	}, []);

	return (
		<div className={styles.app}>
			{state.isLoading ? <Preloader /> : null}
			{!state.isLoading && state.isError ? 'Ошибка' : null}
			{!state.isLoading && !state.isError && ingredients.length ? (
				<>
					<AppHeader />
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5`}>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor ingredients={ingredients} />
					</main>
				</>
			) : null}
		</div>
	);
};

export default App;
