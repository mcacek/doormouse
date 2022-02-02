interface UnexpectedErrorHandlerProps {
	error: any;
}

function UnexpectedErrorHandler({ error }: UnexpectedErrorHandlerProps) {
	const tryAgain = () => {
		window.location.reload();
	};

	return (
		<div className="text-center">
			<h1>Oops!</h1>
			<p>Something went wrong.</p>
			<button onClick={tryAgain}>Try Again</button>
		</div>
	);
}

export { UnexpectedErrorHandler };
