import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Typography,
	Container,
	Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRegister } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerInputSchema, RegisterInput } from '@/lib/schemas';
import { useFormAlert } from '@/hooks/useFormAlert';
import { FormAlert } from '@/components/forms/Alert';
import type { UseFormSetError } from 'react-hook-form';

export type RegisterFormProps = {
	onSuccess: () => void;
	onError: <T>(setError: UseFormSetError<T>) => (errorMessage: string) => void;
};

export const RegisterForm = ({ onSuccess, onError }: RegisterFormProps) => {
	const form = useForm<RegisterInput>({
		resolver: zodResolver(registerInputSchema),
	});

	const { register, handleSubmit, setError } = form;

	const formAlert = useFormAlert(form);

	const registering = useRegister({ onSuccess, onError: onError(setError) });
	const submitHandler: SubmitHandler<RegisterInput> = (inputValues) => {
		registering.mutate(inputValues);
	};
	return (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={handleSubmit(submitHandler)} className='mt-28'>
					<FormAlert
						show={formAlert.hasErrors}
						message={formAlert.errorMessage}
						onClose={formAlert.handleClearErrors}
					/>
					<Box className='shadow-md p-4 bg-form-bg text-primary'>
						<div className='flex-6'>
							<Typography component='h1' variant='h5' className='pb-2'>
								SIGN UP
							</Typography>

							<Grid
								container
								spacing={2}
								className='flex items-center justify-center mb-2'>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('username')}
										label='Username'
										variant='outlined'
										fullWidth
										required
										autoComplete='username'
										type='username'
										className='w-full'
									/>
								</Grid>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('email')}
										label='Email'
										variant='outlined'
										fullWidth
										required
										autoComplete='email'
										type='email'
										className='w-full'
									/>
								</Grid>

								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('password')}
										label='Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
										className='w-full'
									/>
								</Grid>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('confirmPassword')}
										label='Confirm Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
										className='w-full'
									/>
								</Grid>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<FormControlLabel
										control={
											<Checkbox
												{...register('allowEmails', {
													setValueAs: (value) => value === true,
												})}
												color='primary'
											/>
										}
										label='I want to receive updates and news via email.'
									/>
								</Grid>

								<Grid className='w-full md:w-full xs:w-2/3'>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										className='mt-3 mb-2'>
										Sign Up
									</Button>
								</Grid>
							</Grid>
							<Grid container justifyContent='center'>
								<Grid>
									<Link to='/auth/login'>Already have an account? Sign in</Link>
								</Grid>
							</Grid>
						</div>
					</Box>
				</form>
			</Container>
		</>
	);
};
