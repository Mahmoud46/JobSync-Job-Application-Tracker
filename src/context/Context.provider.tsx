import { useEffect, useState, type ReactNode } from "react";
import { Context } from "./Context";
import type { IContext } from "../interfaces/Context.interface";
import { jobsApplicationsController } from "../classes/Jobs.class";
import type { IJobApplication } from "../interfaces/Data.interface";

export default function ContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);

	const importDataAsJSON = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const input: HTMLInputElement = e.target;
		const file = input.files?.[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const content = e.target?.result as string;
				const parsed = JSON.parse(content) as { jobs: IJobApplication[] };
				jobsApplicationsController.importDataAsJSON(parsed.jobs);
				input.value = "";
			} catch (error) {
				if (error instanceof Error) {
					input.value = "";
				}
			}
		};
		reader.readAsText(file);
	};

	useEffect(() => {
		setJobApplications([]);
		jobsApplicationsController.init(setJobApplications);
	}, []);

	const contextValue: IContext = {
		jobsApplicationsController,
		jobApplications,
		importDataAsJSON,
	};
	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
