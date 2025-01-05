import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '@/lib/auth';

type Inputs = {
	Email: string;
	Password: string;
};

type LoginFormProps = {
	onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
	const registering = useLogin({ onSuccess });
	const submitHandler: SubmitHandler<Inputs> = (inputValues) => {
		registering.mutate(inputValues);
	};
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	return (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={handleSubmit(submitHandler)} className='mt-28 '>
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
										{...register('Email', { required: true })}
										label='Email'
										variant='outlined'
										fullWidth
										required
										autoFocus
										autoComplete='username'
										type='text'
										className='w-full'
									/>
								</Grid>

								<Grid className='w-full md:w-full xs:w-2/3'>
									<TextField
										{...register('Password', { required: true, minLength: 8 })}
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
