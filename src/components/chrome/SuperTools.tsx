import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMinusSquare,
	faPlusSquare,
	faRandom,
} from '@fortawesome/free-solid-svg-icons';
import styles from 'styles/chrome/SuperTools.module.css';

interface SuperToolsProps {
	onSetActiveModal: (arg0: string) => any;
}

const SuperTools: FunctionComponent<SuperToolsProps> = (props) => {
	const { onSetActiveModal } = props;
	return (
		<div>
			<button
				className={styles.remove}
				onClick={() => onSetActiveModal('removeColumns')}
				title="Remove Columns"
			>
				<FontAwesomeIcon icon={faMinusSquare} />
				&nbsp;Remove Columns
			</button>
			<button
				className={styles.add}
				onClick={() => onSetActiveModal('addColumn')}
				title="Add Column"
			>
				<FontAwesomeIcon icon={faPlusSquare} />
				&nbsp;Generate Column
			</button>
			<button
				className={styles.add}
				onClick={() => onSetActiveModal('reorderColumns')}
				title="Reorder Columns"
			>
				<FontAwesomeIcon icon={faRandom} />
				&nbsp;Reorder Columns
			</button>
		</div>
	);
};

export default SuperTools;
