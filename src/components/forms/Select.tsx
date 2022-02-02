import { ActionMeta, default as ReactSelect } from 'react-select';

interface SelectProps<Option> {
	name: string;
	value?: Option | null;
	options: any;
	onChange: (option: Option | null, actionMeta: ActionMeta<Option>) => void;
}

function Select<Option>(props: SelectProps<Option>) {
	return <ReactSelect {...props} />;
}

export { Select };
