import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext({});

const DarkModeContextProvider = ({ children }) => {
	const [toggle, setToggle] = useState(() => {
		const storedToggle = localStorage.getItem("darkMode");
		return storedToggle ? JSON.parse(storedToggle) : false;
	});

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(toggle));
	}, [toggle]);

	const contextValue = {
		toggle,
		setToggle,
	};
	return (
		<DarkModeContext.Provider value={contextValue}>
			{children}
		</DarkModeContext.Provider>
	);
};

export default DarkModeContextProvider;
