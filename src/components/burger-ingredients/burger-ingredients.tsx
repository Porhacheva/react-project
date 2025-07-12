import React, { Ref, useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from './ingredients-group/ingredients-group';
import { useSelector } from '@/services/types/hooks';
import { TIngredient } from '@/services/types';

interface IGroupObject {
	[name: string]: TIngredient[];
}

function getGroups(ingredients: TIngredient[]): IGroupObject {
	const obj: IGroupObject = {};
	ingredients.forEach((ingredient: TIngredient): void => {
		if (!obj[ingredient.type]) {
			obj[ingredient.type] = [ingredient];
		} else {
			obj[ingredient.type].push(ingredient);
		}
	});
	return obj;
}

export const BurgerIngredients = (): React.JSX.Element => {
	const [buns, setBuns] = useState<TIngredient[]>([]);
	const [mains, setMains] = useState<TIngredient[]>([]);
	const [sauces, setSauses] = useState<TIngredient[]>([]);
	const { constructorIngredients, bun, ingredients } = useSelector(
		(state) => state.app
	);
	const scrollRef: Ref<HTMLElement> = useRef<HTMLElement>(null);
	const bunRef: Ref<HTMLHeadingElement> = useRef<HTMLHeadingElement>(null);
	const mainRef: Ref<HTMLHeadingElement> = useRef<HTMLHeadingElement>(null);
	const sauseRef: Ref<HTMLHeadingElement> = useRef<HTMLHeadingElement>(null);
	const [bunTab, setBunTab] = useState<boolean>(true);
	const [mainTab, setMainTab] = useState<boolean>(false);
	const [sauseTab, setSauseTab] = useState<boolean>(false);

	useEffect((): void => {
		const groups: IGroupObject = getGroups(ingredients);
		setBuns(groups.bun);
		setMains(groups.main);
		setSauses(groups.sauce);

		const scrollSection = document.querySelector('.custom-scroll');
		scrollSection?.addEventListener('scroll', (): void => {
			const scrollY: number | undefined =
				scrollRef.current?.getBoundingClientRect().y;
			if (scrollY === undefined) return;
			const bunY: number = Math.abs(
				scrollY - (bunRef.current?.getBoundingClientRect()?.y || 0)
			);
			const mainY: number = Math.abs(
				scrollY - (mainRef.current?.getBoundingClientRect()?.y || 0)
			);
			const sauseY: number = Math.abs(
				scrollY - (sauseRef.current?.getBoundingClientRect()?.y || 0)
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
	}, [constructorIngredients, bun, ingredients]);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={bunTab} onClick={(): void => {}}>
						Булки
					</Tab>
					<Tab value='main' active={mainTab} onClick={(): void => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={sauseTab} onClick={(): void => {}}>
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
