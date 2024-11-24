import { Inputs } from '../types';
import validator from 'validator';

type ValidationRule = {
	test: (inputs: Inputs) => boolean;
	message: string;
};

export const validateForm = (inputs: Inputs) => {
	const rules: ValidationRule[] = [
		{
			test: (inputs) => Object.values(inputs).every((value) => value.length > 0),
			message: 'Field cannot be blank',
		},
		{
			test: (inputs) => validator.isEmail(inputs.email),
			message: 'Invalid email',
		},
	];

	return rules.find((rule) => !rule.test(inputs))?.message;
};
