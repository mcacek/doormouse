import * as React from 'react';
import { paths } from '../../../nextrip.types';
import { useApi } from '../providers';

type DirectonsResponse =
	paths['/nextripv2/directions/{route_id}']['get']['responses']['200']['content']['application/json'];

function useFetchDirections() {
	const { apiClient } = useApi();

	const fetchDirections = React.useCallback(
		(routeId: string) => {
			return apiClient.get(`directions/${routeId}`).json<Promise<DirectonsResponse>>();
		},
		[useApi]
	);

	return fetchDirections;
}

export { useFetchDirections };
