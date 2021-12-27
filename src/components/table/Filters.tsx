import Popover from '../Popover';
import React, { Component } from 'react';

/**
 * A popover for filtering the showing rows based on their values.
 */
export default class Filters extends Popover {
	getContent(): JSX.Element {
		return <p>Filters</p>;
	}
}
