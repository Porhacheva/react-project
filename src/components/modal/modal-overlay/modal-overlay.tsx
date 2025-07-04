import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	children: any;
	onClick: () => void;
};

export const ModalOverlay = ({
	children,
	onClick,
}: TModalOverlayProps): React.JSX.Element => {
	return (
		<div
			className={styles['modal-backdrop']}
			onClick={onClick}
			role='presentation'>
			{children}
		</div>
	);
};
