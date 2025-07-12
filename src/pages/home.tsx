import React from 'react';
import styles from '../components/app/app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { Preloader } from '../components/preloader/preloader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';
import { useSelector } from '@/services/types/hooks';

export const HomePage = (): React.JSX.Element => {
	const { ingredients, ingredientsRequest, ingredientsRequestFailed } =
		useSelector((state) => state.app);

	return (
		<div className={styles.app}>
			{ingredientsRequest ? <Preloader /> : null}
			{!ingredientsRequest && ingredientsRequestFailed ? (
				<div className={`${styles.error} text_type_main-large`}>Ошибка</div>
			) : null}
			{!ingredientsRequest &&
			!ingredientsRequestFailed &&
			ingredients.length ? (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5`}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients />
							<BurgerConstructor />
						</DndProvider>
					</main>
				</>
			) : null}
			<Outlet />
		</div>
	);
};
