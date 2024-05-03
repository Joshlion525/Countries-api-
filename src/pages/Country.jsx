import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/darkmodecontext";

const Country = () => {
	const { toggle } = useContext(DarkModeContext);
	const api = "https://restcountries.com/v3.1/alpha/";
	const { id } = useParams();
	const [countrys, setCountrys] = useState([]);
	const navigate = useNavigate();

	const countryId = async () => {
		const { data } = await axios.get(api + "/" + id);
		setCountrys(data);
	};

	useEffect(() => {
		countryId();
	}, []);

	return (
		<div
			className={`${
				toggle && "bg-gray-900 text-white"
			} min-h-screen font-SansSerif`}
		>
			<Navbar />
			<div className="px-5 py-5 md:px-10 lg:px-20">
				<div className="py-11">
					<button
						className={`${
							toggle && "bg-gray-800"
						} flex items-center gap-2 md:gap-3 text-l md:text-lg px-7 py-1 rounded-lg shadow-lg`}
						onClick={() => navigate(`/`)}
					>
						<MdOutlineKeyboardBackspace />
						Back
					</button>
				</div>
				{countrys.map((country) => (
					<div
						key={country.cca2}
						className="grid grid-cols-1 lg:grid-cols-2 md:gap-40"
					>
						<div>
							<div className="max-w-[700px] mx-auto border">
								<img
									src={country.flags.svg}
									alt={country.flags.alt}
									className="w-full"
								/>
							</div>
						</div>
						<div className="sm:text-sm">
							<h1 className="font-semibold text-3xl py-8">
								{country.name.official}
							</h1>
							<div className="flex flex-col gap-10 md:gap-16">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
									<div className="text-base md:text-lg">
										<p className="py-1">
											<span className="font-semibold">
												Native Name:
											</span>{" "}
											{country.name.nativeName &&
											Object.values(
												country.name.nativeName
											).length > 0 ? (
												Object.values(
													country.name.nativeName
												).map((native, index) => (
													<span key={index}>
														{native.official}
														{", "}
													</span>
												))
											) : (
												<span>
													{country.name.common} don't
													have a native name
												</span>
											)}
										</p>
										<p className="py-1">
											<span className="font-semibold">
												Population:{" "}
											</span>
											{country.population}
										</p>
										<p className="py-1">
											<span className="font-semibold">
												Region:
											</span>{" "}
											{country.region}
										</p>
										<p className="py-1">
											<span className="font-semibold">
												Sub-Region:
											</span>{" "}
											{country.subregion &&
											country.subregion.length > 0 ? (
												country.subregion
											) : (
												<span className="font-light">
													{country.name.common} have
													no sub-region
												</span>
											)}
										</p>
										<p className="py-1">
											<span className="font-semibold">
												Capital:
											</span>{" "}
											{country.capital &&
											country.capital.length > 0 ? (
												country.capital
											) : (
												<span>
													{country.name.common} have
													no capital
												</span>
											)}
										</p>
									</div>
									<div className="text-base md:text-lg">
										<p className="py-1">
											<span className="font-semibold">
												Top Level Domain:
											</span>{" "}
											{country.cca2}
										</p>
										<p className="py-1">
											<span className="font-semibold">
												Currencies:
											</span>{" "}
											{country.currencies &&
											Object.values(country.currencies)
												.length > 0 ? (
												Object.values(
													country.currencies
												).map((native, index) => (
													<span key={index}>
														{native.name}
														{", "}
													</span>
												))
											) : (
												<span>
													{country.name.common} have
													no currency
												</span>
											)}{" "}
										</p>
										<p className="py-1">
											<span className="font-semibold">
												Languages:
											</span>{" "}
											{country.languages &&
											Object.values(country.languages)
												.length > 0 ? (
												Object.values(
													country.languages
												).map((languages, index) => (
													<span key={index}>
														{languages}
														{", "}
													</span>
												))
											) : (
												<span>
													{country.name.common} don't
													have any language
												</span>
											)}
										</p>
									</div>
								</div>
								<div>
									<p className="text-base md:text-lg">
										<span className="font-semibold">
											Border Countries:
										</span>
										<span>
											{" "}
											{country.borders &&
											country.borders.length > 0 ? (
												country.borders.join("  ")
											) : (
												<span>
													{country.name.common} has no
													bordering countries
												</span>
											)}
										</span>{" "}
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Country;
