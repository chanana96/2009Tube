import { Alert } from '@mui/material';

interface FormAlertProps {
	show: boolean;
	message: string;
	onClose: () => void;
}

export const FormAlert = ({ show, message, onClose }: FormAlertProps) => {
	if (!show) return null;

	return (
		<Alert variant='outlined' severity='warning' onClose={onClose}>
			{message}
		</Alert>
	);
};
