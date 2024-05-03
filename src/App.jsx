import Homepage from "./pages/Homepage";
import { useState, useContext } from "react";
import { DarkModeContext } from "./context/darkmodecontext";

function App() {
	const { toggle } = useContext(DarkModeContext);

	return (
		<div
			className={`${toggle && "bg-gray-900"} min-h-screen font-SansSerif`}
		>
			<Homepage />
		</div>
	);
}

export default App;
