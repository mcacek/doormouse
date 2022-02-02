import { DepartureSchedule } from './DepartureSchedule';
import { SelectDirection } from './SelectDirection';
import { SelectRoute } from './SelectRoute';
import { SelectStop } from './SelectStop';

function DepartureByRoute() {
	return (
		<>
			<SelectRoute
				renderNext={(routeId: string) => (
					<SelectDirection
						routeId={routeId}
						renderNext={(directionId: number) => (
							<SelectStop
								routeId={routeId}
								directionId={directionId}
								renderNext={(placeCode) => (
									<DepartureSchedule routeId={routeId} directionId={directionId} placeCode={placeCode} />
								)}
							/>
						)}
					/>
				)}
			/>
		</>
	);
}

export { DepartureByRoute };
