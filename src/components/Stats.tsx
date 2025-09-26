import { useContext, type ReactNode } from "react";
import type { TJobApplicationStatus } from "../interfaces/Data.interface";
import { JobApplicationStatusIcon } from "../libs/icons";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

const StatCard = ({
	stat,
}: {
	stat: {
		abb: "Total" | TJobApplicationStatus;
		title: string;
	};
}): ReactNode => {
	const { jobsApplicationsController } = useContext(Context) as IContext;
	return (
		<div className="flex glass w-[170px] p-2 items-center gap-4 rounded-xl flex-none">
			<JobApplicationStatusIcon
				applicationStatus={stat.abb}
				className="text-xl flex-none"
			/>
			<div className="">
				<p className="text-xs opacity-70">{stat.title}</p>
				<p className="text-base font-semibold">
					{jobsApplicationsController.getStat(stat.abb).length}
				</p>
				{stat.abb != "Total" && (
					<p className="text-xs">
						<span className="font-semibold text-green-300">
							{jobsApplicationsController.getStat("Total").length > 0
								? (
										(jobsApplicationsController.getStat(stat.abb).length /
											jobsApplicationsController.getStat("Total").length) *
										100
								  ).toFixed(0)
								: 0}
							%
						</span>{" "}
						of applications
					</p>
				)}
			</div>
		</div>
	);
};
export default function Stats(): ReactNode {
	const stats: {
		abb: "Total" | TJobApplicationStatus;
		title: string;
	}[] = [
		{
			abb: "Total",
			title: "Total Jobs",
		},
		{
			abb: "Applied",
			title: "Applied",
		},
		{
			abb: "Interviewing",
			title: "Interviewing",
		},
		{
			abb: "Offer",
			title: "Offer Received",
		},
		{
			abb: "Hired",
			title: "Hired",
		},
		{
			abb: "Rejected",
			title: "Rejected",
		},
	];

	return (
		<div className="flex gap-2 overflow-auto">
			{stats.map((stat, i) => (
				<StatCard stat={stat} key={i} />
			))}
		</div>
	);
}
