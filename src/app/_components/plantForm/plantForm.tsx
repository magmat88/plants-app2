"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import PlantFormField from "@/app/_components/plantForm/plantFormField";

type FormData = {
	name: string;
	location: string;
	description: string;
	visibleState: string;
}

type FormField = {
	label: string,
	fieldName: string,
	value: string,
};

const PlantForm = () => {
	const {register, handleSubmit, watch, formState: {errors}} = useForm<FormData>();
	const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

	const formFields: FormField[] = [
		{label: "Name", fieldName: "name", value: watch("name")},
		{label: "Location", fieldName: "location", value: watch("location")},
		{label: "Description", fieldName: "description", value: watch("description")},
		{label: "Visible state", fieldName: "visibleState", value: watch("visibleState")},
	]

	return (
		<div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
			<form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-xl font-bold mb-4 text-center">Plant Form</h2>

				{formFields.map(({label, fieldName, value}) => (
					<PlantFormField key={fieldName} label={label} fieldName={fieldName} register={register}
					                errors={errors} value={value}/>))}

				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit
				</button>
			</form>
		</div>
	)
}

export default PlantForm;