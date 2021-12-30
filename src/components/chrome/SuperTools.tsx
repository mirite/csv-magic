import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/chrome/SuperTools.module.css';

interface SuperToolsProps {
	onSetActiveModal: (arg0: string) => any;
}

const SuperTools: FunctionComponent<SuperToolsProps> = (props) => {
	const { onSetActiveModal } = props;
	return (
		<div>
			<button
				className={styles.button}
				onClick={() => onSetActiveModal('removeColumns')}
				title="Remove Columns"
			>
				<FontAwesomeIcon icon={faMinusSquare} />
			</button>
			<button
				className={styles.button}
				onClick={() => onSetActiveModal('addColumn')}
				title="Add Column"
			>
				<FontAwesomeIcon icon={faPlusSquare} />
			</button>
		</div>
	);
};

export default SuperTools;
