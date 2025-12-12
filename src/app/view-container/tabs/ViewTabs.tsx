import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement, MouseEvent } from "react";

import { useFileStore } from "@/lib/index.js";

import ViewTab from "./ViewTab.js";

const ViewTabs = (): ReactElement => {
	const { currentIndex, files, removeFile, setCurrentIndex } = useFileStore();

	const handleTabClick = (e: MouseEvent, index: number) => {
		e.preventDefault();
		setCurrentIndex(index);
	};

	const handleTabClose = (e: MouseEvent, index: number) => {
		e.preventDefault();
		removeFile(index);
	};

	return (
		<ul className="nav nav-tabs">
			{files.map((file, index) => (
				<ViewTab
					active={index === currentIndex}
					home={false}
					key={file.id}
					label={`${file.prettyName} - (${file.prettyID})`}
					onClick={(e) => handleTabClick(e, index)}
					onClose={(e) => handleTabClose(e, index)}
				/>
			))}
			<ViewTab
				active={-1 === currentIndex}
				home={true}
				label={
					files.length > 0 ? (
						<FontAwesomeIcon icon={faPlusSquare} />
					) : (
						"CSV Magic"
					)
				}
				onClick={(e) => handleTabClick(e, -1)}
				onClose={(e) => handleTabClose(e, -1)}
			/>
		</ul>
	);
};

export default ViewTabs;
