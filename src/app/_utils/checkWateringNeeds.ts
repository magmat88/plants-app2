import {DAYS_BETWEEN_WATERING_DEFAULT} from "@/app/_constants";

export const checkWateringNeeds = (lastWatered: string | undefined, daysBetweenWatering: number = DAYS_BETWEEN_WATERING_DEFAULT) => {
	if (!lastWatered) {
		return true;
	}

	const lastWateredDate = new Date(lastWatered);
	const today = new Date();
	const differenceInDays = Math.floor((today.getTime() - lastWateredDate.getTime()) / (1000 * 60 * 60 * 24));

	return differenceInDays > daysBetweenWatering;
}