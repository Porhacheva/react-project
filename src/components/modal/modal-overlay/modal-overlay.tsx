import { ReactNode } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	children: ReactNode;
	onClick: () => void;
};

export const ModalOverlay = ({
	children,
	onClick,
}: TModalOverlayProps): React.JSX.Element => {
	return (
		<div
			id='modalOverlay'
			className={styles['modal-backdrop']}
			onClick={onClick}
			role='presentation'>
			{children}
		</div>
	);
};
