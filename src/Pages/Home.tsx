import { useContext, useRef, useState, type ReactNode } from "react";

import { Link, Outlet } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import JobApplicationCard from "../components/JobApplicationCard";
import Stats from "../components/Stats";
import { LuFileX2, LuPlus, LuSearch, LuUpload } from "react-icons/lu";
import {
	jobApplicationStatusColor,
	jobApplicationStatusOptions,
	jobPlacementType,
} from "../constants/constants";
import type {
	TJobApplicationStatus,
	TPlacementType,
} from "../interfaces/Data.interface";
import { JobApplicationStatusIcon, JobPlacementIcon } from "../libs/icons";
import { JobApplicationsTable } from "../components/JobApplicationsTable";
import { DisplayViewListGrid } from "../components/DisplayViewListGrid";

export default function Home(): ReactNode {
	const { jobsApplicationsController, importDataAsJSON } = useContext(
		Context
	) as IContext;

	const [jobStatus, setJobStatus] = useState<"Total" | TJobApplicationStatus>(
		"Total"
	);
	const [jobPlacementCat, setJobPlacementCat] = useState<
		"Total" | TPlacementType
	>("Total");

	const [searchText, setSearchText] = useState<string>("");
	const [isGrid, setIsGrid] = useState<boolean>(true);

	const jsonFileInputRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<div className="glass rounded-2xl p-2 md:p-4 flex flex-col gap-2 md:gap-4 min-h-[85dvh]">
				<div className="flex flex-col gap-1">
					<h1 className="text-3xl font-semibold">My Job Applications</h1>
					<p className="text-base">
						A complete list of jobs you’ve saved and applied to.
					</p>
				</div>
				<Stats />
				<div
					className={`flex justify-end items-center gap-2 flex-wrap ${
						jobsApplicationsController.jobs.length == 0
							? "opacity-70 pointer-events-none"
							: ""
					}`}
				>
					<div className="glass w-fit text-xs sm:text-sm rounded-full relative pr-1.5 flex items-center">
						<JobApplicationStatusIcon
							applicationStatus={jobStatus}
							className="text-sm sm:text-base absolute left-2 top-1/2 -translate-y-1/2 opacity-70"
						/>
						<select
							className="outline-0 cursor-pointer pl-8 py-2 pr-2"
							onChange={(e) =>
								setJobStatus(e.target.value as "Total" | TJobApplicationStatus)
							}
							value={jobStatus}
						>
							<option className="text-gray-900" value={"Total"}>
								All
							</option>
							{jobApplicationStatusOptions.map((st, i) => (
								<option key={i} className="text-gray-900" value={st}>
									{st}
								</option>
							))}
						</select>
					</div>
					<div className="glass w-fit text-xs sm:text-sm rounded-full relative pr-1.5 flex items-center">
						<JobPlacementIcon
							jobPlacementType={jobPlacementCat}
							className="text-sm sm:text-base absolute left-2 top-1/2 -translate-y-1/2 opacity-70"
						/>
						<select
							className="outline-0 cursor-pointer pl-8 py-2 pr-2"
							onChange={(e) =>
								setJobPlacementCat(e.target.value as "Total" | TPlacementType)
							}
							value={jobPlacementCat}
						>
							<option className="text-gray-900" value={"Total"}>
								All
							</option>
							{jobPlacementType.map((st, i) => (
								<option key={i} className="text-gray-900" value={st}>
									{st}
								</option>
							))}
						</select>
					</div>
					<div className="glass rounded-full text-xs sm:text-sm relative">
						<LuSearch className="absolute text-sm sm:text-base opacity-70 top-1/2 -translate-y-1/2 left-2" />
						<input
							type="text"
							placeholder="Search with job title, company name"
							className="outline-0 p-2 pl-8"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</div>
					<DisplayViewListGrid isGrid={isGrid} setIsGrid={setIsGrid} />
				</div>

				{jobsApplicationsController.jobs.length > 0 && (
					<>
						{jobsApplicationsController.getStat(jobStatus).length > 0 && (
							<>
								{isGrid && (
									<div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
										{jobsApplicationsController
											.getStat(jobStatus)
											.filter(
												(job) =>
													(searchText == ""
														? job
														: job.job_title
																.toLowerCase()
																.includes(searchText.toLowerCase()) ||
														  job.company_name
																.toLowerCase()
																.includes(searchText.toLowerCase())) &&
													(jobPlacementCat == "Total"
														? job
														: job.placement_type == jobPlacementCat)
											)
											.map((job, i) => (
												<JobApplicationCard job={job} key={i} />
											))}
									</div>
								)}
								{!isGrid && (
									<JobApplicationsTable
										jobsApplications={jobsApplicationsController
											.getStat(jobStatus)
											.filter(
												(job) =>
													(searchText == ""
														? job
														: job.job_title
																.toLowerCase()
																.includes(searchText.toLowerCase()) ||
														  job.company_name
																.toLowerCase()
																.includes(searchText.toLowerCase())) &&
													(jobPlacementCat == "Total"
														? job
														: job.placement_type == jobPlacementCat)
											)}
									/>
								)}
							</>
						)}
						{jobsApplicationsController
							.getStat(jobStatus)
							.filter(
								(job) =>
									(searchText == ""
										? job
										: job.job_title.includes(searchText)) &&
									(jobPlacementCat == "Total"
										? job
										: job.placement_type == jobPlacementCat)
							).length == 0 && (
							<div className="flex p-20 items-center justify-center flex-col gap-4">
								<LuFileX2 className="text-4xl" />
								<p className="text-sm max-w-[400px] text-center">
									There are no{" "}
									<span className="font-semibold">
										{jobPlacementCat == "Total" ? "" : jobPlacementCat}
									</span>{" "}
									job applications currently{" "}
									<>
										{jobStatus != "Total" && (
											<>
												marked as{" "}
												<span
													className={
														jobApplicationStatusColor[
															jobStatus as TJobApplicationStatus
														]
													}
												>
													{jobStatus}
												</span>
											</>
										)}{" "}
										{searchText != "" && (
											<>
												matches <span className="underline">{searchText}</span>
											</>
										)}
									</>
								</p>
							</div>
						)}
					</>
				)}

				{jobsApplicationsController.jobs.length == 0 && (
					<div className="flex flex-col items-center flex-1 justify-center">
						<LuFileX2 className="text-4xl mb-4" />
						<p className="text-center text-sm max-w-[600px]">
							You don’t have any job applications saved yet. Start by adding
							your first application to easily track your progress, monitor
							updates, and keep everything organized. You can also upload your
							existing job applications as a JSON file to quickly import them
							all at once.
						</p>
						<div className="flex gap-2 mt-2">
							<Link
								to={"/job/new"}
								className="flex items-center text-xs gap-2 bg-white w-fit text-gray-900 p-2 pr-3 cursor-pointer rounded-full mt-2"
							>
								<LuPlus className="text-sm" />
								<span>New Application</span>
							</Link>
							<div
								className="flex items-center text-xs gap-2 glass w-fit text-gray-900 p-2 pr-3 cursor-pointer rounded-full mt-2"
								onClick={() => jsonFileInputRef.current?.click()}
							>
								<LuUpload className="text-sm" />
								<span>Import JSON</span>
							</div>
						</div>
					</div>
				)}
			</div>
			<input
				type="file"
				accept="application/json"
				ref={jsonFileInputRef}
				className="hidden"
				onChange={importDataAsJSON}
			/>
			<Outlet />
		</>
	);
}
