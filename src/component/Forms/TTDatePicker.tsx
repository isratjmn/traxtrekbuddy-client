import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
    name: string;
    size?: "small" | "medium";
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: Record<string, any>;
}

const TTDatePicker = ({
    name,
    size = "small",
    label,
    required,
    fullWidth = true,
    sx = {},
}: IDatePicker) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...field } }) => (
                <div className="w-full">
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <input
                        id={name}
                        type="date"
                        value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
                        onChange={(e) => onChange(e.target.value)}
                        className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${fullWidth ? "fullWidth" : ""
                            }`}
                        required={required}
                        size={size}
                        {...field}
                        {...sx}
                    />
                </div>
            )}
        />
    );
};

export default TTDatePicker;
