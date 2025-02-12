export enum LOCATION {
	LIVING_ROOM = "Living room",
	BATHROOM_GROUND_FLOOR = "Bathroom ground floor",
	BEDROOM = "Bedroom",
	KID_ROOM = "Kid room",
	TERRACE = "Terrace",
	FRONT_GARDEN = "Front garden",
	ATTIC = "Attic",
	GARAGE = "Garage",
}

export enum VISIBLE_STATE {
	HEALTHY = "Healthy",
	OVERWATERED = "Overwatered",
	NEEDS_ATTENTION = "Needs attention",
	DRIED_OUT = "Dried out",
	DEAD = "Dead",
	NEWLY_PLANTED = "Newly planted",
	PEST_INFESTED = "Pest infested"
}

export enum LOCAL_STORAGE_KEYS {
	PLANTS_DATA = "plantsAppData"
}

export const DAYS_BETWEEN_PLANT_CARE_DEFAULT = 7;

export enum PLANT_CARE_TYPE {
	WATERING = "watering",
	FERTILIZING = "fertilizing"
}