import * as React from 'react';

function useGeolocation(options = {}) {
	const [location, setLocation] = React.useState<GeolocationPosition>();
	const [error, setError] = React.useState<string>();

	const handleSuccess: PositionCallback = (position) => {
		setLocation(position);
	};

	const handleError = (error: GeolocationPositionError) => {
		setError(error.message);
	};

	React.useEffect(() => {
		const { geolocation } = navigator;

		if (!geolocation) {
			setError('Geolocation is not supported.');
			return;
		}

		geolocation.getCurrentPosition(handleSuccess, handleError, options);
	}, [options]);

	return { location, error };
}

export { useGeolocation };
