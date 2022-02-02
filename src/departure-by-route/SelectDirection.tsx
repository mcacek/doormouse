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
	defaultValue?: string | null;
	routeId: string;
	renderNext: (directionId: number) => JSX.Element;
}

function SelectDirection({ defaultValue, routeId, renderNext }: SelectDirectionProps) {
	const [options, setOptions] = React.useState<DirectionOption[]>([]);
	const [selection, setSelection] = React.useState<DirectionOption | null>();
	const initialLoad = React.useRef(true);
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

	React.useEffect(() => {
		if (!isLoading) {
			let directionOptions: DirectionOption[] = data!.map((direction) => {
				return {
					value: direction.direction_id as number,
					label: direction.direction_name as string,
				};
			});

			setOptions(directionOptions);
		}
	}, [data, isLoading]);

	// Track options and select value for default option when options are set. This should only occur on initial load.
	React.useEffect(() => {
		if (options.length > 0 && initialLoad.current) {
			const defaultSelection = options.find((option) => option.value === Number(defaultValue));
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
				<label htmlFor="directionId" className="hidden">
					Direction
				</label>
				<ReactSelect
					inputId="directionId"
					name="directionId"
					placeholder="Select direction"
					value={selection}
					options={options}
					onChange={selectDirection}
					isLoading={isLoading}
				/>
			</div>
			{selection && renderNext(selection.value)}
		</>
	);
}

export { SelectDirection };
