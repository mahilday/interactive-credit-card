import { Field } from "formik";

interface InputFieldProps {
  label?: string;
  name: string;
  placeholder: string;
  onChange?: (e: any) => void;
  onError: string | false | undefined;
  value?: string | number;
  maxLength?: number;
  minLength?: number;
}

const InputField = ({
  label,
  name,
  placeholder,
  ...restProps
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="uppercase text-sm md:text-base font-medium">
          {label}
        </label>
      )}
      <Field
        name={name}
        placeholder={placeholder}
        className={`h-12 form-control ${
          restProps.onError ? "border-red-500" : ""
        } outline-none border rounded-md p-4`}
        {...restProps}
      />

      <div className="text-red-500 text-xs">{restProps.onError}</div>
    </div>
  );
};

export default InputField;
