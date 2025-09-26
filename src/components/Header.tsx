import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
	LuFileJson2,
	LuFileOutput,
	LuFilePlus2,
	LuFileSpreadsheet,
	LuFileStack,
	LuPlus,
	LuUpload,
	LuX,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function Header(): ReactNode {
	const { jobsApplicationsController, importDataAsJSON } = useContext(
		Context
	) as IContext;

	const [isAddOptionsWindowOpen, setIsAddOptionsWindowOpen] =
		useState<boolean>(false);
	const [isExportOptionsWindowOpen, setIsExportOptionsWindowOpen] =
		useState<boolean>(false);

	const addOptionsWindowRef = useRef<HTMLDivElement>(null);
	const exportOptionsWindowRef = useRef<HTMLDivElement>(null);
	const jsonFileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				addOptionsWindowRef.current &&
				!addOptionsWindowRef.current.contains(event.target as Node)
			) {
				setIsAddOptionsWindowOpen(false); // close container
			}
			if (
				exportOptionsWindowRef.current &&
				!exportOptionsWindowRef.current.contains(event.target as Node)
			) {
				setIsExportOptionsWindowOpen(false); // close container
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="sticky top-0 p-2 z-50 sm:px-8 sm:py-4">
			<div className="glass rounded-full flex justify-between items-center p-1">
				<Link
					to={"/"}
					className="flex gap-2 p-2 cursor-pointer pl-4 items-center"
				>
					<LuFileStack className="text-xl" />
					<p className="text-lg">JobSync</p>
				</Link>

				<div className="flex gap-2 items-center">
					<div
						className={`${
							isAddOptionsWindowOpen
								? "bg-white text-gray-900"
								: "glass-head-btn"
						} p-3 rounded-full cursor-pointer`}
						onClick={() => setIsAddOptionsWindowOpen((prev) => !prev)}
					>
						<LuPlus className="text-lg" />
					</div>
					<div
						className={`${
							isExportOptionsWindowOpen
								? "bg-white text-gray-900"
								: "glass-head-btn"
						} p-3 rounded-full cursor-pointer ${
							jobsApplicationsController.jobs.length == 0
								? "opacity-70 pointer-events-none"
								: ""
						}`}
						onClick={() => setIsExportOptionsWindowOpen((prev) => !prev)}
					>
						<LuFileOutput className="text-lg" />
					</div>
					<ThemeButton />
				</div>
			</div>

			{isAddOptionsWindowOpen && (
				<div
					className="absolute glass right-5 top-17 z-50 p-0.5 rounded-2xl w-[200px] flex flex-col gap-2"
					ref={addOptionsWindowRef}
				>
					<div className="flex items-center justify-between text-sm">
						<p className="px-2">Insert data</p>
						<div
							className="glass rounded-full -translate-x-0.5 translate-y-0.5  p-1 cursor-pointer"
							onClick={() => setIsAddOptionsWindowOpen(false)}
						>
							<LuX />
						</div>
					</div>
					<ul>
						<Link
							to={"job/new"}
							className="flex items-center gap-2 text-sm py-2 px-2 transition duration-300 hover:bg-white hover:text-gray-900 cursor-pointer rounded-xl"
						>
							<LuFilePlus2 className="text-base" />
							<p>New Application</p>
						</Link>
						<li
							className="flex items-center gap-2 text-sm py-2 px-2 transition duration-300 hover:bg-white hover:text-gray-900 cursor-pointer rounded-xl"
							onClick={() => jsonFileInputRef.current?.click()}
						>
							<LuUpload className="text-base" />
							<p>Import JSON</p>
						</li>
					</ul>
				</div>
			)}
			{isExportOptionsWindowOpen && (
				<div
					className="absolute glass right-5 top-17 z-50 p-0.5 rounded-2xl w-[200px] flex flex-col gap-2"
					ref={exportOptionsWindowRef}
				>
					<div className="flex items-center justify-between text-sm">
						<p className="px-2">Export data</p>
						<div
							className="glass rounded-full -translate-x-0.5 translate-y-0.5  p-1 cursor-pointer"
							onClick={() => setIsExportOptionsWindowOpen(false)}
						>
							<LuX />
						</div>
					</div>
					<ul>
						<li
							className="flex items-center gap-2 text-sm py-2 px-2 transition duration-300 hover:bg-white hover:text-gray-900 cursor-pointer rounded-xl pr-4"
							onClick={() => jobsApplicationsController.exportDataAsJSON()}
						>
							<LuFileJson2 className="text-base" />
							<p>Export JSON</p>
						</li>
						<li
							className="flex items-center gap-2 text-sm py-2 px-2 transition duration-300 hover:bg-white hover:text-gray-900 cursor-pointer rounded-xl pr-4"
							onClick={() => jobsApplicationsController.exportDataAsCSV()}
						>
							<LuFileSpreadsheet className="text-base" />
							<p>Export CSV</p>
						</li>
					</ul>
				</div>
			)}

			<input
				type="file"
				accept="application/json"
				ref={jsonFileInputRef}
				className="hidden"
				onChange={importDataAsJSON}
			/>
		</div>
	);
}
