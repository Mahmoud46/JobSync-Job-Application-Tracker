import { useContext, type ReactNode } from "react";
import type { IJobApplication } from "../interfaces/Data.interface";
import { LuArrowRight, LuFilePen, LuTrash } from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { Link } from "react-router-dom";
import { jobApplicationStatusColor } from "../constants/constants";
import { URLIcon } from "../libs/icons";

export function JobApplicationsTable({
	jobsApplications,
}: {
	jobsApplications: IJobApplication[];
}): ReactNode {
	const { jobsApplicationsController } = useContext(Context) as IContext;

	return (
		<>
			{jobsApplications.length > 0 && (
				<div className="flex-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<table className="min-w-max w-full">
						<thead className="glass sticky top-0 z-20">
							<tr>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Job title
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Company name
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Location
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Status
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Application date
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Placement type
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium">
									Job type
								</th>
								<th className="px-4 py-2 text-left text-xs opacity-70 font-medium"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-600">
							{jobsApplications.map((job, i) => (
								<tr key={i}>
									<td className="px-4 py-2 text-sm text-white max-w-[200px] font-semibold">
										{job.job_title}
									</td>
									<td className="px-4 py-2 text-sm text-white">
										{job.company_name}
									</td>
									<td className="px-4 py-2 text-sm text-white">
										{job.company_location}
									</td>
									<td
										className={`px-4 py-2 text-sm ${
											jobApplicationStatusColor[job.status]
										}`}
									>
										{job.status}
									</td>
									<td className="px-4 py-2 text-sm">
										{new Date(job.application_date).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "short",
												day: "numeric",
											}
										) ?? "_"}
									</td>
									<td className="px-4 py-2 text-sm text-white">
										{job.placement_type}
									</td>
									<td className="px-4 py-2 text-sm text-white">
										{job.job_type}
									</td>

									<td className="px-4 py-2 text-sm text-white transition duration-300 hover:underline">
										<div className="flex glass w-fit rounded-full p-0.5">
											{job.post_link && job.post_link.trim() != "" && (
												<a
													href={job.post_link}
													className="cursor-pointer p-2 w-fit rounded-full transition duration-300 hover:bg-white hover:text-gray-900"
												>
													<URLIcon url={job.post_link} className="text-base" />
												</a>
											)}
											<Link
												to={`job/edit/${job.application_id}`}
												className="cursor-pointer p-2 w-fit rounded-full transition duration-300 hover:bg-white hover:text-gray-900"
											>
												<LuFilePen className="text-base" />
											</Link>
											<div
												className="cursor-pointer p-2 w-fit rounded-full transition duration-300 hover:bg-white hover:text-gray-900"
												onClick={() =>
													jobsApplicationsController.delete(job.application_id)
												}
											>
												<LuTrash className="text-base" />
											</div>
											<Link
												to={`job/${job.application_id}`}
												className="cursor-pointer p-2 w-fit rounded-full transition duration-300 hover:bg-white hover:text-gray-900 hover:-rotate-45"
											>
												<LuArrowRight className="text-base" />
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
