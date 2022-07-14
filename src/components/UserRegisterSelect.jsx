import React from "react";
import Select from "react-select";

export default function UserRegisterSelect({
  onChange,
  options,
  value,
  className,
}) 
{
  const defaultValue = (options, value) => {
    return options.find((option) => option.value === value) || "";
  };

  
  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
      />
    </div>
  );
}