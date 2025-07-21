import { FeedOrderDetails } from '@/components/modal/feed-order-details/feed-order-details';
import { getOrder } from '@/services/actions/order';
import { useDispatch, useSelector } from '@/services/types/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OrderModalPage = (): React.JSX.Element => {
	const { orderObject } = useSelector((state) => state.order);
	const dispatch = useDispatch();
	const { id } = useParams<string>();

	useEffect((): void => {
		if (!orderObject && id) {
			dispatch(getOrder(id));
		}
	}, [dispatch, orderObject]);

	return <>{orderObject && <FeedOrderDetails />}</>;
};
