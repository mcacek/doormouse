import * as React from 'react';
import { ApiContext } from './api-context';
import { ApiContextValue } from './types';

function useApi() {
	return React.useContext(ApiContext) as ApiContextValue;
}

export { useApi };
