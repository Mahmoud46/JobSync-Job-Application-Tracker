import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
	LuFileJson2,
	LuFileOutput,
	LuFilePlus2,
	LuFileSpreadsheet,
	LuPlus,
	LuUpload,
	LuX,
} from "react-icons/lu";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import logo from "../assets/jobsync.svg";
import type { Jobs } from "../classes/Jobs.class";

const AddOptionsWindow = ({
	navigate,
	isAddOptionsWindowOpen,
	setIsAddOptionsWindowOpen,
	addOptionsWindowRef,
	jsonFileInputRef,
}: {
	navigate: NavigateFunction;
	isAddOptionsWindowOpen: boolean;
	setIsAddOptionsWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
	addOptionsWindowRef: React.RefObject<HTMLDivElement | null>;
	jsonFileInputRef: React.RefObject<HTMLInputElement | null>;
}) => (
	<>
		{isAddOptionsWindowOpen && (
			<div
				className="absolute right-37 sm:right-43 top-17 z-50 rounded-2xl flex flex-col gap-2"
				ref={addOptionsWindowRef}
			>
				<ul>
					<li
						className="flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl"
						onClick={() => {
							navigate("job/new");
							setIsAddOptionsWindowOpen(false);
						}}
					>
						<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
							New Application
						</p>
						<div className="glass p-0.5 rounded-full cursor-pointer">
							<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuFilePlus2 className="text-lg" />
							</div>
						</div>
					</li>
					<li
						className="flex items-center justify-end group text-sm transition duration-300 cursor-pointer rounded-xl"
						onClick={() => {
							jsonFileInputRef.current?.click();
							setIsAddOptionsWindowOpen(false);
						}}
					>
						<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
							Import JSON
						</p>
						<div className="glass p-0.5 rounded-full cursor-pointer">
							<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuUpload className="text-lg" />
							</div>
						</div>
					</li>
				</ul>
			</div>
		)}
	</>
);

const ExportOptionsWindow = ({
	isExportOptionsWindowOpen,
	exportOptionsWindowRef,
	jobsApplicationsController,
}: {
	isExportOptionsWindowOpen: boolean;
	exportOptionsWindowRef: React.RefObject<HTMLDivElement | null>;
	jobsApplicationsController: Jobs;
}) => (
	<>
		{isExportOptionsWindowOpen && (
			<div
				className="absolute -right-1 sm:right-5 top-17 z-50 rounded-2xl flex flex-col gap-2"
				ref={exportOptionsWindowRef}
			>
				<ul>
					<li
						className="flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl"
						onClick={() => jobsApplicationsController.exportDataAsJSON()}
					>
						<div className="glass p-0.5 rounded-full cursor-pointer">
							<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuFileJson2 className="text-lg" />
							</div>
						</div>
						<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
							Export JSON
						</p>
					</li>
					<li
						className="flex items-center group text-sm transition duration-300 cursor-pointer rounded-xl"
						onClick={() => jobsApplicationsController.exportDataAsCSV()}
					>
						<div className="glass p-0.5 rounded-full cursor-pointer">
							<div className="p-2.5 rounded-full transition duration-300 group-hover:bg-white group-hover:text-gray-900">
								<LuFileSpreadsheet className="text-lg" />
							</div>
						</div>
						<p className="glass p-3 py-2 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 pointer-events-none">
							Export CSV
						</p>
					</li>
				</ul>
			</div>
		)}
	</>
);

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

	const navigate = useNavigate();
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
		<div className="sticky top-0 p-2 z-50 sm:px-8 sm:py-3">
			<div className="glass rounded-full flex justify-between items-center p-1">
				<Link
					to={"/"}
					className="flex gap-2 p-2 cursor-pointer pl-4 items-center"
				>
					<img src={logo} alt="jobsync" className="h-5" />
					<p className="text-lg font-semibold">
						<span>Job</span>
						<span className="italic">Sync</span>{" "}
					</p>
				</Link>

				<div className="flex gap-2 items-center">
					<div
						className={`${
							isAddOptionsWindowOpen
								? "bg-white text-gray-900 pointer-events-none"
								: "glass-head-btn"
						} p-3 rounded-full cursor-pointer`}
						onClick={() => setIsAddOptionsWindowOpen((prev) => !prev)}
					>
						{!isAddOptionsWindowOpen && <LuPlus className="text-lg" />}
						{isAddOptionsWindowOpen && <LuX className="text-lg" />}
					</div>
					<div
						className={`${
							isExportOptionsWindowOpen
								? "bg-white text-gray-900 pointer-events-none"
								: "glass-head-btn"
						} p-3 rounded-full cursor-pointer ${
							jobsApplicationsController.jobs.length == 0
								? "opacity-70 pointer-events-none"
								: ""
						}`}
						onClick={() => setIsExportOptionsWindowOpen((prev) => !prev)}
					>
						{!isExportOptionsWindowOpen && <LuFileOutput className="text-lg" />}
						{isExportOptionsWindowOpen && <LuX className="text-lg" />}
					</div>
					<ThemeButton />
				</div>
			</div>

			<AddOptionsWindow
				navigate={navigate}
				isAddOptionsWindowOpen={isAddOptionsWindowOpen}
				setIsAddOptionsWindowOpen={setIsAddOptionsWindowOpen}
				addOptionsWindowRef={addOptionsWindowRef}
				jsonFileInputRef={jsonFileInputRef}
			/>

			<ExportOptionsWindow
				isExportOptionsWindowOpen={isExportOptionsWindowOpen}
				exportOptionsWindowRef={exportOptionsWindowRef}
				jobsApplicationsController={jobsApplicationsController}
			/>

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
