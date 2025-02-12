"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import PlantFormField from "@/app/_components/plantForm/plantFormField";
import {LOCATION, VISIBLE_STATE} from "../../_constants";
import {PlantData} from "../../_types";
import {getPlantById, savePlant} from "@/app/_utils/localStorageService";
import {useEffect} from "react";

type FormField = {
	label: string,
	fieldName: string,
	value: string,
	options?: string[];
};

interface PlantFormProps {
	onClose: () => void;
	id: string;
}

const PlantForm = ({onClose, id}: PlantFormProps) => {
	const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<PlantData>({
		defaultValues: {
			name: "",
			location: undefined,
			description: "",
			visibleState: undefined,
		}
	});

	const onSubmit: SubmitHandler<PlantData> = (data) => {
		savePlant(data);
		reset();
		onClose();
	}

	const formFields: FormField[] = [
		{label: "Name", fieldName: "name", value: watch("name")},
		{label: "Location", fieldName: "location", value: watch("location"), options: Object.values(LOCATION)},
		{label: "Description", fieldName: "description", value: watch("description")},
		{
			label: "Visible state",
			fieldName: "visibleState",
			value: watch("visibleState"),
			options: Object.values(VISIBLE_STATE)
		},
	];

	useEffect(() => {
		if (id) {
			const plantData = getPlantById(id);
			plantData && reset(plantData);
		}
	}, [id, reset])

	return (
		<div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
			<form onSubmit={handleSubmit(onSubmit)} method="POST" className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl font-bold mb-4 text-center">{id ? "Edit Plant" : "Add Plant"}</h2>

				{formFields.map(({label, fieldName, value, options}) => (
					<PlantFormField key={fieldName} label={label} fieldName={fieldName} register={register}
					                errors={errors} value={value} options={options}/>))}

				<button type="submit"
				        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Submit
				</button>
			</form>
		</div>
	)
}

export default PlantForm;