import { UseFormReturn } from 'react-hook-form';

export const useFormAlert = <T>(form: UseFormReturn<T>) => {
	const {
		formState: { errors },
		clearErrors,
		reset,
	} = form;

	const hasErrors = Object.keys(errors).length > 0;
	const errorMessage = (errors.root?.message ||
		Object.values(errors)[0]?.message ||
		'') as string;

	const handleClearErrors = () => {
		clearErrors();
		reset(undefined, { keepDirtyValues: true });
	};

	return {
		hasErrors,
		errorMessage,
		handleClearErrors,
	};
};
