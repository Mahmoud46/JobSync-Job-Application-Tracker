import { useContext } from "react";
import { LuFilePen, LuFileX, LuPlus, LuX } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import UpdateForm from "../components/UpdateForm";

export default function EditJob() {
	const { id } = useParams();
	const { jobsApplicationsController } = useContext(Context) as IContext;

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
					<UpdateForm
						jobApplication={jobsApplicationsController.getJobApplication(
							id as string
						)}
						jobsApplicationsController={jobsApplicationsController}
					/>
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
