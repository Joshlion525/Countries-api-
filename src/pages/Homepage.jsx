import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Homepage = ({ toggle, setToggle }) => {
	const [country, setCountry] = useState([]);
	const [search, setSearch] = useState("");

	const getCountry = async () => {
		try {
			const response = await axios.get("http://localhost:3000/countries");
			setCountry(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getCountry();
	}, []);
	const handleSearch = (e) => {
	 const searchTerm = e.target.value.toLowerCase();
		setSearch(searchTerm);
		if (searchTerm === "") {
			getCountry();
		} else {
			const filteredCountries = country.filter((country) =>
				country.name.toLowerCase().includes(searchTerm)
			);
			setCountry(filteredCountries);
		}
	};
	return (
		<div className={`${toggle && "bg-gray-900"} font-SansSerif`}>
			<nav
				className={`${
					toggle && "bg-gray-800 text-white"
				} Navbar flex items-center justify-between py-7 px-20`}
			>
				<div>
					<h1 className="font-bold text-3xl">Where in the world?</h1>
				</div>
				<div>
					<button
						className="flex items-center gap-3 font-bold text-lg"
						onClick={() => setToggle(!toggle)}
					>
						{toggle ? (
							<MdDarkMode className="h-6 w-6" />
						) : (
							<MdOutlineDarkMode className="h-6 w-6" />
						)}{" "}
						Dark Mode
					</button>
				</div>
			</nav>
			<header className="px-20 py-12 flex items-center justify-between">
				<div
					className={`${
						toggle && "bg-gray-800"
					} flex items-center gap-5 rounded-xl px-7 py-2`}
				>
					<FaSearch
						className={`${
							toggle && "text-white"
						} text-gray-600 h-4 w-4`}
					/>
					<input
						type="text"
						placeholder="Search for country"
						className={`${
							toggle && "bg-gray-800 placeholder:text-white"
						} input text-lg placeholder:text-gray-600`}
						value={search}
						onChange={handleSearch}
					/>
				</div>
				<select name="" id="">
					<option value="">Filter by region</option>
					<option value="">Europe</option>
					<option value="">Africa</option>
					<option value="">Asia</option>
					<option value="">America</option>
				</select>
			</header>
			<main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 px-20">
				{country &&
					country.map((country) => (
						<div
							key={country.area}
							className={`${
								toggle && "bg-gray-800 text-white"
							} mb-7 div`}
						>
							<div className="h-64">
								<img
									src={country.flags.png}
									alt=""
									className="h-64"
								/>
							</div>
							<div className="px-7 pt-6 pb-11">
								<h1 className="font-bold text-2xl mb-4">
									{country.name}
								</h1>
								<p>
									<span className="font-bold">
										Population:{" "}
									</span>
									{country.population}
								</p>
								<p>
									<span className="font-bold">Region: </span>
									{country.region}
								</p>
								<p>
									<span className="font-bold">Capital: </span>
									{country.capital}
								</p>
							</div>
						</div>
					))}
			</main>
		</div>
	);
};

export default Homepage;
