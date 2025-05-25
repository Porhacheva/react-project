import checkPath from '../../../images/graphics.svg';
import styles from './order-details.module.css';

type TOrderDetailsProps = {
	orderId: string;
};

export const OrderDetails = ({
	orderId,
}: TOrderDetailsProps): React.JSX.Element => {
	return (
		<div className={`${styles.order} pl-15 pr-15`}>
			<span className='text_type_digits-large mb-8'>{orderId}</span>
			<span className='text_type_main-medium mb-15'>идентификатор заказа</span>
			<img src={checkPath} alt='Заказ принят' />
			<span className='text_type_main-default mt-15 mb-2'>
				Ваш заказ начали готовить
			</span>
			<span className='text_type_main-default text_color_inactive mb-15'>
				Дождитесь готовности на орбитальной станции
			</span>
		</div>
	);
};
