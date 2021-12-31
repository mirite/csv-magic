import React, { FunctionComponent } from 'react';
import { IMappedColumn } from 'types';

interface LookupOptionsProps {
	onChange: (e: IMappedColumn) => void;
}

const LookupOptions: FunctionComponent<LookupOptionsProps> = (props) => {
	return <div>Lookup options</div>;
};

export default LookupOptions;
