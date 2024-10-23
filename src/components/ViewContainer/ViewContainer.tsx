import type { ReactElement } from "react";
import React from "react";

import MainView from "../MainView/MainView";

import ViewTabs from "./ViewTabs/ViewTabs";

/**
 * The container for the view tabs and main view.
 *
 * @returns The view container component.
 */
function ViewContainer(): ReactElement {
	return (
		<div>
			<ViewTabs />
			<MainView />
		</div>
	);
}

export default ViewContainer;
