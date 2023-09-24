import React from "react";
import MainView from "../MainView/MainView";
import ViewTabs from "./ViewTabs/ViewTabs";

/**
 *
 */
function ViewContainer() {
  return (
    <div>
      <ViewTabs />
      <MainView />
    </div>
  );
}

export default ViewContainer;
