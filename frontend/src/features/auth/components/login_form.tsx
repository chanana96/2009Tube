import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler, FieldError } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { loginUserApi } from '@/features/auth/api/auth_api';
import { FormValues } from '@/features/auth/types';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		reset,
		resetField,
		clearErrors,
	} = useForm<FormValues>({
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
		const result = await loginUserApi({ username: data.username, password: data.password });

		if (result == 'Invalid login') {
			setError('login', { type: 'custom', message: 'Invalid login' });
			resetField('password', { keepError: true });
		} else {
			navigate('/');
			navigate(0);
		}
	};

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
				}}
				autoComplete='on'>
				{Object.values(errors).length > 0 && (
					<Alert
						severity='error'
						onClose={() => {
							clearErrors();
							reset(undefined, { keepDirtyValues: true });
						}}>
						{(Object.values(errors)[0] as FieldError)?.message}
					</Alert>
				)}

				<Controller
					name='username'
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Username cannot be blank',
						},
						minLength: {
							value: 3,
							message: 'Username must be at least 3 characters',
						},
						maxLength: {
							value: 16,
							message: 'Username cannot be longer than 16 characters',
						},
					}}
					render={({ field }) => (
						<TextField {...field} type='username' label='Username' />
					)}
				/>
				<Controller
					name='password'
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Password cannot be blank',
						},
						minLength: {
							value: 4,
							message: 'Password must be at least 4 characters',
						},
						maxLength: {
							value: 16,
							message: 'Password cannot be longer than 16 characters',
						},
					}}
					render={({ field }) => (
						<TextField {...field} type='password' label='Password' />
					)}
				/>

				<Button variant='contained' type='submit'>
					Log in
				</Button>
			</Box>
		</div>
	);
}
