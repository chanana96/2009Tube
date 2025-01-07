import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ThemeContextType = {
	isDarkTheme: boolean;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
