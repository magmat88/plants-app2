import {LOCATION, VISIBLE_STATE} from "../_constants";

export type PlantData = {
	id: string;
	name: string;
	location: LOCATION | undefined;
	description: string;
	visibleState: VISIBLE_STATE | undefined;
}