import type { ReactNode } from "react";
import type {
	TJobApplicationStatus,
	TPlacementType,
} from "../interfaces/Data.interface";
import {
	LuBriefcaseBusiness,
	LuBuilding2,
	LuCircleX,
	LuFileCheck,
	LuLaptop,
	LuSend,
	LuShuffle,
	LuTrophy,
	LuUsers,
} from "react-icons/lu";

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
