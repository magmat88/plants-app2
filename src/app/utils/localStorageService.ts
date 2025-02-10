import {PlantData} from "@/app/types";
import {LOCAL_STORAGE_KEYS} from "@/app/constants";
import {generateUniqueId} from "@/app/utils/generateUniqueId";

export const savePlant = (newPlant: PlantData) => {
	try {
		const plantToSave = {...newPlant, id: generateUniqueId()};

		const existingPlants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA) || "[]");
		existingPlants.push(plantToSave);

		localStorage.setItem(LOCAL_STORAGE_KEYS.PLANTS_DATA, JSON.stringify(existingPlants));
	} catch (error) {
		console.error("Error saving to local storage", error)
	}
}

export const getPlants = (): PlantData[] => {
	try {
		const data = localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error("Error getting data from local storage", error);
		return [];
	}
}

export const getPlantById = (id: string): PlantData | null => {
	try {
		const data = localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA);

		if (!data) {
			return null
		}

		const plants: PlantData[] = JSON.parse(data);
		return plants.find(plant => plant.id === id) || null;
	} catch (error) {
		console.error("Error getting data from local storage", error);
		return null;
	}
}

export const removePlant = (plantId: string) => {
	try {
		const existingPlants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA) || "[]");
		const updatedPlants = existingPlants.filter((plant: PlantData) => plant.id !== plantId);

		localStorage.setItem(LOCAL_STORAGE_KEYS.PLANTS_DATA, JSON.stringify(updatedPlants));
	} catch (error) {
		console.error("Error removing plant from local storage", error);
		return [];
	}
}
