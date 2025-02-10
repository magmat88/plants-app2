"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import PlantFormField from "@/app/_components/plantForm/plantFormField";
import {LOCATION, VISIBLE_STATE} from "@/app/constants";

type FormData = {
	name: string;
	location: LOCATION | undefined;
	description: string;
	visibleState: VISIBLE_STATE | undefined;
}

type FormField = {
	label: string,
	fieldName: string,
	value: string,
	options?: string[];
};

const PlantForm = () => {
	const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>({
		defaultValues: {
			location: undefined,
			visibleState: undefined
		}
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		localStorage.setItem("plantFormData", JSON.stringify(data));
		console.log(data);
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
	]

	return (
		<div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
			<form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl font-bold mb-4 text-center">Plant Form</h2>

				{formFields.map(({label, fieldName, value, options}) => (
					<PlantFormField key={fieldName} label={label} fieldName={fieldName} register={register}
					                errors={errors} value={value} options={options}/>))}

				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit
				</button>
			</form>
		</div>
	)
}

export default PlantForm;