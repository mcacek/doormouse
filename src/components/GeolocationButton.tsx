import * as React from 'react';

interface GeolocationButtonProps {
	onSuccess: PositionCallback;
	onError: (error: string) => void;
}

function GeolocationButton({ onSuccess, onError }: GeolocationButtonProps) {
	const lookupPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { geolocation } = navigator;

		if (!geolocation) {
			onError('Geolocation is not supported.');
		} else {
			geolocation.getCurrentPosition(
				onSuccess,
				(error: GeolocationPositionError) => {
					onError(error.message);
				},
				{}
			);
		}
	};
	return <button onClick={lookupPosition}>Use current location </button>;
}

export { GeolocationButton };
