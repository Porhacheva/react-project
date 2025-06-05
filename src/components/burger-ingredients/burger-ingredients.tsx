import React, { Ref, useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { useSelector } from 'react-redux';

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
	const { constructorIngredients, bun } = useSelector(
		(state: any) => state.app
	);
	const scrollRef: Ref<HTMLElement> = useRef<HTMLElement>(null);
	const bunRef: Ref<HTMLElement> = useRef<HTMLElement>(null);
	const mainRef: Ref<HTMLElement> = useRef<HTMLElement>(null);
	const sauseRef: Ref<HTMLElement> = useRef<HTMLElement>(null);
	const [bunTab, setBunTab] = useState(true);
	const [mainTab, setMainTab] = useState(false);
	const [sauseTab, setSauseTab] = useState(false);

	useEffect(() => {
		const groups: any = getGroups(ingredients);
		setBuns(groups.bun);
		setMains(groups.main);
		setSauses(groups.sauce);

		const scrollSection = document.querySelector('.custom-scroll');
		scrollSection?.addEventListener('scroll', () => {
			const scrollY: number | undefined =
				scrollRef.current?.getBoundingClientRect().y;
			if (scrollY === undefined) return;
			const bunY: number = Math.abs(
				scrollY - bunRef.current?.getBoundingClientRect().y
			);
			const mainY: number = Math.abs(
				scrollY - mainRef.current?.getBoundingClientRect().y
			);
			const sauseY: number = Math.abs(
				scrollY - sauseRef.current?.getBoundingClientRect().y
			);
			if (bunY < mainY && bunY < sauseY) {
				setBunTab(true);
				setMainTab(false);
				setSauseTab(false);
			} else if (mainY < bunY && mainY < sauseY) {
				setBunTab(false);
				setMainTab(true);
				setSauseTab(false);
			} else if (sauseY < bunY && sauseY < mainY) {
				setBunTab(false);
				setMainTab(false);
				setSauseTab(true);
			}
		});
	}, [constructorIngredients, bun]);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={bunTab} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={mainTab} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={sauseTab} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<section className={`${styles.section} custom-scroll`} ref={scrollRef}>
				<IngredientsGroup groupName='Булки' groupItems={buns} ref={bunRef} />
				<IngredientsGroup
					groupName='Начинки'
					groupItems={mains}
					ref={mainRef}
				/>
				<IngredientsGroup
					groupName='Соусы'
					groupItems={sauces}
					ref={sauseRef}
				/>
			</section>
		</section>
	);
};
