"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import PlantFormField from "@/app/_components/plantForm/plantFormField";
import {DAYS_BETWEEN_PLANT_CARE_DEFAULT, LOCATION, VISIBLE_STATE} from "@/app/_constants";
import {PlantData} from "@/app/_types";
import {getPlantById, savePlant, updatePlant} from "@/app/_utils/localStorageService";
import {ReactElement, useEffect} from "react";

type FormField = {
	label: string,
	fieldName: keyof PlantData,
	value: number | string | undefined,
	options?: string[];
};

interface PlantFormProps {
	onClose: () => void;
	id: string;
}

const PlantForm = ({onClose, id}: PlantFormProps): ReactElement | null => {
	const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<PlantData>({
		defaultValues: {
			name: "",
			location: undefined,
			description: "",
			visibleState: undefined,
			daysBetweenWatering: DAYS_BETWEEN_PLANT_CARE_DEFAULT,
			daysBetweenFertilizing: DAYS_BETWEEN_PLANT_CARE_DEFAULT
		}
	});

	const onSubmit: SubmitHandler<PlantData> = (data) => {
		if (id.length > 0) {
			updatePlant(id, data);
		} else {
			savePlant(data);
		}

		reset();
		onClose();
	}

	const handleCancel = () => {
		reset();
		onClose();
	}

	const formFields: FormField[] = [
		{label: "Name", fieldName: "name", value: watch("name")},
		{label: "Location", fieldName: "location", value: watch("location"), options: Object.values(LOCATION) as string[]},
		{label: "Description", fieldName: "description", value: watch("description")},
		{
			label: "Visible state",
			fieldName: "visibleState",
			value: watch("visibleState"),
			options: Object.values(VISIBLE_STATE) as string[]
		}
	];

	if (id) {
		formFields.push({
			label: "Days between watering",
			fieldName: "daysBetweenWatering",
			value: watch("daysBetweenWatering"),
		}, {
			label: "Days between fertilizing",
			fieldName: "daysBetweenFertilizing",
			value: watch("daysBetweenFertilizing"),
		})
	}

	useEffect(() => {
		if (id) {
			const plantData = getPlantById(id);
			if (plantData) {
				reset(plantData);
			}
		}
	}, [id, reset])

	return (
		<div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
			<form onSubmit={handleSubmit(onSubmit)} method="POST"
			      className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl font-bold mb-4 text-center">{id ? "Edit Plant" : "Add Plant"}</h2>

				{formFields.map(({label, fieldName, value, options}) => (
					<PlantFormField key={`${fieldName}`} label={label} fieldName={fieldName} register={register}
					                errors={errors} value={value} options={options}/>))}

				<div className="flex justify-between mt-4 space-x-4">
					<button type="button"
					        onClick={handleCancel}
					        className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition duration-200">Cancel
					</button>
					<button type="submit"
					        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Submit
					</button>
				</div>
			</form>
		</div>
	)
}

export default PlantForm;