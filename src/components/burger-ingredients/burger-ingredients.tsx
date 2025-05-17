import React, { useEffect, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

function getGroups(ingredients: TIngredient[]) {
	const obj: any = {};
	ingredients.forEach((ingredient: TIngredient) => {
		if (!obj[ingredient.type]) {
			obj[ingredient.type] = [ingredient];
		} else {
			obj[ingredient.type].push(ingredient);
		}
	});
	return obj;
}

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [buns, setBuns] = useState<TIngredient[]>([]);
	const [mains, setMains] = useState<TIngredient[]>([]);
	const [sauces, setSauses] = useState<TIngredient[]>([]);

	useEffect(() => {
		const groups: any = getGroups(ingredients);
		setBuns(groups.bun);
		setMains(groups.main);
		setSauses(groups.sauce);
	}, []);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<section className={`${styles.section} custom-scroll`}>
				<IngredientsGroup groupName='Булки' groupItems={buns} />
				<IngredientsGroup groupName='Начинки' groupItems={mains} />
				<IngredientsGroup groupName='Соусы' groupItems={sauces} />
			</section>
		</section>
	);
};
