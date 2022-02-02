import * as React from 'react';
import { paths } from '../../../nextrip.types';
import { useApi } from '../providers';

type ScheduleResponse =
	paths['/nextripv2/{route_id}/{direction_id}/{place_code}']['get']['responses']['200']['content']['application/json'];

function useFetchSchedule() {
	const { apiClient } = useApi();

	const fetchSchedule = React.useCallback(
		(routeId: string, directionId: number, placeCode: string) => {
			return apiClient.get(`${routeId}/${directionId}/${placeCode}`).json<Promise<ScheduleResponse>>();
		},
		[apiClient]
	);

	// const queryClient = useQueryClient();

	// return (routeId: string, directionId: number, placeCode: string) => {
	//     return queryClient.fetchQuery<ScheduleResponse, Error>(['directions', routeId, directionId, placeCode], async () => {
	//         return apiClient.get(`${url}/${routeId}/${directionId}/${placeCode}`).json<Promise<ScheduleResponse>>();
	//     })
	// };

	return fetchSchedule;
}

export { useFetchSchedule };
