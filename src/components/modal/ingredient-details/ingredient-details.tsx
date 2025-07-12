import { TIngredient } from '@/services/types';
import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
	ingredient: TIngredient;
};

export const IngredientDetails = ({
	ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
	return (
		<div className={styles.info}>
			<img src={ingredient.image_large} alt={ingredient.name} />
			<span className='text_type_main-medium mt-4 mb-8'>{ingredient.name}</span>
			<div className={styles.nutririon}>
				<span className={styles.nutririon_item}>
					<span className='text_type_main-default'>Калории,ккал</span>
					<span className='text_type_digits-default'>
						{ingredient.calories}
					</span>
				</span>
				<span className={styles.nutririon_item}>
					<span className='text_type_main-default'>Белки, г</span>
					<span className='text_type_digits-default'>
						{ingredient.proteins}
					</span>
				</span>
				<span className={styles.nutririon_item}>
					<span className='text_type_main-default'>Жиры, г</span>
					<span className='text_type_digits-default'>{ingredient.fat}</span>
				</span>
				<span className={styles.nutririon_item}>
					<span className='text_type_main-default'>Углеводы, г</span>
					<span className='text_type_digits-default'>
						{ingredient.carbohydrates}
					</span>
				</span>
			</div>
		</div>
	);
};
