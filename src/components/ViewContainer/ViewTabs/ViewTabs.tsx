import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ViewTab from "./ViewTab/ViewTab";
import { useFileStore } from "../../../modules/useFileStore";

const ViewTabs = () => {
  const { setCurrentIndex, removeFile, files, currentIndex } = useFileStore();

  const handleTabClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTabClose = (index: number) => {
    removeFile(index);
  };

  return (
    <ul className="nav nav-tabs">
      {files.map((file, index) => (
        <ViewTab
          key={file.id}
          label={`${file.prettyName} - (${file.prettyID})`}
          onClick={() => handleTabClick(index)}
          onClose={() => handleTabClose(index)}
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
        onClick={() => handleTabClick(-1)}
        onClose={() => handleTabClose(-1)}
        active={-1 === currentIndex}
        home={true}
      />
    </ul>
  );
};

export default ViewTabs;
