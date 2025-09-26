import type {
	IJobApplication,
	TJobApplicationStatus,
} from "../interfaces/Data.interface";

interface IJobApplicationWithIndex extends IJobApplication {
	index: number;
}

export class Jobs {
	jobs: IJobApplication[];
	protected indexedJobApplications: Record<string, IJobApplicationWithIndex>;
	protected stats: Record<"Total" | TJobApplicationStatus, IJobApplication[]>;

	protected setJobApplications: React.Dispatch<
		React.SetStateAction<IJobApplication[]>
	>;

	constructor() {
		this.jobs = [];
		this.indexedJobApplications = {};
		this.setJobApplications = () => {};
		this.stats = {
			Applied: [],
			Hired: [],
			Interviewing: [],
			Offer: [],
			Rejected: [],
			Total: [],
		};
	}

	init(
		setJobApplications: React.Dispatch<React.SetStateAction<IJobApplication[]>>
	) {
		this.jobs =
			JSON.parse(localStorage.getItem("job_applications") as string) ?? [];
		this.indexedJobApplications = this.getIndexedJobApplications();
		this.stats = this.getStats();

		this.setJobApplications = setJobApplications;
		this.setJobApplications(this.jobs);
	}

	protected getIndexedJobApplications(): Record<
		string,
		IJobApplicationWithIndex
	> {
		const indexedJobApplications: Record<string, IJobApplicationWithIndex> = {};
		for (let i = 0; i < this.jobs.length; i++)
			indexedJobApplications[this.jobs[i].application_id] = {
				...this.jobs[i],
				index: i,
			};

		return indexedJobApplications;
	}

	protected getStats(): Record<
		"Total" | TJobApplicationStatus,
		IJobApplication[]
	> {
		const stats: Record<"Total" | TJobApplicationStatus, IJobApplication[]> = {
			Applied: [],
			Hired: [],
			Interviewing: [],
			Offer: [],
			Rejected: [],
			Total: [],
		};

		for (const job of this.jobs) {
			stats["Total"].push(job);

			if (job.status == "Applied") stats["Applied"].push(job);
			else if (job.status == "Hired") stats["Hired"].push(job);
			else if (job.status == "Interviewing") stats["Interviewing"].push(job);
			else if (job.status == "Offer") stats["Offer"].push(job);
			else if (job.status == "Rejected") stats["Rejected"].push(job);
		}

		return stats;
	}

	getStat(statAbb: "Total" | TJobApplicationStatus) {
		return this.stats[statAbb];
	}

	getJobApplication(jobApplicationId: string) {
		return this.indexedJobApplications[jobApplicationId];
	}

	include(jobApplicationId: string): boolean {
		return jobApplicationId in this.indexedJobApplications;
	}

	creat(jobApplication: IJobApplication): void {
		const jobApplications: IJobApplication[] = [jobApplication, ...this.jobs];
		this.updateJobApplicationData(jobApplications);
	}

	update(jobApplicationId: string, jobApplication: IJobApplication): void {
		const jobApplications: IJobApplication[] = [...this.jobs];
		jobApplications[this.indexedJobApplications[jobApplicationId].index] =
			jobApplication;

		this.updateJobApplicationData(jobApplications);
	}

	delete(jobApplicationId: string): void {
		const jobApplications: IJobApplication[] = [
			...this.jobs.filter(
				(jobApplication) => jobApplication.application_id != jobApplicationId
			),
		];
		this.updateJobApplicationData(jobApplications);
	}

	protected updateJobApplicationData(jobApplications: IJobApplication[]) {
		this.jobs = jobApplications;
		this.indexedJobApplications = this.getIndexedJobApplications();
		this.stats = this.getStats();

		localStorage.setItem("job_applications", JSON.stringify(jobApplications));

		this.setJobApplications(jobApplications);
	}

	exportDataAsJSON(): void {
		const jsonObject = { jobs: this.jobs };

		const jsonString = JSON.stringify(jsonObject);

		const blob = new Blob([jsonString], { type: "application/json" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = "job_applications.json";
		link.click();

		URL.revokeObjectURL(url);
	}

	exportDataAsCSV(): void {
		const headers: (keyof IJobApplication)[] = Object.keys(
			this.jobs[0]
		) as (keyof IJobApplication)[];

		const csvRows = [
			headers.join(","),
			...this.jobs.map((row) =>
				headers
					.map((col) => JSON.stringify((row as IJobApplication)[col] ?? ""))
					.join(",")
			),
		];

		const csvContent = csvRows.join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = "job_applications.csv";
		link.click();

		URL.revokeObjectURL(url);
	}

	importDataAsJSON(jobApplications: IJobApplication[]): void {
		this.updateJobApplicationData(jobApplications);
	}
}

export const jobsApplicationsController = new Jobs();
