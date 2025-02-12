import {PlantData} from "@/app/types";
import {LOCAL_STORAGE_KEYS} from "@/app/constants";
import {generateUniqueId} from "@/app/utils/generateUniqueId";

export const savePlant = (newPlant: PlantData) => {
	try {
		const plantToSave = {...newPlant, id: generateUniqueId()};

		//todo temporary for testing watering feature purpose

		// const tenDaysAgo = new Date().setDate(new Date().getDate() - 10);
		// const plantToSave = {...newPlant, id: generateUniqueId(), lastWatered: tenDaysAgo};

		const existingPlants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA) || "[]");
		existingPlants.push(plantToSave);

		localStorage.setItem(LOCAL_STORAGE_KEYS.PLANTS_DATA, JSON.stringify(existingPlants));
	} catch (error) {
		console.error("Error saving to local storage", error)
	}
}

export const updatePlant = (plantId: string, updatedPlant: PlantData) => {
	try {
		const existingPlants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA) || "[]");
		const updatedPlants = existingPlants.map((plant: PlantData) => {
			return plant.id === plantId ? {...updatedPlant} : plant;
		});

		localStorage.setItem(LOCAL_STORAGE_KEYS.PLANTS_DATA, JSON.stringify(updatedPlants));
	} catch (error) {
		console.error("Error updating plant in local storage", error);
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

export const getPlantById = (plantId: string): PlantData | null => {
	try {
		const data = localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA);

		if (!data) {
			return null
		}

		const plants: PlantData[] = JSON.parse(data);
		return plants.find(plant => plant.id === plantId) || null;
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

export const waterPlant = (plantId: string) => {
	try {
		const existingPlants = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PLANTS_DATA) || "[]");
		const updatedPlants = existingPlants.map((plant: PlantData) => {
			return plant.id === plantId ? {...plant, lastWatered: new Date().toISOString()} : plant;
		});

		localStorage.setItem(LOCAL_STORAGE_KEYS.PLANTS_DATA, JSON.stringify(updatedPlants));
	} catch (error) {
		console.error("Error watering plant in local storage", error);
	}
}
