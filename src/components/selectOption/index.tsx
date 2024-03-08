import React, { FC } from "react";
import Select from "react-select";

export type TOption = { label: string; value: string };

interface ISelecetOption {
  options: TOption[]|undefined;
  selected: TOption | null;
  handelSelect: (val: TOption) => void;
  name: string;
  isClearable?: boolean;
}

const SelectOption: FC<ISelecetOption> = ({
  options,
  selected,
  handelSelect,
  name,
  isClearable = true,
}) => {
  return (
    <div className="flex flex-col justify-start items-start col-span-1 xl:col-span-2">
      <label className="font-medium text-gray-800">{name}</label>
      <Select
        className=" px-1 py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-600 text-left"
        defaultValue={selected}
        value={selected}
        isClearable={isClearable}
        isSearchable={true}
        name={name}
        options={options}
        onChange={(e) => e && handelSelect(e)}
      />
    </div>
  );
};

export default SelectOption;
