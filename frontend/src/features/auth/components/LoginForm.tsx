import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useAuth';
import { useFormAlert } from '@/hooks/useFormAlert';
import { FormAlert } from '@/components/forms/Alert';
import { LoginInput, loginInputSchema } from '@/lib/schemas';

type LoginFormProps = {
	onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const form = useForm<LoginInput>({
		resolver: zodResolver(loginInputSchema),
	});
	const { register, handleSubmit, setError } = form;
	const formAlert = useFormAlert(form);

	const login = useLogin({ onSuccess });
	const submitHandler: SubmitHandler<LoginInput> = (inputValues) => {
		login.mutate(inputValues);
	};
	return (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={handleSubmit(submitHandler)} className='mt-28 '>
					<FormAlert
						show={formAlert.hasErrors}
						message={formAlert.errorMessage}
						onClose={formAlert.handleClearErrors}
					/>
					<Box className='shadow-md p-4 bg-form-bg text-primary'>
						<div className='flex-1'>
							<Typography component='h1' variant='h5' className='pb-2'>
								LOG IN
							</Typography>

							<Grid
								container
								spacing={2}
								className='flex items-center justify-center mb-2'>
								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('email')}
										label='Email'
										variant='outlined'
										fullWidth
										required
										autoFocus
										autoComplete='email'
										type='text'
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
										autoComplete='password'
										type='password'
										className='w-full'
									/>
								</Grid>

								<Grid className='w-full md:w-full xs:w-2/3'>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										className='mt-3 mb-4 w-full'>
										Log in
									</Button>
								</Grid>
							</Grid>
							<Grid container justifyContent='center'>
								<Grid>
									<Link to='/auth/register'>Don't have an account? Sign up</Link>
								</Grid>
							</Grid>
						</div>
					</Box>
				</form>
			</Container>
		</>
	);
};
