import { FormEvent } from "../../types";

type InputPropTypes = {
    name: string;
    label: string;
    value: string;
    maxLength?: number;
    onChange: (e: FormEvent) => void;
};

export default function Input({
    name,
    label,
    value,
    maxLength,
    onChange,
}: InputPropTypes) {
    return (
        <div className="mb-6">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                className="block w-full max-w-100 border p-2"
                value={value}
                maxLength={maxLength}
                onChange={onChange}
            />
        </div>
    );
}
