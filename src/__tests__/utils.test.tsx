import {generateUniqueId} from "@/app/_utils/generateUniqueId";
import {getPlantById, getPlants, savePlant} from "@/app/_utils/localStorageService";
import {LOCAL_STORAGE_KEYS, LOCATION, VISIBLE_STATE} from "@/app/_constants";

beforeEach(() => {
	jest.clearAllMocks();

	Object.defineProperty(window, 'localStorage', {
		value: {
			getItem: jest.fn(),
			setItem: jest.fn(),
			removeItem: jest.fn(),
		},
		writable: true,
	});
});

describe('Utils functions', () => {
	describe('generateUniqueId', () => {
		it('should generate a unique ID of length greater than 1', () => {
			const id = generateUniqueId();
			expect(id.length).toBeGreaterThan(1);
		});
	});

	describe('savePlant', () => {
		it('should save plant data to localStorage', () => {
			const newPlant = { id: generateUniqueId(), name: 'Test Plant', location: LOCATION.LIVING_ROOM, description: 'Test Description', visibleState: VISIBLE_STATE.HEALTHY };

			savePlant(newPlant);

			expect(localStorage.setItem).toHaveBeenCalledWith(
				LOCAL_STORAGE_KEYS.PLANTS_DATA,
				expect.any(String)
			);
		});
	});

	describe('getPlants', () => {
		it('should get all plants from localStorage', () => {
			const mockPlants = [
				{ id: '1', name: 'Plant 1', location: 'Living room', description: 'Test Description', visibleState: 'Healthy' },
				{ id: '2', name: 'Plant 2', location: 'Kitchen', description: 'Another Description', visibleState: 'Overwatered' }
			];

			localStorage.getItem.mockImplementation(() => JSON.stringify(mockPlants));

			const plants = getPlants();

			expect(plants).toEqual(mockPlants);
			expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.PLANTS_DATA);
		});

		it('should return an empty array when no plants are saved', () => {
			localStorage.getItem.mockImplementation(() => null);

			const plants = getPlants();

			expect(plants).toEqual([]);
		});
	});

	describe('getPlantById', () => {
		it('should return the plant with the given id', () => {
			const mockPlants = [
				{ id: '1', name: 'Plant 1', location: 'Living room', description: 'Test Description', visibleState: 'Healthy' },
				{ id: '2', name: 'Plant 2', location: 'Kitchen', description: 'Another Description', visibleState: 'Overwatered' }
			];
			localStorage.getItem.mockImplementation(() => JSON.stringify(mockPlants));

			const plant = getPlantById('1');

			expect(plant).toEqual(mockPlants[0]);
		});

		it('should return null if plant with given id does not exist', () => {
			const mockPlants = [
				{ id: '1', name: 'Plant 1', location: 'Living room', description: 'Test Description', visibleState: 'Healthy' }
			];
			localStorage.getItem.mockImplementation(() => JSON.stringify(mockPlants));

			const plant = getPlantById('non-existent-id');

			expect(plant).toBeNull();
		});
	});
});