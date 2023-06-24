import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ViewTab from "./ViewTab/ViewTab";
import { IFile } from "types";

interface ViewTabsProps {
  files: Array<IFile>;
  currentIndex: number;
  onTabClick: (index: number) => void;
  onTabClose: (index: number) => void;
}

const ViewTabs = (props: ViewTabsProps) => {
  const { files, onTabClick, onTabClose, currentIndex } = props;

  return (
    <ul className="nav nav-tabs">
      {files.map((file, index) => (
        <ViewTab
          key={file.id}
          label={`${file.prettyName} - (${file.prettyID})`}
          onClick={() => onTabClick(index)}
          onClose={() => onTabClose(index)}
          active={index === currentIndex}
          home={false}
        />
      ))}
      <ViewTab
        label={
          files.length > 0 ? (
            <FontAwesomeIcon icon={faPlusSquare} />
          ) : (
            "CSV Magic"
          )
        }
        onClick={() => onTabClick(-1)}
        onClose={() => onTabClose(-1)}
        active={-1 === currentIndex}
        home={true}
      />
    </ul>
  );
};

export default ViewTabs;
