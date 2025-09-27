import type { IJobApplication } from "../interfaces/Data.interface";
import { Link } from "react-router-dom";
import {
	LuArrowRight,
	LuCalendarPlus,
	LuFilePen,
	LuLink,
	LuTrash,
} from "react-icons/lu";
import { useContext, type ReactNode } from "react";
import { jobApplicationStatusColor } from "../constants/constants";
import { JobApplicationStatusIcon, JobPlacementIcon } from "../libs/icons";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function JobApplicationCard({
	job,
}: {
	job: IJobApplication;
}): ReactNode {
	const { jobsApplicationsController } = useContext(Context) as IContext;
	return (
		<div className="glass p-1 rounded-3xl rounded-l-xl flex items-start">
			<div className="p-3 pr-2 flex-1">
				<div className="flex justify-between items-center">
					<p
						className={`flex gap-1 items-center text-xs sm:text-sm ${
							jobApplicationStatusColor[job.status]
						}`}
					>
						<JobApplicationStatusIcon applicationStatus={job.status} />
						<span>{job.status}</span>
					</p>
				</div>
				<h1 className="text-lg line-clamp-1 font-semibold">{job.job_title}</h1>
				<div className="flex gap-4">
					<p className="flex text-sm items-center gap-2 font-semibold">
						{job.company_name}
					</p>
				</div>
				<div className="flex gap-4 mt-2">
					<p className="flex text-sm items-center gap-2">
						<LuCalendarPlus />
						<span>
							{new Date(job.application_date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</span>
					</p>
					<p className="flex text-sm items-center gap-2">
						<JobPlacementIcon jobPlacementType={job.placement_type} />{" "}
						<span>{job.placement_type}</span>
					</p>
				</div>
			</div>
			<div className="flex glass p-0.5 rounded-full flex-col">
				{job.post_link && job.post_link != "" && (
					<a
						href={job.post_link}
						className="p-2 rounded-full cursor-pointer text-base w-fit transition duration-300 hover:bg-white hover:text-gray-900"
					>
						<LuLink />
					</a>
				)}
				<Link
					to={`job/edit/${job.application_id}`}
					className="p-2 rounded-full cursor-pointer text-base w-fit transition duration-300 hover:bg-white hover:text-gray-900"
				>
					<LuFilePen />
				</Link>
				<div
					className="p-2 rounded-full cursor-pointer text-base w-fit transition duration-300 hover:bg-white hover:text-gray-900"
					onClick={() => jobsApplicationsController.delete(job.application_id)}
				>
					<LuTrash />
				</div>
				<Link
					to={`job/${job.application_id}`}
					className="p-2 rounded-full cursor-pointer text-base w-fit transition duration-300 hover:bg-white hover:text-gray-900 hover:-rotate-45"
				>
					<LuArrowRight />
				</Link>
			</div>
		</div>
	);
}
