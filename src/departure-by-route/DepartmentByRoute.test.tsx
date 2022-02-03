import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';
import selectEvent from 'react-select-event';

const departures = require('../api/data/departures.json');
const directions = require('../api/data/directions.json');
const routes = require('../api/data/routes.json');
const stops = require('../api/data/stops.json');

import { render } from '../test-utils';

import { DepartureByRoute } from './DepartureByRoute';

const server = setupServer(
	rest.get('/routes', (_req, res, ctx) => {
		return res(ctx.json(routes));
	}),
	rest.get('/directions/906', (_req, res, ctx) => {
		return res(ctx.json(directions));
	}),
	rest.get('/stops/906/1', (_req, res, ctx) => {
		return res(ctx.json(stops));
	}),
	rest.get('/906/1/LIND', (_req, res, ctx) => {
		return res(ctx.json(departures));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('initial state', async () => {
	const { queryByLabelText, queryByTestId, getByText, getByLabelText } = render(
		<MemoryRouter initialEntries={['/by-route']}>
			<DepartureByRoute />
		</MemoryRouter>
	);

	expect(getByText('Real-time Departures')).toBeVisible();
	expect(getByLabelText('Route')).toBeVisible();
	expect(queryByLabelText('Direction')).not.toBeInTheDocument();
	expect(queryByLabelText('Stop')).not.toBeInTheDocument();
	expect(queryByTestId('departureSchedules')).not.toBeInTheDocument();
});

test('should retrieve departures', async () => {
	const { getByTestId, getByText, getByLabelText } = render(
		<MemoryRouter initialEntries={['/by-route']}>
			<DepartureByRoute />
		</MemoryRouter>
	);

	expect(getByText('Real-time Departures')).toBeVisible();

	await selectEvent.select(getByLabelText('Route'), 'Airport Shuttle');
	await selectEvent.select(getByLabelText('Direction'), 'Southbound');
	await selectEvent.select(getByLabelText('Stop'), 'MSP Airport Terminal 1 - Lindbergh Station');

	// wait until departures are listed
	await waitFor(() => {
		expect(getByTestId('departureSchedules')).toBeVisible();
	});

	// verify expected departures
	expect(getByTestId('stopDescription')).toHaveTextContent('Terminal 1 Lindbergh Station');
	expect(getByTestId('stopNumber')).toHaveTextContent('Stop #: 51419');
	expect(getByTestId('departuresTable').querySelectorAll('tbody tr')).toHaveLength(3);

	// expand departures and verify new count
	await userEvent.click(getByTestId('expandDepartures'));
	expect(getByTestId('departuresTable').querySelectorAll('tbody tr')).toHaveLength(8);
});

test('should hydrate previous request from route', async () => {
	const { getByTestId, getByText, getByLabelText } = render(
		<MemoryRouter initialEntries={['/by-route/906/1/LIND']}>
			<DepartureByRoute />
		</MemoryRouter>
	);

	expect(getByText('Real-time Departures')).toBeVisible();

	// wait until departures are listed
	await waitFor(() => {
		expect(getByTestId('departureSchedules')).toBeVisible();
	});

	// verify expected departures
	expect(getByTestId('stopDescription')).toHaveTextContent('Terminal 1 Lindbergh Station');
	expect(getByTestId('stopNumber')).toHaveTextContent('Stop #: 51419');
	expect(getByTestId('departuresTable').querySelectorAll('tbody tr')).toHaveLength(3);

	// expand departures and verify new count
	await userEvent.click(getByTestId('expandDepartures'));
	expect(getByTestId('departuresTable').querySelectorAll('tbody tr')).toHaveLength(8);
});

// Temporarily disabled due to a request caching issue
test.skip('should find no departures', async () => {
	server.use(
		rest.get('/906/1/LIND', (_req, res, ctx) => {
			return res(ctx.json({ stops: departures.stops, departures: [] }));
		})
	);

	const { queryByTestId, getByTestId, getByText, getByLabelText } = render(
		<MemoryRouter initialEntries={['/by-route']}>
			<DepartureByRoute />
		</MemoryRouter>
	);

	expect(getByText('Real-time Departures')).toBeVisible();

	await selectEvent.select(getByLabelText('Route'), 'Airport Shuttle');
	await selectEvent.select(getByLabelText('Direction'), 'Southbound');
	await selectEvent.select(getByLabelText('Stop'), 'MSP Airport Terminal 1 - Lindbergh Station');

	// wait until departures are listed
	await waitFor(() => {
		expect(getByTestId('departureSchedules')).toBeVisible();
	});

	// verify expected departures
	expect(getByTestId('stopDescription')).toHaveTextContent('Terminal 1 Lindbergh Station');
	expect(getByTestId('stopNumber')).toHaveTextContent('Stop #: 51419');
	expect(getByTestId('departuresTable').querySelectorAll('tbody tr')).toHaveLength(1);

	// expand departures and verify new count
	expect(queryByTestId('expandDepartures')).not.toBeInTheDocument();
});
