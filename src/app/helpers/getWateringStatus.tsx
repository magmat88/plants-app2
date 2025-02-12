import {IconDropletExclamation, IconDropletFilled, IconDroplet} from "@tabler/icons-react";
import {checkWateringNeeds} from "@/app/utils/checkWateringNeeds";

export const getWateringStatus = (lastWatered: string | undefined, daysBetweenWatering: number) => {
	if (!lastWatered) {
		return <IconDropletExclamation color="gray" title="Not watered yet"/>
	}

	const needsWatering = checkWateringNeeds(lastWatered, daysBetweenWatering);

	return needsWatering ? <IconDroplet color="gray" title={`Last watered ${lastWatered}`}/> :
		<IconDropletFilled color="#228be6" title={`Last watered ${lastWatered}`}/>
}