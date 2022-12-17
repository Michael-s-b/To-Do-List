export function getDate() {
	const date = new Date();
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};
	return date.toLocaleDateString("en-US", options);
}
