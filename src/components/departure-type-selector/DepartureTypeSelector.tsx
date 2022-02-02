import React from 'react';
import { Link } from 'react-router-dom';
import { UrlAwareLink } from '../UrlAwareLink';

interface DepartureTypeOptions {
	label: string;
	url: string;
}

const options: DepartureTypeOptions[] = [
	{
		label: 'By Route',
		url: 'by-route',
	},
	{
		label: 'By Stop #',
		url: 'by-stop',
	},
];

function DepartureTypeSelector() {
	return (
		<div className="mb-4 text-center">
			{options.map(({ label, url }) => (
				<UrlAwareLink
					to={url}
					key={label}
					activeClass="bottom !bg-blue-500 !text-white"
					className="bg-blue-100 px-4 py-4 text-blue-500 text-lg font-semibold relative inline-block">
					{label}
				</UrlAwareLink>
			))}
		</div>
	);
}

export { DepartureTypeSelector };
