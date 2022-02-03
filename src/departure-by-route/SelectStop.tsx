import * as React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { ActionMeta, default as ReactSelect } from 'react-select';

import { paths } from '../../nextrip.types';

import { useFetchStops } from '../api';

import { StopOption } from './types';

type StopsResponse =
	paths['/nextripv2/stops/{route_id}/{direction_id}']['get']['responses']['200']['content']['application/json'];

interface SelectStopProps {
	defaultValue?: string | null;
	routeId: string;
	directionId: number;
	renderNext: (stopId: string) => React.ReactNode;
}

function SelectStop({ defaultValue, routeId, directionId, renderNext }: SelectStopProps) {
	const [options, setOptions] = React.useState<StopOption[]>([]);
	const [selection, setSelection] = React.useState<StopOption | null>();
	const initialLoad = React.useRef(true);
	const handleError = useErrorHandler();
	const fetchStops = useFetchStops();
	const { isLoading, error, data } = useQuery<StopsResponse, Error>(['directions', routeId, directionId], async () => {
		return fetchStops(routeId, directionId);
	});

	if (error) {
		handleError(error);
	}

	const selectStop = React.useCallback((option: StopOption | null, _actionMeta: ActionMeta<StopOption>) => {
		setSelection(option);
	}, []);

	// reset selection when directionId changes
	React.useEffect(() => {
		setSelection(null);
	}, [directionId]);

	React.useEffect(() => {
		if (!isLoading) {
			const stopOptions = data!.map((stop) => {
				return {
					value: stop.place_code as string,
					label: stop.description as string,
				};
			});

			setOptions(stopOptions);
		}
	}, [data, isLoading]);

	// Track options and select value for default option when options are set. This should only occur on initial load.
	React.useEffect(() => {
		if (options.length > 0 && initialLoad.current) {
			const defaultSelection = options.find((option) => option.value === defaultValue);
			setSelection(defaultSelection);
			initialLoad.current = false;
		}
	}, [options, defaultValue]);

	React.useEffect(() => {
		initialLoad.current = true;
	}, [defaultValue]);

	return (
		<>
			<div className="mb-2">
				<label htmlFor="stopId" className="hidden">
					Stop
				</label>
				<ReactSelect
					inputId="stopId"
					name="stopId"
					placeholder="Select stop"
					value={selection}
					options={options}
					onChange={selectStop}
					isLoading={isLoading}
				/>
			</div>
			{selection && renderNext(selection.value)}
		</>
	);
}

export { SelectStop };
