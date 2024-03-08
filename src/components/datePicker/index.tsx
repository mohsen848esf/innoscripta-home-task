import React, { FC, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IDatePicker {
  name: string;
  handelChange: (e: string) => void;
  selected: string;
}

const DatePicker: FC<IDatePicker> = ({ name, selected, handelChange }) => {
  return (
    <div className="flex flex-col justify-end items-start col-span-1">
      <label className="font-medium text-gray-800">{name}</label>
      <ReactDatePicker
        wrapperClassName="h-4/6 px-1 block py-1 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-600 text-left"
        calendarClassName="bg-white"
        selected={selected?.length > 0 ? new Date(selected) : null}
        onChange={(date) => {
          date && handelChange(date?.toString());
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText="choose a date"
        isClearable={true}
        // dateFormat="Pp"
      />
    </div>
  );
};

export default DatePicker;
