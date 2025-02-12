import {DAYS_BETWEEN_PLANT_CARE_DEFAULT} from "@/app/_constants";

export const checkPlantNeeds = (lastPlantCaring: string | undefined, daysBetweenPlantCaring: number = DAYS_BETWEEN_PLANT_CARE_DEFAULT) => {
	if (!lastPlantCaring) {
		return true;
	}

	const lastPlantCaringDate = new Date(lastPlantCaring);
	const today = new Date();
	const differenceInDays = Math.floor((today.getTime() - lastPlantCaringDate.getTime()) / (1000 * 60 * 60 * 24));

	return differenceInDays > daysBetweenPlantCaring;
}