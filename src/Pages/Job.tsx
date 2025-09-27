import { useContext, type ReactNode } from "react";
import {
	LuBookX,
	LuBriefcaseBusiness,
	LuCalendarPlus,
	LuFilePen,
	LuFileX,
	LuLink,
	LuNotebook,
	LuPlus,
	LuTrash,
	LuX,
} from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { jobApplicationStatusColor } from "../constants/constants";
import { JobApplicationStatusIcon, JobPlacementIcon } from "../libs/icons";

export default function Job(): ReactNode {
	const { jobsApplicationsController } = useContext(Context) as IContext;
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<div className="fixed z-30 top-0 h-full w-full flex items-center justify-center -left-0">
			{jobsApplicationsController.include(id as string) && (
				<div className="glass w-ful p-4 pt-2 rounded-2xl overflow-auto flex flex-col gap-2 sm:w-[50%] ">
					<div className="sticky top-0 z-40 flex w-full justify-between items-center">
						<p className="flex items-center gap-2 text-sm">
							<LuBriefcaseBusiness className="text-base" />
							<span className="">
								{
									jobsApplicationsController.getJobApplication(id as string)
										.job_title
								}
							</span>
						</p>
						<Link to={"/"} className="glass p-1 rounded-full translate-x-2">
							<LuX />
						</Link>
					</div>

					<div className="flex justify-between flex-wrap">
						<div className="">
							<p
								className={`flex items-center gap-2 text-sm ${
									jobApplicationStatusColor[
										jobsApplicationsController.getJobApplication(id as string)
											.status
									]
								}`}
							>
								<JobApplicationStatusIcon
									applicationStatus={
										jobsApplicationsController.getJobApplication(id as string)
											.status
									}
								/>
								<span>
									{
										jobsApplicationsController.getJobApplication(id as string)
											.status
									}
								</span>
							</p>
							<h1 className="text-3xl">
								{
									jobsApplicationsController.getJobApplication(id as string)
										.job_title
								}
							</h1>
							<p className="flex items-center gap-2 text-lg">
								{
									jobsApplicationsController.getJobApplication(id as string)
										.company_name
								}
							</p>
						</div>

						<div className="pr-4">
							<div className="flex items-center gap-4 mt-2">
								<p className="flex text-sm items-center gap-2">
									<LuCalendarPlus />
									<span>
										{new Date(
											jobsApplicationsController.getJobApplication(
												id as string
											).application_date
										).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</span>
								</p>
								<p className="flex items-center gap-2 text-sm">
									<JobPlacementIcon
										jobPlacementType={
											jobsApplicationsController.getJobApplication(id as string)
												.placement_type
										}
									/>
									<span>
										{
											jobsApplicationsController.getJobApplication(id as string)
												.placement_type
										}
									</span>
								</p>
							</div>

							{jobsApplicationsController.getJobApplication(id as string)
								.post_link &&
								jobsApplicationsController.getJobApplication(id as string)
									.post_link != "" && (
									<p className="flex gap-2 items-center text-sm">
										<LuLink />
										<a
											href={
												jobsApplicationsController.getJobApplication(
													id as string
												).post_link
											}
											className="transition duration-300 hover:underline"
										>
											{
												jobsApplicationsController.getJobApplication(
													id as string
												).post_link
											}
										</a>
									</p>
								)}
						</div>
					</div>

					<div className="flex items-center gap-1">
						<Link
							to={`/job/edit/${
								jobsApplicationsController.getJobApplication(id as string)
									.application_id
							}`}
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
								jobsApplicationsController.delete(
									jobsApplicationsController.getJobApplication(id as string)
										.application_id
								);
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

					{jobsApplicationsController.getJobApplication(id as string).notes !=
						"" && (
						<div className="glass overflow-auto rounded-xl p-2 mt-1">
							<p className="flex gap-2 items-center text-sm opacity-70">
								<LuNotebook className="text-base" />
								<span>Notes</span>
							</p>
							<p className="pl-6">
								{
									jobsApplicationsController.getJobApplication(id as string)
										.notes
								}
							</p>
						</div>
					)}

					{jobsApplicationsController.getJobApplication(id as string).notes ==
						"" && (
						<div className="flex flex-col px-20 py-10 items-center justify-center gap-4">
							<LuBookX className="text-4xl" />
							<p className="text-sm text-center">
								No notes have been inserted to this application yet.
							</p>
						</div>
					)}
				</div>
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
	);
}
