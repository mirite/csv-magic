import React, { FunctionComponent } from 'react';

interface StaticOptionsProps {
	onChange: (e: string) => void;
}

const StaticOptions: FunctionComponent<StaticOptionsProps> = (props) => {
	return <div>static options</div>;
};

export default StaticOptions;
