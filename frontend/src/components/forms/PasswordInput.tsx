import { Control } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { InputLabel, InputAdornment, OutlinedInput, IconButton } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface PasswordInputProps {
	control: Control;
	name: string;
	label: string;
	rules?: RegisterOptions;
}

export const PasswordInput = ({ control, name, label, rules }: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<FormControl fullWidth variant='outlined'>
					<InputLabel error={!!error} htmlFor={`${name}-input`}>
						{label}
					</InputLabel>
					<OutlinedInput
						{...field}
						id={`${name}-input`}
						type={showPassword ? 'text' : 'password'}
						error={!!error}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									{showPassword ?
										<VisibilityOff />
									:	<Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			)}
		/>
	);
};
