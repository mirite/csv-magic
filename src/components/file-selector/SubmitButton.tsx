import React, { FunctionComponent } from 'react';

interface SubmitButtonProps {
	processing: boolean;
}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
	const { processing } = props;
	return (
		<button
			className="btn btn-primary btn-lg"
			type="submit"
			aria-disabled={processing}
		>
			{processing ? 'Processing' : 'Open'}
		</button>
	);
};

export default SubmitButton;
