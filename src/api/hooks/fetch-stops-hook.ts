import * as React from 'react';
import { paths } from '../../../nextrip.types';
import { useApi } from '../providers';

type StopsResponse =
	paths['/nextripv2/stops/{route_id}/{direction_id}']['get']['responses']['200']['content']['application/json'];

function useFetchStops() {
	const { apiClient } = useApi();

	const fetchStops = React.useCallback(
		(routeId: string, directionId: number) => {
			return apiClient.get(`stops/${routeId}/${directionId}`).json<Promise<StopsResponse>>();
		},
		[apiClient]
	);

	return fetchStops;
}

export { useFetchStops };
