import type { Jobs } from "../classes/Jobs.class";
import type { IJobApplication } from "./Data.interface";

export interface IContext {
	jobsApplicationsController: Jobs;
	jobApplications: IJobApplication[];
	importDataAsJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
