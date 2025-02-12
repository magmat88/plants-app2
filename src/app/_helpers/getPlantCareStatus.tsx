import {
	IconDropletOff,
	IconDropletFilled,
	IconDroplet,
	IconSeedlingFilled,
	IconSeedling,
	IconSeedlingOff
} from "@tabler/icons-react";
import {checkPlantNeeds} from "@/app/_utils/checkPlantNeeds";
import {PLANT_CARE_TYPE} from "@/app/_constants";

const plantCareIcons = {
	[PLANT_CARE_TYPE.WATERING]: {
		notDone: <IconDropletOff color="gray" title="Not watered yet"/>,
		needsCare: (date: string) => <IconDroplet color="gray" title={`Last watered ${date}`}/>,
		done: (date: string) => <IconDropletFilled color="#228be6" title={`Last watered ${date}`}/>
	},
	[PLANT_CARE_TYPE.FERTILIZING]: {
		notDone: <IconSeedlingOff color="gray" title="Not fertilized yet"/>,
		needsCare: (date: string) => <IconSeedling color="gray" title={`Last fertilized ${date}`}/>,
		done: (date: string) => <IconSeedlingFilled color="#40c057" title={`Last fertilized ${date}`}/>
	}
}
export const getPlantCareStatus = (lastPlantCare: string | undefined, daysBetweenPlantCare: number, type: PLANT_CARE_TYPE) => {
	if (!lastPlantCare) {
		return plantCareIcons[type].notDone;
	}

	const needsCare = checkPlantNeeds(lastPlantCare, daysBetweenPlantCare);

	return needsCare ? plantCareIcons[type].needsCare(lastPlantCare) : plantCareIcons[type].done(lastPlantCare);
}