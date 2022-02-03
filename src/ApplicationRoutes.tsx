import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DepartureByRoute } from './departure-by-route';
import { DepartureByStop } from './departure-by-stop';
import { Landing } from './landing';

function ApplicationRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="by-route/*" element={<DepartureByRoute />} />
			<Route path="by-stop" element={<DepartureByStop />} />
		</Routes>
	);
}

export { ApplicationRoutes };
