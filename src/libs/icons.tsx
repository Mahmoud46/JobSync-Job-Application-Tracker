import type { ReactNode } from "react";
import type {
	TJobApplicationStatus,
	TJobType,
	TPlacementType,
} from "../interfaces/Data.interface";
import {
	LuBriefcase,
	LuBriefcaseBusiness,
	LuBuilding2,
	LuCircleX,
	LuClock,
	LuFileCheck,
	LuGraduationCap,
	LuHandshake,
	LuLaptop,
	LuLink,
	LuSend,
	LuShuffle,
	LuTrophy,
	LuUsers,
} from "react-icons/lu";
import { SiLinkedin } from "react-icons/si";

export const JobApplicationStatusIcon = ({
	applicationStatus,
	className = "",
}: {
	applicationStatus: "Total" | TJobApplicationStatus;
	className?: string;
}): ReactNode => {
	switch (applicationStatus) {
		case "Total":
			return <LuBriefcaseBusiness className={className} />;
		case "Applied":
			return <LuSend className={className} />;

		case "Interviewing":
			return <LuUsers className={className} />;
		case "Offer":
			return <LuFileCheck className={className} />;
		case "Rejected":
			return <LuCircleX className={className} />;
		case "Hired":
			return <LuTrophy className={className} />;
	}
};

export const JobPlacementIcon = ({
	jobPlacementType,
	className = "",
}: {
	jobPlacementType: "Total" | TPlacementType;
	className?: string;
}): ReactNode => {
	switch (jobPlacementType) {
		case "Total":
			return <LuBriefcaseBusiness className={className} />;
		case "On-site":
			return <LuBuilding2 className={className} />;
		case "Remote":
			return <LuLaptop className={className} />;

		case "Hybrid":
			return <LuShuffle className={className} />;
	}
};

export const JobTypeIcon = ({
	jobType,
	className = "",
}: {
	jobType: TJobType;
	className?: string;
}): ReactNode => {
	switch (jobType) {
		case "Full-time":
			return <LuBriefcase className={className} />;
		case "Part-time":
			return <LuClock className={className} />;
		case "Internship":
			return <LuGraduationCap className={className} />;
		case "Contract":
			return <LuHandshake className={className} />;
	}
};

export const URLIcon = ({
	url,
	className = "",
}: {
	url: string;
	className?: string;
}): ReactNode => {
	if (url.includes("linkedin")) return <SiLinkedin className={className} />;
	else return <LuLink className={className} />;
};
