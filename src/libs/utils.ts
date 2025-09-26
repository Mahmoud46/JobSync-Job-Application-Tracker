export const toggleTheme = (): void => {
	const root = document.documentElement;
	root.classList.toggle("light");

	localStorage.setItem(
		"is_dark",
		JSON.stringify(!root.classList.contains("light"))
	);
};
