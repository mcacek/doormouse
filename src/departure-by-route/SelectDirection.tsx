import * as React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { ActionMeta, default as ReactSelect } from 'react-select';

import { paths } from '../../nextrip.types';

import { useFetchDirections } from '../api';

import { DirectionOption } from './types';

type DirectonsResponse =
	paths['/nextripv2/directions/{route_id}']['get']['responses']['200']['content']['application/json'];

interface SelectDirectionProps {
	routeId: string;
	renderNext: (directionId: number) => JSX.Element;
}

function SelectDirection({ routeId, renderNext }: SelectDirectionProps) {
	const [selection, setSelection] = React.useState<DirectionOption | null>();
	const fetchDirections = useFetchDirections();
	const handleError = useErrorHandler();
	const { isLoading, error, data } = useQuery<DirectonsResponse, Error>(['directions', routeId], async () => {
		return fetchDirections(routeId);
	});

	if (error) {
		handleError(error);
	}

	const selectDirection = React.useCallback(
		(option: DirectionOption | null, _actionMeta: ActionMeta<DirectionOption>) => {
			setSelection(option);
		},
		[]
	);

	// Reset selection on route change
	React.useEffect(() => {
		setSelection(null);
	}, [routeId]);

	let directionOptions: DirectionOption[] = [];

	if (!isLoading) {
		directionOptions = data!.map((direction) => {
			return {
				value: direction.direction_id as number,
				label: direction.direction_name as string,
			};
		});
	}

	return (
		<>
			<div className="mb-2">
				<ReactSelect
					name="directionId"
					placeholder="Select direction"
					value={selection}
					options={directionOptions}
					onChange={selectDirection}
				/>
			</div>
			{selection && renderNext(selection.value)}
		</>
	);
}

export { SelectDirection };
