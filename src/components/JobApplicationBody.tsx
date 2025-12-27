import {
	LuBriefcaseBusiness,
	LuX,
	LuCalendarPlus,
	LuMapPin,
	LuFilePen,
	LuTrash,
	LuNotebook,
	LuBookX,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import type { Jobs } from "../classes/Jobs.class";
import { jobApplicationStatusColor } from "../constants/constants";
import type { IJobApplication, TJobType } from "../interfaces/Data.interface";
import {
	JobApplicationStatusIcon,
	JobPlacementIcon,
	JobTypeIcon,
	URLIcon,
} from "../libs/icons";
import { shortDateParser, urlParser } from "../libs/utils";

export function JobApplicationBody({
	jobApplication,
	jobsApplicationsController,
}: {
	jobsApplicationsController: Jobs;
	jobApplication: IJobApplication;
}) {
	const navigate = useNavigate();
	return (
		<div className="glass w-ful p-4 pt-2 rounded-2xl flex flex-col gap-2 w-[95%] md:w-[50%] max-h-[80dvh] overflow-auto">
			<div className="sticky top-0 z-40 flex w-full justify-between items-center">
				<p className="flex items-center gap-2 text-sm">
					<LuBriefcaseBusiness className="text-base" />
					<span className="">{jobApplication.job_title}</span>
				</p>
				<Link to={"/"} className="glass p-1 rounded-full translate-x-2">
					<LuX />
				</Link>
			</div>

			<div className="flex justify-between flex-wrap">
				<div className="flex gap-4 items-center">
					<p
						className={`flex items-center gap-2 text-sm ${
							jobApplicationStatusColor[jobApplication.status]
						}`}
					>
						<JobApplicationStatusIcon
							applicationStatus={jobApplication.status}
						/>
						<span>{jobApplication.status}</span>
					</p>
					<p className="flex text-sm items-center gap-2">
						<LuCalendarPlus />
						<span>{shortDateParser(jobApplication.application_date)}</span>
					</p>
				</div>

				<div className="flex items-start gap-2 w-full">
					<div className="flex-none flex glass p-3 rounded-full mt-2">
						<LuBriefcaseBusiness className="text-5xl" />
					</div>
					<div className="flex flex-wrap items-start flex-1">
						<div className="flex flex-col flex-1">
							<h1 className="text-3xl pr-4">{jobApplication.job_title}</h1>
							<p className="flex items-center gap-2 text-lg">
								{jobApplication.company_name}
							</p>
							<p className="flex items-center gap-2 text-sm">
								<LuMapPin className="text-base" />
								<span>{jobApplication.company_location}</span>
							</p>
						</div>
						<div className="pr-4">
							<div className="flex items-center gap-4 mt-2">
								<p className="flex items-center gap-2 text-sm">
									<JobPlacementIcon
										jobPlacementType={jobApplication.placement_type}
									/>
									<span>{jobApplication.placement_type}</span>
								</p>
								<p className="flex items-center gap-2 text-sm">
									<JobTypeIcon jobType={jobApplication.job_type as TJobType} />
									<span>{jobApplication.job_type}</span>
								</p>
							</div>

							{jobApplication.post_link && jobApplication.post_link != "" && (
								<p className="flex gap-2 items-center text-sm">
									<URLIcon url={jobApplication.post_link as string} />
									<a
										href={jobApplication.post_link}
										target="_blank"
										className="transition duration-300 hover:underline"
									>
										{urlParser(jobApplication.post_link)}
									</a>
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-1 justify-end">
				<Link
					to={`/job/edit/${jobApplication.application_id}`}
					className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[5rem]"
				>
					<div className="glass p-0.5 rounded-full">
						<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
							<LuFilePen className="text-base flex-none" />
						</div>
					</div>
					<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100">
						Edit
					</span>
				</Link>
				<div
					onClick={() => {
						jobsApplicationsController.delete(jobApplication.application_id);
						navigate("/");
					}}
					className="flex items-center text-sm max-w-[2.25rem] overflow-hidden transition-all duration-300 group hover:max-w-[8rem] cursor-pointer"
				>
					<div className="glass p-0.5 rounded-full">
						<div className="p-1.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
							<LuTrash className="text-base flex-none" />
						</div>
					</div>
					<span className="glass p-1 px-2 rounded-full opacity-0 transition duration-400 group-hover:opacity-100">
						Delete
					</span>
				</div>
			</div>

			{jobApplication.notes != "" && (
				<div className="glass overflow-auto rounded-xl p-2 mt-1">
					<p className="flex gap-2 items-center text-sm opacity-70">
						<LuNotebook className="text-base" />
						<span>Notes</span>
					</p>
					<p
						className="pl-6 wrap-break-word whitespace-pre-wrap"
						dangerouslySetInnerHTML={{ __html: jobApplication.notes }}
					></p>
				</div>
			)}

			{jobApplication.notes == "" && (
				<div className="flex flex-col px-20 py-10 items-center justify-center gap-4">
					<LuBookX className="text-4xl" />
					<p className="text-sm text-center">
						No notes have been inserted to this application yet.
					</p>
				</div>
			)}
		</div>
	);
}
