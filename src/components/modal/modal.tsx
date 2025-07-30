import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { ReactNode, useEffect } from 'react';

type TModalProps = {
	children: ReactNode;
	onCloseModal: () => void;
	header?: string;
};

export const Modal = ({
	children,
	onCloseModal,
	header,
}: TModalProps): React.JSX.Element => {
	const modalRoot: HTMLElement = document.getElementById('modal-root')!;
	useEffect(() => {
		const closeOnEscapePressed = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') {
				onCloseModal();
			}
		};
		window.addEventListener('keydown', closeOnEscapePressed);
		return () => window.removeEventListener('keydown', closeOnEscapePressed);
	}, []);

	return ReactDOM.createPortal(
		<ModalOverlay onClick={onCloseModal}>
			<div
				className={`${styles.modal} p-10`}
				onClick={(e) => e.stopPropagation()}
				role='presentation'>
				<div
					className={`${styles.header} text_type_main-large pt-5 pb-5 ${!header && styles['without-header']}`}>
					{header}
					<div id='closeModal'>
						<CloseIcon type='primary' onClick={onCloseModal} />
					</div>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		modalRoot
	);
};
