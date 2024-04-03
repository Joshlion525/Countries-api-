import Homepage from "./pages/Homepage";
import { useState } from "react";

function App() {
	const [toggle, setToggle] = useState(false);

	return (
		<>
			<Homepage toggle={toggle} setToggle={setToggle} />
		</>
	);
}

export default App;
