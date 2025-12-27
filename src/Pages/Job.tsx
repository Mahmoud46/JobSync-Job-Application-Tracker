import { useContext, type ReactNode } from "react";
import { LuFileX, LuPlus, LuX } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { JobApplicationBody } from "../components/JobApplicationBody";

export default function Job(): ReactNode {
	const { jobsApplicationsController } = useContext(Context) as IContext;
	const { id } = useParams();

	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			{jobsApplicationsController.include(id as string) && (
				<JobApplicationBody
					jobApplication={jobsApplicationsController.getJobApplication(
						id as string
					)}
					jobsApplicationsController={jobsApplicationsController}
				/>
			)}
			{!jobsApplicationsController.include(id as string) && (
				<div className="p-20 flex flex-col items-center justify-center glass rounded-2xl">
					<div className="sticky top-0 z-40 flex w-full justify-between items-start">
						<Link to={"/"} className="glass p-1 rounded-full">
							<LuX />
						</Link>
					</div>
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
	);
}
