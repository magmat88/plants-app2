import {FieldValues, UseFormRegister} from "react-hook-form";
import {PlantData} from "@/app/_types";

interface PlantFormFieldProps {
	label: string;
	fieldName: keyof PlantData;
	register: UseFormRegister<PlantData>;
	errors: FieldValues;
	value: number | string | undefined;
	options?: string[] | undefined;
}

const PlantFormField = ({label, fieldName, register, errors, value, options}: PlantFormFieldProps) => {
	const defaultOption = "---";

	return (
		<div className="mb-4">
			<label htmlFor={fieldName} className="block text-gray-700">{label}</label>

			<div className="flex items-center">
				{options ? (
					<select {...register(fieldName, {required: "This field is required"})}
					        className="w-full p-2 border border-gray-300 rounded mt-1">
						<option value="">{defaultOption}</option>
						{options.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
				) : (
					<input {...register(`${fieldName}`, {required: "This field is required"})}
					       className="w-full p-2 border border-gray-300 rounded mt-1"/>)}
				{value && <span className="ml-2">✅</span>}
			</div>
			{errors[fieldName] && <span className="text-red-500 text-sm">{errors[fieldName].message}</span>}
		</div>
	)
}

export default PlantFormField;