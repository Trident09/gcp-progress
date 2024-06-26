import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import { DataCompletes } from "../assets/data";

function DataTable() {
	const [searchTerm, setSearchTerm] = useState("");
	const [totalCompletionFilter, setTotalCompletionFilter] = useState(false);
	const [redemptionStatusFilter, setRedemptionStatusFilter] = useState(false);
	const [nonRedemptionFilter, setNonRedemptionFilter] = useState(false);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleTotalCompletionClick = () => {
		setTotalCompletionFilter(!totalCompletionFilter);
		if (redemptionStatusFilter) {
			setRedemptionStatusFilter(!redemptionStatusFilter);
		}
		if (nonRedemptionFilter) {
			setNonRedemptionFilter(!nonRedemptionFilter);
		}
	};
	const handleRedemptionStatusClick = () => {
		setRedemptionStatusFilter(!redemptionStatusFilter);
		if (totalCompletionFilter) {
			setTotalCompletionFilter(!totalCompletionFilter);
		}
		if (nonRedemptionFilter) {
			setNonRedemptionFilter(!nonRedemptionFilter);
		}
	};
	const handleNonRedemptionClick = () => {
		setNonRedemptionFilter(!nonRedemptionFilter);
		if (totalCompletionFilter) {
			setTotalCompletionFilter(!totalCompletionFilter);
		}
		if (redemptionStatusFilter) {
			setRedemptionStatusFilter(!redemptionStatusFilter);
		}
	};

	const sortedDataCompletes = [...DataCompletes].sort((a, b) => {
		if (a["Redemption"] > b["Redemption"]) return -1;
		if (a["Redemption"] < b["Redemption"]) return 1;

		if (a["Completed"] > b["Completed"]) return -1;
		if (a["Completed"] < b["Completed"]) return 1;

		const sumA =
			a["Gen AI Arcade"] + a["Prompt Design"] + a["Develop GenAI"];
		const sumB =
			b["Gen AI Arcade"] + b["Prompt Design"] + b["Develop GenAI"];
		return sumB - sumA;
	});

	let filteredData = sortedDataCompletes.filter((datacomplete) =>
		datacomplete["User Name"]
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);
	if (totalCompletionFilter) {
		filteredData = filteredData.filter(
			(dataComplete) => dataComplete["Completed"].toLowerCase() === "yes"
		);
	}

	if (redemptionStatusFilter) {
		filteredData = filteredData.filter(
			(dataComplete) => dataComplete["Redemption"].toLowerCase() === "yes"
		);
	}

	if (nonRedemptionFilter) {
		filteredData = filteredData.filter(
			(dataComplete) => dataComplete["Redemption"].toLowerCase() === "no"
		);
	}

	useEffect(() => {
		const tour = new Shepherd.Tour({
			useModalOverlay: true,
			defaultStepOptions: {
				classes: "Students",
				scrollTo: false,
			},
		});
	
		tour.addStep({
			id: "Students",
			text: "This is the total number of students who have enrolled.",
			attachTo: {
				element: ".Students",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
		tour.addStep({
			id: "Redemptions",
			text: "This is the total number of students who have redeemed their courses.",
			attachTo: {
				element: ".Redemptions",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
		tour.addStep({
			id: "GenAI",
			text: "This is the total number of students who have completed the GenAI course.",
			attachTo: {
				element: ".GenAI",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
		tour.addStep({
			id: "GCP",
			text: "This is the total number of students who have completed the GCP course.",
			attachTo: {
				element: ".GCP",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
		tour.addStep({
			id: "Totality",
			text: "This is the total number of students who have completed both the courses.",
			attachTo: {
				element: ".Totality",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
		tour.addStep({
			id: "Tier",
			text: "This is the tier of the student based on the total completions.",
			attachTo: {
				element: ".Tier",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
	
		tour.addStep({
			id: "SearchBar",
			text: "This is the search bar. You can search for students by their name here.",
			attachTo: {
				element: ".SearchBar",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
	
		tour.addStep({
			id: "RedemptionDone",
			text: "This button filters the students who have redeemed their courses.",
			attachTo: {
				element: ".RedemptionDone",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
	
		tour.addStep({
			id: "TotalCompletion",
			text: "This button filters the students who have completed their courses.",
			attachTo: {
				element: ".TotalCompletion",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
	
		tour.addStep({
			id: "NotRedeemed",
			text: "This button filters the students who have not redeemed their courses.",
			attachTo: {
				element: ".NotRedeemed",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
	
		tour.addStep({
			id: "Leaderboard",
			text: "This button takes you to the leaderboard.",
			attachTo: {
				element: ".Leaderboard",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "→",
					action: tour.next,
				},
			],
		});
	
		tour.addStep({
			id: "TableData",
			text: "This is the table where the student data is displayed.",
			attachTo: {
				element: ".TableData",
				on: "bottom",
			},
			buttons: [
				{
					text: "╳",
					action: tour.cancel,
				},
				{
					text: "←",
					action: tour.back,
				},
				{
					text: "End",
					action: tour.complete,
				},
			],
		});
	
		tour.start();
	
		return () => {
			tour.complete();
		};
	}, []);

	const redeemedStudents = DataCompletes.filter((datacomplete) =>
		datacomplete["Redemption"].toLowerCase().includes("yes")
	);
	const genAICompletions = DataCompletes.filter((datacomplete) =>
		datacomplete["Gen AI Arcade"].includes("1")
	);
	const totalCompletions = DataCompletes.filter((datacomplete) =>
		datacomplete["Completed"].toLowerCase().includes("yes")
	);
	const GCCFCompletions = DataCompletes.filter(
		(datacomplete) =>
			datacomplete["Prompt Design"].includes("1") &&
			datacomplete["Develop GenAI"].includes("1")
	);

	const getTier = (total) => {
		if (total < 40) return "NA";
		if (total >= 60 && total < 80) return "Two";
		if (total >= 80) return "One";
		return "NA";
	};

	return (
		<>
			<div className="w-full flex justify-center items-center pt-4">
				<input
					className="SearchBar w-[80%] h-10 py-4 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-lg uppercase"
					type="text"
					onChange={handleSearch}
					placeholder="Search by name..."
				/>
			</div>
			<div className="w-full flex justify-center items-center pt-4 py-2 flex-row">
				<div className="buttons flex justify-around top-5 left-5">
					<button
						className="RedemptionDone btn text-black"
						onClick={handleRedemptionStatusClick}
					>
						<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
						<p
							className="after:text-black"
							data-start="good luck!"
							data-text="Filter"
							data-title="Redeemed"
						></p>
					</button>
				</div>
				<div className="buttons flex justify-around top-5 left-5">
					<button
						className="TotalCompletion btn text-black"
						onClick={handleTotalCompletionClick}
					>
						<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
						<p
							className="after:text-black"
							data-start="good luck!"
							data-text="Filter"
							data-title="Completed"
						></p>
					</button>
				</div>
				<div className="buttons flex justify-around top-5 left-5">
					<button
						className="NotRedeemed btn text-black"
						onClick={handleNonRedemptionClick}
					>
						<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
						<p
							className="after:text-black"
							data-start="good luck!"
							data-text="Filter"
							data-title="Non-Redeemed"
						></p>
					</button>
				</div>
				<Link to="/leaderboard">
					<div className="buttons flex justify-around top-5 left-5">
						<button className="Leaderboard btn text-black">
							<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
							<p
								className="after:text-black"
								data-start="good luck!"
								data-text="Visit"
								data-title="Leader Board"
							></p>
						</button>
					</div>
				</Link>
			</div>
			<div className="w-full flex justify-center items-center pt-4 py-2 flex-col">
				<div className="w-[80%] grid grid-cols-3 gap-2 text-normal font-semibold text-gray-700 ">
					<p className="Students flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
						Total Students :{" "}
						<b className="text-blue-500">{DataCompletes.length}</b>
					</p>
					<p className="Redemptions flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
						Total Redemptions :{" "}
						<b className="text-blue-500">
							{redeemedStudents.length}
						</b>
					</p>
					<p className="GenAI flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
						Total GenAI Completions :{" "}
						<b className="text-blue-500">
							{genAICompletions.length}
						</b>
					</p>
					<p className="GCP flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
						Total GCP Completions :{" "}
						<b className="text-blue-500">
							{GCCFCompletions.length}
						</b>
					</p>
					<p className="Totality flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
						Totality Completions :{" "}
						<b className="text-blue-500">
							{totalCompletions.length}
						</b>
					</p>
					<p className="Tier flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
						Tier :{" "}
						<b className="text-blue-500">
							{getTier(totalCompletions.length)}
						</b>
					</p>
				</div>
			</div>
			<div className="py-5 px-0 max-w-7xl md:px-4 w-full flex items-center justify-center mx-auto">
				<table className="TableData table table-hover fa-border">
					<thead>
						<tr className="uppercase">
							<th scope="col">
								<b>#</b>
							</th>
							<th scope="col">
								<b>Name</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Prompt Design</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Develop GenAI</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Gen AI</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Completed</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Redemption</b>
							</th>
						</tr>
					</thead>
					<tbody id="gccp_body">
						{filteredData.map((datacomplete, index) => (
							<tr
								key={index}
								className={
									datacomplete["Completed"] === "Yes"
										? "bg-green-200"
										: datacomplete["Redemption"] === "No"
										? "bg-red-50"
										: ""
								}
							>
								<td className="whitespace-nowrap">
									{index + 1}
								</td>
								<td className="whitespace-nowrap">
									{datacomplete["User Name"].toUpperCase()}
									<b>
										{datacomplete["Completed"] === "Yes"
											? " 🏅 "
											: ""}
									</b>
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Prompt Design"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Develop GenAI"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Gen AI Arcade"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Completed"] === "Yes"
										? "✅"
										: "❌"}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Redemption"] === "Yes"
										? "☑️"
										: "❗️"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default DataTable;
