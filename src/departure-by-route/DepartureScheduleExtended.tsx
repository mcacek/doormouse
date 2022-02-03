import { components } from '../../nextrip.types';
import { DepartureScheduleRow } from './DepartureScheduleRow';

type Departures = components['schemas']['Departure'][];

interface DepartureScheduleExtendedProps {
	departures?: Departures;
}

function DepartureScheduleExtended({ departures = [] }: DepartureScheduleExtendedProps) {
	const extendedDepartures = departures.length > 3 ? departures.slice(3, departures.length) : [];

	return (
		<>
			{extendedDepartures?.map((departure) => (
				<DepartureScheduleRow key={departure.trip_id} departure={departure} />
			))}
		</>
	);
}

export { DepartureScheduleExtended };
