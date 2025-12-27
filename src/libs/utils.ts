export const toggleTheme = (): void => {
	const root = document.documentElement;
	root.classList.toggle("light");

	localStorage.setItem(
		"is_dark",
		JSON.stringify(!root.classList.contains("light"))
	);
};

export const urlParser = (url: string): string => {
	if (url.includes("linkedin")) return "LinkedIn Job Post Link";
	else return "Job Post Link";
};

export const shortDateParser = (date: string): string =>
	new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
