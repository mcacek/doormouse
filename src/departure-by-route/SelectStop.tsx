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
	routeId: string;
	directionId: number;
	renderNext: (stopId: string) => React.ReactNode;
}

function SelectStop({ routeId, directionId, renderNext }: SelectStopProps) {
	const [selection, setSelection] = React.useState<StopOption | null>();
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

	React.useEffect(() => {
		setSelection(null);
	}, [directionId]);

	let stopOptions: StopOption[] = [];

	if (!isLoading) {
		stopOptions = data!.map((stop) => {
			return {
				value: stop.place_code as string,
				label: stop.description as string,
			};
		});
	}

	return (
		<>
			<div className="mb-2">
				<ReactSelect
					name="routeId"
					placeholder="Select stop"
					value={selection}
					options={stopOptions}
					onChange={selectStop}
				/>
			</div>
			{selection && renderNext(selection.value)}
		</>
	);
}

export { SelectStop };
