import * as React from 'react';

import { ApiContext } from './api-context';
import { KyInstance } from 'ky/distribution/types/ky';

interface ApiProviderProps {
	apiClient: KyInstance;
	children: React.ReactNode;
}

function ApiProvider({ apiClient, children }: ApiProviderProps) {
	const contextValue = {
		apiClient,
	};

	return (
		<>
			<ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
		</>
	);
}

export { ApiProvider };
