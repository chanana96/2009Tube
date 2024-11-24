import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import validator from 'validator';
import type { Inputs } from '../types';
import { registerUserApi } from '@/features/auth/api/auth_api';

export default function RegisterForm() {
	const [inputs, setInputs] = useState<Inputs>({ email: '', username: '', password: '' });
	const [alert, setAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState('There was a problem with your submission');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!Object.values(inputs).every((value) => value.length > 0)) {
			setErrorMessage('Field cannot be blank');
			setAlert(true);
			return;
		}

		if (!validator.isEmail(inputs.email)) {
			setErrorMessage('Invalid email');
			setAlert(true);
			return;
		}

		const res = await registerUserApi(inputs);
		if (res.type == 'SequelizeUniqueConstraintError') {
			setErrorMessage(
				`${res.field.charAt(0).toUpperCase() + res.field.slice(1)} is already taken`,
			);
			setAlert(true);
			return;
		}

		setInputs({ email: '', username: '', password: '' });
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name,
			value = event.target.value;

		setInputs((values) => ({ ...values, [name]: value }));
	};
	return (
		<div className='form-container'>
			<Box
				component='form'
				onSubmit={handleSubmit}
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
				noValidate
				autoComplete='on'>
				{alert && (
					<Alert
						severity='error'
						onClose={() => {
							setAlert(false);
						}}>
						{errorMessage}
					</Alert>
				)}
				<TextField
					label='Email'
					type='email'
					name='email'
					value={inputs.email}
					onChange={handleChange}
				/>
				<TextField
					label='Username'
					type='username'
					name='username'
					value={inputs.username}
					onChange={handleChange}
				/>
				<TextField
					label='Password'
					type='password'
					name='password'
					value={inputs.password}
					onChange={handleChange}
					autoComplete='current-password'
				/>
				<Button variant='contained' type='submit'>
					Sign up
				</Button>
				<Button variant='contained' type='submit' startIcon={<FcGoogle size={20} />}>
					Sign up with Google
				</Button>
			</Box>
		</div>
	);
}
