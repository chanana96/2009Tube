import { useState, useCallback } from 'react';

export const useTheme = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(() => {
		const savedTheme = localStorage.getItem('darkTheme');
		return savedTheme !== null ? JSON.parse(savedTheme) : true;
	});

	const toggleTheme = useCallback(() => {
		setIsDarkTheme((theme: boolean) => {
			localStorage.setItem('darkTheme', JSON.stringify(!theme));
			return !theme;
		});
	}, []);

	return { isDarkTheme, toggleTheme };
};
