import type { IJobApplication, TJobType } from "../interfaces/Data.interface";
import { Link } from "react-router-dom";
import {
	LuArrowRight,
	LuBriefcaseBusiness,
	LuCalendarPlus,
	LuFilePen,
	LuMapPin,
	LuTrash,
} from "react-icons/lu";
import { useContext, type ReactNode } from "react";
import { jobApplicationStatusColor } from "../constants/constants";
import {
	JobApplicationStatusIcon,
	JobPlacementIcon,
	JobTypeIcon,
	URLIcon,
} from "../libs/icons";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { shortDateParser } from "../libs/utils";

export default function JobApplicationCard({
	job,
}: {
	job: IJobApplication;
}): ReactNode {
	const { jobsApplicationsController } = useContext(Context) as IContext;
	return (
		<div className="glass p-1 rounded-xl rounded-br-3xl flex items-start flex-col">
			<div className="p-2 pr-2 flex-1">
				<div className="flex items-center gap-4">
					<p
						className={`flex text-sm items-center gap-2 ${
							jobApplicationStatusColor[job.status]
						}`}
					>
						<JobApplicationStatusIcon applicationStatus={job.status} />
						<span>{job.status}</span>
					</p>
					<p className="flex text-sm items-center gap-2">
						<LuCalendarPlus />
						<span>{shortDateParser(job.application_date)}</span>
					</p>
				</div>
				<div className="flex items-start gap-2">
					<div className="flex-none flex glass p-3 rounded-full mt-2">
						<LuBriefcaseBusiness className="text-3xl" />
					</div>
					<div className="flex flex-col">
						<h1 className="text-lg line-clamp-1 font-semibold">
							{job.job_title}
						</h1>
						<div className="flex gap-4">
							<p className="flex text-sm items-center gap-2 font-semibold">
								{job.company_name}
							</p>
						</div>
						<div className="flex gap-2 items-center">
							<LuMapPin className="text-sm" />
							<p className="flex text-sm items-center gap-2">
								{job.company_location}
							</p>
						</div>
						<div className="flex gap-4">
							<p className="flex text-sm items-center gap-2">
								<JobPlacementIcon jobPlacementType={job.placement_type} />{" "}
								<span>{job.placement_type}</span>
							</p>
							<p className="flex text-sm items-center gap-2">
								<JobTypeIcon jobType={job.job_type as TJobType} />{" "}
								<span>{job.job_type}</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex glass p-0.5 rounded-full self-end flex-row-reverse">
				<Link
					to={`job/${job.application_id}`}
					className="p-2 rounded-full cursor-pointer text-base w-fit transition duration-300 hover:bg-white hover:text-gray-900 hover:-rotate-45"
				>
					<LuArrowRight />
				</Link>
				{job.post_link && job.post_link != "" && (
					<a
						href={job.post_link}
						target="_blank"
						className="p-2 rounded-full cursor-pointer text-base w-fit transition duration-300 hover:bg-white hover:text-gray-900"
					>
						<URLIcon url={job.post_link} />
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
			</div>
		</div>
	);
}
