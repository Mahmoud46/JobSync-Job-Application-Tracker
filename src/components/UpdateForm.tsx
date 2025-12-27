import { useEffect, useState, type ReactNode } from "react";
import {
	LuBriefcaseBusiness,
	LuBuilding,
	LuMapPin,
	LuCalendarPlus,
	LuCalendarX,
	LuNotebookPen,
	LuPenLine,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import type { Jobs } from "../classes/Jobs.class";
import {
	jobApplicationStatusOptions,
	jobPlacementType,
	JOB_TYPES,
} from "../constants/constants";
import type {
	TJobApplicationStatus,
	TPlacementType,
	TJobType,
	IJobApplication,
} from "../interfaces/Data.interface";
import {
	JobApplicationStatusIcon,
	JobPlacementIcon,
	JobTypeIcon,
	URLIcon,
} from "../libs/icons";

export default function UpdateForm({
	jobApplication,
	jobsApplicationsController,
}: {
	jobApplication: IJobApplication;
	jobsApplicationsController: Jobs;
}): ReactNode {
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
	const [isShowEditBtn, setIsShowEditBtn] = useState<boolean>(false);
	const [companyLocation, setCompanyLocation] = useState<string>("");
	const [jobType, setJobType] = useState<TJobType>("Full-time");

	useEffect(() => {
		setJobTitle(jobApplication.job_title);
		setCompanyName(jobApplication.company_name);
		setApplicationDate(jobApplication.application_date);
		setApplicationStatus(jobApplication.status);
		setPlacementType(jobApplication.placement_type);
		setJobPostLink(jobApplication.post_link ?? "");
		setNote(jobApplication.notes ?? "");
		setCompanyLocation(jobApplication.company_location ?? "");
		setJobType(jobApplication.job_type ?? "Full-time");
	}, [jobApplication]);
	return (
		<form
			className="p-2 flex flex-col gap-2 flex-wrap"
			onSubmit={(e) => {
				e.preventDefault();
				jobsApplicationsController.update(jobApplication.application_id, {
					application_id: jobApplication.application_id,
					job_title: jobTitle,
					company_name: companyName,
					application_date: applicationDate,
					status: applicationStatus,
					placement_type: placementType,
					notes: note,
					post_link: jobPostLink,
					job_type: jobType,
					company_location: companyLocation,
				});
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
						setIsShowEditBtn(
							e.target.value != (jobApplication.job_title ?? "")
						);
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
							setIsShowEditBtn(
								e.target.value != (jobApplication.company_name ?? "")
							);
						}}
						className="w-full p-2 pl-8 outline-0"
					/>
				</div>
				<div className="glass relative rounded-full text-sm w-full sm:flex-1">
					<LuMapPin className="opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base" />
					<input
						type="text"
						placeholder="Company Location"
						value={companyLocation}
						required
						onChange={(e) => {
							setCompanyLocation(e.target.value);
							setIsShowEditBtn(
								e.target.value != (jobApplication.company_location ?? "")
							);
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
								setIsShowEditBtn(
									e.target.value != (jobApplication.application_date ?? "")
								);
							}}
							className="w-full p-2 pl-8 outline-0"
						/>
					</div>
					{applicationDate != today && (
						<div
							className="p-2 rounded-full cursor-pointer transition duration-300 hover:bg-white hover:text-gray-900"
							onClick={() => {
								setApplicationDate(today);
								setIsShowEditBtn(today != jobApplication.application_date);
							}}
						>
							<LuCalendarX />
						</div>
					)}
				</div>
			</div>
			<div className="flex gap-2 items-center">
				<div className="glass relative rounded-full text-sm pr-2">
					<JobApplicationStatusIcon
						applicationStatus={applicationStatus}
						className={`opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base`}
					/>
					<select
						required
						value={applicationStatus}
						onChange={(e) => {
							setApplicationStatus(e.target.value as TJobApplicationStatus);
							setIsShowEditBtn(e.target.value != jobApplication.status);
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
							setIsShowEditBtn(e.target.value != jobApplication.placement_type);
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
				<div className="glass relative rounded-full text-sm pr-2">
					<JobTypeIcon
						jobType={jobType}
						className={`opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base`}
					/>
					<select
						required
						value={jobType}
						onChange={(e) => {
							setJobType(e.target.value as TJobType);
							setIsShowEditBtn(
								e.target.value != (jobApplication.job_type ?? "")
							);
						}}
						className="w-full p-2 pl-7 outline-0 cursor-pointer"
					>
						{JOB_TYPES.map((st, i) => (
							<option key={i} value={st} className="text-gray-900">
								{st}
							</option>
						))}
					</select>
				</div>
				<div className="glass relative rounded-full text-sm flex-1">
					<URLIcon
						url={jobPostLink}
						className={`opacity-70 absolute left-2 top-1/2 -translate-y-1/2 text-base`}
					/>
					<input
						type="text"
						placeholder="Job Post Link (Optional)"
						value={jobPostLink}
						onChange={(e) => {
							setJobPostLink(e.target.value as TPlacementType);
							setIsShowEditBtn(
								e.target.value != (jobApplication.post_link ?? "")
							);
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
						setIsShowEditBtn(e.target.value != (jobApplication.notes ?? ""));
					}}
					className="w-full p-2 pl-8 outline-0 h-25 resize-none"
				/>
			</div>

			{isShowEditBtn && (
				<button className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[22rem] flex-row-reverse cursor-pointer self-end">
					<div className="glass p-0.5 rounded-full">
						<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
							<LuPenLine className="text-lg flex-none" />
						</div>
					</div>
					<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100 w-max flex-none">
						Update Application
					</span>
				</button>
			)}
		</form>
	);
}
