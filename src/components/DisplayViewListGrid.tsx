import type { ReactNode } from "react";
import { LuGrid3X3, LuList } from "react-icons/lu";

export function DisplayViewListGrid({
	isGrid,
	setIsGrid,
}: {
	isGrid: boolean;
	setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode {
	return (
		<div className="flex glass p-0.5 rounded-full">
			<button
				className={`flex justify-start items-center transition duration-300 ${
					!isGrid
						? "bg-white text-gray-950 hover:text-gray-950"
						: "text-white opacity-70 hover:opacity-100"
				}  overflow-hidden p-2 rounded-full w-full cursor-pointer`}
				onClick={() => setIsGrid(false)}
			>
				<LuList className="text-base flex-none" />
			</button>
			<button
				className={`flex justify-start items-center transition duration-300 ${
					isGrid
						? "bg-white text-gray-950 hover:text-gray-950"
						: "text-white opacity-70 hover:opacity-100"
				}  overflow-hidden p-2 rounded-full w-full cursor-pointer`}
				onClick={() => setIsGrid(true)}
			>
				<LuGrid3X3 className="text-base flex-none" />
			</button>
		</div>
	);
}
