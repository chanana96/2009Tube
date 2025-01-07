import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import Container from '@mui/material/Container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormAlert } from '@/hooks/useFormAlert';
import { FormAlert } from '@/components/forms/Alert';
import Grid from '@mui/material/Grid2';
import { NewUsernameOrPasswordInput, newUsernameOrPasswordInputSchema } from '@/lib/schemas';
//todo
type SettingsFormProps = {
	onSuccess: () => void;
};

export const SettingsForm = ({ onSuccess }: SettingsFormProps) => {
	const form = useForm<NewUsernameOrPasswordInput>({
		resolver: zodResolver(newUsernameOrPasswordInputSchema),
	});
	const { register, handleSubmit, setError } = form;
	const formAlert = useFormAlert(form);

	const registering = useLogin({ onSuccess });
	const submitHandler: SubmitHandler<NewUsernameOrPasswordInput> = (inputValues) => {
		registering.mutate(inputValues);
	};

	return (
		<Container maxWidth='sm'>
			<form onSubmit={handleSubmit(submitHandler)} className='mt-28 '>
				<FormAlert
					show={formAlert.hasErrors}
					message={formAlert.errorMessage}
					onClose={formAlert.handleClearErrors}
				/>
				<Box className='shadow-md p-4 bg-form-bg text-primary'>
					<div className='flex-1'>
						<Grid
							container
							spacing={2}
							className='flex items-center justify-center mb-2'>
							<Grid className='w-full md:w-full xs:w-2/3'>
								<TextField
									{...register('Username')}
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
									{...register('Password')}
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
								<TextField
									{...register('Password')}
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
								<TextField
									{...register('Password')}
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
									Update Settings
								</Button>
							</Grid>
						</Grid>
					</div>
				</Box>
			</form>
		</Container>
	);
};
