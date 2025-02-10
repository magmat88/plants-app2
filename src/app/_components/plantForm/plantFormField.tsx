import {useForm} from "react-hook-form";

interface PlantFormFieldProps {
	label: string;
	fieldName: string;
	register: ReturnType<typeof useForm>['register'];
	errors: any;
	value: string;
}

const PlantFormField = ({label, fieldName, register, errors, value}: PlantFormFieldProps) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700">{label}</label>
			<div className="flex items-center">
				<input {...register(`${fieldName}`, {required: "This field is required"})}
				       className="w-full p-2 border border-gray-300 rounded mt-1"/>
				{value && <span className="ml-2">✅</span>}
			</div>
			{errors[fieldName] && <span className="text-red-500 text-sm">{errors[fieldName].message}</span>}
		</div>
	)
}

export default PlantFormField;