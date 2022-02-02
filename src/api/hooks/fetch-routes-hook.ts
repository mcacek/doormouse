import * as React from 'react';
import { paths } from '../../../nextrip.types';
import { useApi } from '../providers';

type RouteResponse = paths['/nextripv2/routes']['get']['responses']['200']['content']['application/json'];

function useFetchRoutes() {
	const { apiClient } = useApi();

	const fetchRoutes = React.useCallback(() => {
		return apiClient.get('routes').json<Promise<RouteResponse>>();
	}, [apiClient]);

	return fetchRoutes;
}

export { useFetchRoutes };
