import type {
	TJobApplicationStatus,
	TPlacementType,
} from "../interfaces/Data.interface";

export const jobApplicationStatusColor: Record<TJobApplicationStatus, string> =
	{
		Applied: "text-blue-300",
		Hired: "text-green-300",
		Rejected: "text-red-300",
		Offer: "text-emerald-300",
		Interviewing: "text-yellow-300",
	};

export const jobApplicationStatusOptions: TJobApplicationStatus[] = [
	"Applied",
	"Interviewing",
	"Offer",
	"Hired",
	"Rejected",
];
export const jobPlacementType: TPlacementType[] = [
	"Remote",
	"On-site",
	"Hybrid",
];
