import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import ViewTab from './ViewTab';
import { IFile } from 'types';

interface ViewTabsProps {
	files: Array<IFile>;
	currentIndex: number;
	onTabClick: (index: number) => any;
	onTabClose: (index: number) => any;
}

const ViewTabs: FunctionComponent<ViewTabsProps> = (props) => {
	const { files, onTabClick, onTabClose, currentIndex } = props;

	const homeTab = () => {
		return (
			<ViewTab
				label={
					files.length > 0 ? (
						<FontAwesomeIcon icon={faPlusSquare} />
					) : (
						'CSV Magic'
					)
				}
				onClick={() => onTabClick(-1)}
				onClose={() => onTabClose(-1)}
				active={-1 === currentIndex}
				home={true}
			/>
		);
	};

	return (
		<ul className="nav nav-tabs">
			{files.map((file, index) => (
				<ViewTab
					key={index}
					label={`${file.prettyName} - (${file.prettyID})`}
					onClick={() => onTabClick(index)}
					onClose={() => onTabClose(index)}
					active={index === currentIndex}
					home={false}
				/>
			))}
			{homeTab()}
		</ul>
	);
};

export default ViewTabs;
