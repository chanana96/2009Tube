import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/forms/PasswordInput';

interface SettingsForm {
	'new-username': string;
	'previous-password': string;
	'new-password': string;
	'confirm-password': string;
}

const defaultValues = {};

export const SettingsForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		reset,
		resetField,
		clearErrors,
		getValues,
	} = useForm<SettingsForm>({
		defaultValues,
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<SettingsForm> = async (data, e) => {};

	return (
		<div className='form-container'>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					'display': 'flex',
					'flexDirection': 'column',
					'gap': 2,
					'width': '100%',
					'maxWidth': '400px',
					'padding': 3,
					'backgroundColor': 'background.paper',
					'borderRadius': 2,
					'border': 1,
					'borderColor': 'divider',
					'boxShadow': 3,
					'& .MuiTextField-root': {
						width: '100%',
					},
				}}>
				<Stack spacing={3}>
					<Controller
						name='new-username'
						control={control}
						rules={{ required: 'Username is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label='New Username'
								error={!!errors['new-username']}
								helperText={errors['new-username']?.message}
								fullWidth
							/>
						)}
					/>
					<PasswordInput
						control={control}
						name='current-password'
						label='Current Password'
						rules={{ required: 'Password is required' }}
					/>

					<Stack spacing={2}>
						<PasswordInput
							control={control}
							name='new-password'
							label='New Password'
							rules={{ required: 'Password is required' }}
						/>

						<PasswordInput
							control={control}
							name='confirm-password'
							label='Confirm Password'
							rules={{
								validate: (value) =>
									value === getValues('new-password') || 'Passwords do not match',
							}}
						/>
					</Stack>

					<Button type='submit' variant='contained' fullWidth>
						Update Settings
					</Button>
				</Stack>
			</Box>
		</div>
	);
};
