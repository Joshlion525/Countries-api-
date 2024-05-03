import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Country from "./pages/Country.jsx";
import DarkModeContextProvider from "./context/darkmodecontext.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/country/:id",
		element: <Country />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<RouterProvider router={router} />
		</DarkModeContextProvider>
	</React.StrictMode>
);
