import * as React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { ActionMeta, default as ReactSelect } from 'react-select';

import { paths } from '../../nextrip.types';

import { useFetchRoutes } from '../api';

import { RouteOption } from './types';

type RouteResponse = paths['/nextripv2/routes']['get']['responses']['200']['content']['application/json'];

interface SelectRouteProps {
	renderNext: (routeId: string) => JSX.Element;
}

function SelectRoute({ renderNext }: SelectRouteProps) {
	const [selection, setSelection] = React.useState<RouteOption | null>();
	const fetchRoutes = useFetchRoutes();
	const handleError = useErrorHandler();
	const { isLoading, error, data } = useQuery<RouteResponse, Error>('routes', async () => {
		return fetchRoutes();
	});

	if (error) {
		handleError(error);
	}

	const selectRoute = (option: RouteOption | null, _actionMeta: ActionMeta<RouteOption>) => {
		setSelection(option);
	};

	let routeOptions: RouteOption[] = [];

	if (!isLoading) {
		routeOptions = data!.map((route) => {
			return {
				value: route.route_id as string,
				label: route.route_label as string,
			};
		});
	}

	return (
		<>
			<div className="mb-2">
				<ReactSelect
					name="routeId"
					placeholder="Select route"
					value={selection}
					options={routeOptions}
					onChange={selectRoute}
				/>
			</div>
			{selection && renderNext(selection.value)}
		</>
	);
}

export { SelectRoute };
