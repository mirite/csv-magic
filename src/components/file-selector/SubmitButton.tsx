import React, { FunctionComponent } from 'react';
import styles from '../../styles/SubmitButton.module.css';

interface SubmitButtonProps {
	processing: boolean;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
	const { processing } = props;
	return (
		<button
			className={styles.button}
			type="submit"
			aria-disabled={processing}
			disabled={processing}
		>
			{processing ? 'Processing' : 'Open'}
		</button>
	);
};

export default SubmitButton;
