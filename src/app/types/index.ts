import {LOCATION, VISIBLE_STATE} from "@/app/constants";

export type PlantData = {
	id: string;
	name: string;
	location: LOCATION | undefined;
	description: string;
	visibleState: VISIBLE_STATE | undefined;
	lastWatered?: string;
	daysBetweenWatering?: number;
}