export interface Inputs {
	email: string;
	username: string;
	password: string;
}

interface FormErrorField {
	field: 'username' | 'email' | 'password';
}

type SequelizeErrorTypes = 'SequelizeUniqueConstraintError';

export interface RegisterValidationError {
	type: SequelizeErrorTypes;
	field: FormErrorField;
}

export type FormValues = {
	username: string;
	password: string;
};
