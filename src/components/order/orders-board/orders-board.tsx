import { TOrderData } from '@/services/types/api';
import styles from './orders-board.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from '@/services/types/hooks';
import { getOrderNumber } from '@/utils/helper';
import { nanoid } from '@reduxjs/toolkit';

function getArrays(orders: TOrderData[]): string[][][] {
	const done: string[] = [];
	const pending: string[] = [];
	const multiDone: string[][] = [];
	const multiPending: string[][] = [];
	const rows: number = 10;

	orders.forEach((order: TOrderData) => {
		if (order.status === 'done') {
			done.push(getOrderNumber(order.number));
			return;
		}
		if (order.status === 'pending') {
			pending.push(getOrderNumber(order.number));
			return;
		}
	});

	for (let i = 0; i < done.length; i += rows) {
		multiDone.push(done.slice(i, i + rows));
	}
	for (let i = 0; i < pending.length; i += rows) {
		multiPending.push(pending.slice(i, i + rows));
	}
	return [multiDone, multiPending];
}

export const OrdersBoard = (): React.JSX.Element => {
	const [doneOrders, setDoneOrders] = useState<string[][]>([]);
	const [pendingOrders, setPendingOrders] = useState<string[][]>([]);
	const { orders } = useSelector((state) => state.feed);

	useEffect((): void => {
		const [x, y] = getArrays(orders);

		setDoneOrders(x);
		setPendingOrders(y);
	}, []);

	return (
		<div className={styles.board}>
			<div className={styles['table-column']}>
				<div className={`${styles.header} text_type_main-medium`}>Готовы:</div>
				<div className={styles.box} key={nanoid()}>
					{doneOrders.map((orders: string[]): React.JSX.Element => {
						return (
							<div className={styles.column}>
								{orders.map((order: string): React.JSX.Element => {
									return (
										<div
											className='text_type_digits-default text_color_success mb-2'
											key={order}>
											{order}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles['table-column']}>
				<div className={`${styles.header} text_type_main-medium`}>
					В работе:
				</div>
				<div className={styles.box} key={nanoid()}>
					{pendingOrders.map((orders: string[]): React.JSX.Element => {
						return (
							<div className={styles.column}>
								{orders.map((order: string): React.JSX.Element => {
									return (
										<div
											className='text_type_digits-default text_color_success mb-2'
											key={order}>
											{order}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
