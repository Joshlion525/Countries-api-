import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/darkmodecontext";

const Homepage = () => {
	const [originalCountries, setOriginalCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [regions, setRegions] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
	const { toggle, setToggle } = useContext(DarkModeContext);



	useEffect(() => {
		const getCountry = async () => {
			try {
				const response = await axios.get(
					"https://restcountries.com/v3.1/all"
				);
				setOriginalCountries(response.data);
				setFilteredCountries(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		getCountry();
	}, []);

	const handleFilterByRegion = (e) => {
		const region = e.target.value;
		setRegions(region);
		filterCountries(searchTerm, region);
	};

	const handleSearch = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		filterCountries(term, regions);
	};

	const filterCountries = (searchTerm, region) => {
		let filteredCountries = originalCountries;

		if (searchTerm !== "") {
			filteredCountries = filteredCountries.filter((country) =>
				country.name.common
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);
		}

		if (region !== "") {
			filteredCountries = filteredCountries.filter(
				(country) => country.region === region
			);
		}

		setFilteredCountries(filteredCountries);
	};

	return (
		<div className={`${toggle && "bg-gray-900"} font-SansSerif`}>
			<Navbar toggle={toggle} setToggle={setToggle} />
			<header className="px-5 mt-3 gap-10 mb-8 md:px-10 lg:px-20 py-6 md:py-8 lg:py-12 flex flex-col md:flex-row items-center md:justify-between">
				<div
					className={`${
						toggle && "bg-gray-800"
					} flex items-center gap-3 w-full md:w-2/5 md:gap-5 rounded-lg px-7 py-2`}
				>
					<FaSearch
						className={`${
							toggle && "text-white"
						} text-gray-600 h-4 w-4`}
					/>
					<input
						type="text"
						placeholder="Search for country"
						value={searchTerm}
						onChange={handleSearch}
						className={`${
							toggle &&
							"bg-gray-800 text-white placeholder:text-white"
						} text-base w-full md:text-lg placeholder:text-gray-600 py-2 px-3 md:py-3 md:px-4 rounded-lg outline-none`}
					/>
				</div>
				<select
					value={regions}
					onChange={handleFilterByRegion}
					className={`outline-none px-2 py-2 md:py-3 lg:py-4 rounded-lg border border-gray-300 ${
						toggle
							? "bg-gray-800 text-white"
							: "bg-white text-gray-800"
					}`}
				>
					<option value="">Filter by region</option>
					<option value="Europe">Europe</option>
					<option value="Africa">Africa</option>
					<option value="Asia">Asia</option>
					<option value="Americas">Americas</option>
					<option value="Oceania">Oceania</option>
					<option value="Antarctic">Antarctic</option>
				</select>
			</header>
			<main className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-11 md:gap-10 lg:gap-10 px-4 md:px-10 lg:px-20">
				{filteredCountries.map((country) => (
					<div
						key={country.cca2}
						onClick={() => navigate(`/country/${country.name.common}`)}
						className={`${
							toggle && "bg-gray-800 text-white"
						} mb-7 w-72 md:w-[100%] rounded-xl shadow-lg transition duration-500 ease-in-out hover:cursor-pointer transform hover:-translate-y-4 hover:shadow-md`}
					>
						<div className="h-52 md:h-64">
							<img
								src={country.flags.png}
								alt=""
								className="h-full rounded-t-lg"
							/>
						</div>
						<div className="px-7 py-6 pb-14">
							<h1 className="font-bold text-lg md:text-xl lg:text-2xl mb-3">
								{country.name.common}
							</h1>
							<p className="text-sm md:text-base lg:text-lg mb-1">
								<span className="font-bold">Population: </span>
								{country.population}
							</p>
							<p className="text-sm md:text-base lg:text-lg mb-1">
								<span className="font-bold">Region: </span>
								{country.region}
							</p>
							<p className="text-sm md:text-base lg:text-lg">
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
