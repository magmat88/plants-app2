"use client";

import {PlantData} from "../../_types";
import {useEffect, useState} from "react";
import PlantsList from "@/app/_components/plantsList/plantsList";
import {getPlants} from "@/app/_utils/localStorageService";

const Main = () => {
	const [data, setData] = useState<PlantData[]>([]);

	const refreshData = () => {
		const plantsData = getPlants();
		setData(plantsData);
	}

	useEffect(() => {
		refreshData();
	}, [])

	return (<>
		{data.length > 0 && (
			<PlantsList data={data} refreshData={refreshData}/>
		)}
	</>)
}

export default Main;