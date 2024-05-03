import React from "react";
import { useContext } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { DarkModeContext } from "../context/darkmodecontext";

const Navbar = () => {
	const { toggle, setToggle } = useContext(DarkModeContext);
	return (
		<nav
			className={`${
				toggle ? "bg-gray-800 text-white" : ""
			} Navbar flex items-center flex-row justify-between py-6 md:py-7 px-5 md:px-10 lg:px-20`}
		>
			<div className="flex items-center justify-center md:justify-start">
				<h1 className="font-bold text-l md:text-3xl">
					Where in the world?
				</h1>
			</div>
			<div className="flex items-center mt-0">
				<button
					className="flex items-center gap-2 md:gap-3 text-l md:text-lg"
					onClick={() => setToggle(!toggle)}
				>
					{toggle ? (
						<MdDarkMode className="h-4 w-4 md:h-6 md:w-6" />
					) : (
						<MdOutlineDarkMode className="h-4 w-4 md:h-6 md:w-6" />
					)}{" "}
					Dark Mode
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
