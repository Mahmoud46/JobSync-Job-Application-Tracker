import { useContext, useEffect, useState } from "react";
import {
	LuBriefcaseBusiness,
	LuBuilding,
	LuCalendarPlus,
	LuCalendarX,
	LuFilePen,
	LuFileX,
	LuLink,
	LuNotebookPen,
	LuPenLine,
	LuPlus,
	LuX,
} from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import type {
	TJobApplicationStatus,
	TPlacementType,
} from "../interfaces/Data.interface";
import { JobApplicationStatusIcon, JobPlacementIcon } from "../libs/icons";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

const jobApplicationStatusOptions: TJobApplicationStatus[] = [
	"Applied",
	"Interviewing",
	"Offer",
	"Hired",
	"Rejected",
];
const jobPlacementType: TPlacementType[] = ["Remote", "On-site", "Hybrid"];

export default function EditJob() {
	const { id } = useParams();

	const { jobsApplicationsController } = useContext(Context) as IContext;

	const navigate = useNavigate();
	const today = new Date().toISOString().split("T")[0];

	// Form
	const [jobTitle, setJobTitle] = useState<string>("");
	const [companyName, setCompanyName] = useState<string>("");
	const [applicationDate, setApplicationDate] = useState<string>(today);
	const [applicationStatus, setApplicationStatus] =
		useState<TJobApplicationStatus>("Applied");
	const [placementType, setPlacementType] = useState<TPlacementType>("Remote");
	const [jobPostLink, setJobPostLink] = useState<string>("");
	const [note, setNote] = useState<string>("");

	useEffect(() => {
		if (jobsApplicationsController.include(id as string)) {
			setJobTitle(
				jobsApplicationsController.getJobApplication(id as string).job_title
			);
			setCompanyName(
				jobsApplicationsController.getJobApplication(id as string).company_name
			);
			setApplicationDate(
				jobsApplicationsController.getJobApplication(id as string)
					.application_date
			);
			setApplicationStatus(
				jobsApplicationsController.getJobApplication(id as string).status
			);
			setPlacementType(
				jobsApplicationsController.getJobApplication(id as string)
					.placement_type
			);
			setJobPostLink(
				jobsApplicationsController.getJobApplication(id as string).post_link ??
					""
			);
			setNote(
				jobsApplicationsController.getJobApplication(id as string).notes ?? ""
			);
		}
	}, [jobsApplicationsController, id]);

	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			<div className="glass p-2 rounded-2xl w-full max-h-[500px] overflow-auto flex flex-col gap-2 sm:w-[50%]">
				<div className="sticky top-0 z-40 flex w-full justify-between items-start">
					<h1 className="flex items-center gap-2 text-lg p-2">
						<LuFilePen className="text-xl" />
						<span className="">Edit Application</span>
					</h1>
					<Link to={"/"} className="glass p-1 rounded-full">
						<LuX />
					</Link>
				</div>

				{jobsApplicationsController.include(id as string) && (
					<form
						className="p-2 flex flex-col gap-2 flex-wrap"
						onSubmit={(e) => {
							e.preventDefault();
							jobsApplicationsController.update(
								jobsApplicationsController.getJobApplication(id as string)
									.application_id,
								{
									application_id: jobsApplicationsController.getJobApplication(
										id as string
									).application_id,
									job_title: jobTitle,
									company_name: companyName,
									application_date: applicationDate,
									status: applicationStatus,
									placement_type: placementType,
									notes: note,
									post_link: jobPostLink,
								}
							);
							navigate("/");
						}}
					>
						<div className="glass relative rounded-full text-sm">
							<LuBriefcaseBusiness className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
							<input
								type="text"
								required
								placeholder="Job Title"
								value={jobTitle}
								onChange={(e) => {
									setJobTitle(e.target.value);
								}}
								className="w-full p-2 pl-8 outline-0"
							/>
						</div>
						<div className="flex gap-2 items-center flex-wrap">
							<div className="glass relative rounded-full text-sm w-full sm:flex-1">
								<LuBuilding className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
								<input
									type="text"
									placeholder="Company Name"
									value={companyName}
									required
									onChange={(e) => {
										setCompanyName(e.target.value);
									}}
									className="w-full p-2 pl-8 outline-0"
								/>
							</div>
							<div className="flex gap-1 items-center flex-1">
								<div className="glass relative rounded-full text-sm w-full">
									<LuCalendarPlus className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
									<input
										type="date"
										placeholder="Company Name"
										value={applicationDate}
										required
										onChange={(e) => {
											setApplicationDate(e.target.value);
										}}
										className="w-full p-2 pl-8 outline-0"
									/>
								</div>
								{applicationDate != today && (
									<div
										className="p-2 rounded-full cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900"
										onClick={() => setApplicationDate(today)}
									>
										<LuCalendarX />
									</div>
								)}
							</div>
							<div className="glass relative rounded-full text-sm flex-1 pr-2">
								<JobApplicationStatusIcon
									applicationStatus={applicationStatus}
									className={`opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base`}
								/>
								<select
									required
									value={applicationStatus}
									onChange={(e) => {
										setApplicationStatus(
											e.target.value as TJobApplicationStatus
										);
									}}
									className="w-full p-2 pl-7 outline-0 cursor-pointer"
								>
									{jobApplicationStatusOptions.map((st, i) => (
										<option key={i} value={st} className="text-gray-900">
											{st}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<div className="glass relative rounded-full text-sm pr-2">
								<JobPlacementIcon
									jobPlacementType={placementType}
									className={`opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base`}
								/>
								<select
									required
									value={placementType}
									onChange={(e) => {
										setPlacementType(e.target.value as TPlacementType);
									}}
									className="w-full p-2 pl-7 outline-0 cursor-pointer"
								>
									{jobPlacementType.map((st, i) => (
										<option key={i} value={st} className="text-gray-900">
											{st}
										</option>
									))}
								</select>
							</div>
							<div className="glass relative rounded-full text-sm flex-1">
								<LuLink
									className={`opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base`}
								/>
								<input
									type="text"
									placeholder="Job Post Link (Optional)"
									value={jobPostLink}
									onChange={(e) => {
										setJobPostLink(e.target.value as TPlacementType);
									}}
									className="w-full p-2 pl-8 outline-0"
								/>
							</div>
						</div>
						<div className="glass relative rounded-xl text-sm flex-1">
							<LuNotebookPen
								className={`opacity-70 absolute left-2 top-2.5 text-base`}
							/>
							<textarea
								placeholder="Keep track of your thoughts or next steps for this job (Optional)"
								value={note}
								onChange={(e) => {
									setNote(e.target.value as TPlacementType);
								}}
								className="w-full p-2 pl-8 outline-0 h-25 resize-none"
							/>
						</div>
						<button className="flex items-center text-xs gap-2 bg-white w-fit text-gray-900 p-2 pr-3 cursor-pointer rounded-full mt-2 self-end">
							<LuPenLine className="text-sm" /> <span>Update Application</span>
						</button>
					</form>
				)}

				{!jobsApplicationsController.include(id as string) && (
					<div className="p-20 flex flex-col items-center justify-center">
						<LuFileX className="text-4xl mb-4" />
						<p className="text-sm text-center">
							This application doesn’t seem to exist. Feel free to create a new
							one to keep things organized.
						</p>
						<Link
							to={"/job/new"}
							className="flex items-center text-xs gap-2 bg-white w-fit text-gray-900 p-2 pr-3 cursor-pointer rounded-full mt-2"
						>
							<LuPlus className="text-sm" />
							<span>New Application</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
