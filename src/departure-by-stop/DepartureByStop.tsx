import { DepartureTypeSelector } from '../components';

function DepartureByStop() {
	return (
		<>
			<h1 className="font-bold text-2xl text-slate-600 mb-4 text-center">Real-time Departures</h1>
			<DepartureTypeSelector />
			<p className="text-center">Coming soon...</p>
		</>
	);
}

export { DepartureByStop };
