"use client";

import {PlantData} from "@/app/types";
import {useEffect, useState} from "react";
import PlantsList from "@/app/_components/plantsList/plantsList";
import {getPlants} from "@/app/utils/localStorageService";

const Main = () => {
	const [data, setData] = useState<PlantData[]>(null);

	const refreshData = () => {
		const plantsData = getPlants();
		setData(plantsData);
	}

	useEffect(() => {
		refreshData();
	}, [])

	return (<>
		{data && (
			<PlantsList data={data} refreshData={refreshData}/>
		)}
	</>)
}

export default Main;