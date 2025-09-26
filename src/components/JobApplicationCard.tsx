import type { IJobApplication } from "../interfaces/Data.interface";
import { Link } from "react-router-dom";
import {
	LuArrowRight,
	LuCalendarPlus,
	LuFilePen,
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
		<div className="glass p-2 rounded-xl flex flex-col">
			<div className="flex justify-between items-center">
				<p
					className={`flex gap-1 items-center text-xs sm:text-sm ${
						jobApplicationStatusColor[job.status]
					}`}
				>
					<JobApplicationStatusIcon applicationStatus={job.status} />
					<span>{job.status}</span>
				</p>
				<div className="flex gap-1">
					<div
						className="p-1 glass rounded-full cursor-pointer text-sm sm:text-base"
						onClick={() =>
							jobsApplicationsController.delete(job.application_id)
						}
					>
						<LuTrash />
					</div>
					<Link
						to={`job/edit/${job.application_id}`}
						className="p-1 glass rounded-full text-sm sm:text-base"
					>
						<LuFilePen />
					</Link>
					<Link
						to={`job/${job.application_id}`}
						className="p-1 glass rounded-full text-sm sm:text-base"
					>
						<LuArrowRight className="-rotate-45" />
					</Link>
				</div>
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
	);
}
