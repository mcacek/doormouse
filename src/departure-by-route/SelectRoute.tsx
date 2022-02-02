import * as React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { ActionMeta, default as ReactSelect } from 'react-select';

import { paths } from '../../nextrip.types';

import { useFetchRoutes } from '../api';

import { RouteOption } from './types';

type RouteResponse = paths['/nextripv2/routes']['get']['responses']['200']['content']['application/json'];

interface SelectRouteProps {
	defaultValue?: string | null;
	renderNext: (routeId: string) => JSX.Element;
}

function SelectRoute({ defaultValue, renderNext }: SelectRouteProps) {
	const [options, setOptions] = React.useState<RouteOption[]>([]);
	const [selection, setSelection] = React.useState<RouteOption | null>();
	const initialLoad = React.useRef(true);
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

	React.useEffect(() => {
		if (!isLoading) {
			let routeOptions: RouteOption[] = data!.map((route) => {
				return {
					value: route.route_id as string,
					label: route.route_label as string,
				};
			});

			setOptions(routeOptions);
		}
	}, [isLoading, data]);

	// Track options and select value for default option when options are set. This should only occur on initial load.
	React.useEffect(() => {
		if (options.length > 0 && initialLoad.current) {
			const defaultSelection = options.find((option) => option.value === defaultValue);
			setSelection(defaultSelection);
			initialLoad.current = false;
		}
	}, [options, defaultValue]);

	/**
	 * 1. If default value changes, assume route is accessed directly.
	 * 2. If default value is cleared then assume navigating back to /by-route.
	 */
	React.useEffect(() => {
		if (!defaultValue) {
			setSelection(null);
		} else {
			const defaultSelection = options.find((option) => option.value === defaultValue);
			setSelection(defaultSelection);
			initialLoad.current = false;
		}
		// initialLoad.current = true;
	}, [defaultValue, options]);

	return (
		<>
			<div className="mb-2">
				<label htmlFor="routeId" className="hidden">
					Route
				</label>
				<ReactSelect
					inputId="routeId"
					name="routeId"
					placeholder="Select route"
					value={selection}
					options={options}
					onChange={selectRoute}
					isLoading={isLoading}
				/>
			</div>
			{selection && renderNext(selection.value)}
		</>
	);
}

export { SelectRoute };
