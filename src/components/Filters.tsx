import Popover from "./Popover";
import React, { Component } from 'react';

export default class Filters extends Popover {
	getContent():JSX.Element {
		return <p>Filters</p>;
	}
}