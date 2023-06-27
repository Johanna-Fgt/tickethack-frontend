const formatMinutes = (date) =>
	new Date(date).getMinutes() >= 10
		? new Date(date).getMinutes()
		: `0${new Date(date).getMinutes()}`;

const formatHours = (date) =>
	new Date(date).getHours() >= 10
		? new Date(date).getHours()
		: `0${new Date(date).getHours()}`;

export const getFullHour = (date) => {
	let minutes = formatMinutes(date);
	let hours = formatHours(date);
	return `${hours}:${minutes}`;
};

export const getTimeToDeparture = (date) => {
	let actualDate = new Date().getTime();
	let tripDate = new Date(date).getTime();
	let time = tripDate - actualDate;
	let hours = formatHours(time);
	let minutes = formatMinutes(time);

	return hours > 0 && minutes > 0
		? `${hours} hours ${minutes} minutes`
		: hours <= 0 && minutes > 0
		? `${minutes} minutes`
		: `${hours} hours`;
};
