export interface IJobApplication {
	application_id: string;
	job_title: string;
	company_name: string;
	application_date: string;
	status: TJobApplicationStatus;
	placement_type: TPlacementType;
	notes: string;
	post_link: string;
	job_type?: TJobType;
	company_location?: string;
}

export type TJobApplicationStatus =
	| "Applied"
	| "Interviewing"
	| "Offer"
	| "Rejected"
	| "Hired";

export type TPlacementType = "Remote" | "On-site" | "Hybrid";
export type TJobType = "Internship" | "Part-time" | "Full-time" | "Contract";
