import React, { useEffect, useState } from "react";
import Input from "../input";
import SelectOption, { TOption } from "../selectOption";
import { SourceOptions } from "../../data/source.data";
import DatePicker from "../datePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  setCategory,
  setFilter,
  setFrom,
  setSearch,
  setSource,
  setTo,
  setSavedFeed
} from "../../redux/news.slice";
import { useGetCategoryOptions, getSavedFilters } from "../../utils/helper";

const FilterBar = ({ showSwal }: any) => {
  const [categoryOptions, setCategoryOptions] = useState<TOption[]>([]);
  const dispatch = useDispatch();
  const newsSliceData = useSelector((state: any) => state.news);
  useEffect(() => {
    const options = useGetCategoryOptions(newsSliceData?.source?.value);
    setCategoryOptions(options);
  }, [newsSliceData?.source]);

  return (
    <div className="w-full md:w-3/3 shadow p-5 rounded-lg bg-white">
      <Input
        value={newsSliceData.querySearch}
        handleChange={(e) => {
          dispatch(setSearch(e));
        }}
      />

      <div className="flex items-center justify-between mt-4">
        <p className="font-semibold text-gray-800">Filters</p>

        <div className="flex items-center justify-between space-x-5">
          <button
            onClick={() => {
              dispatch(clearState());
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
          >
            Reset Filter
          </button>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mt-4">
          <SelectOption
            name={"Save Search"}
            options={getSavedFilters()}
            selected={null}
            isClearable={true}
            handelSelect={(e: any) => {
              // setSelectedOption(e);

              e && dispatch(setSavedFeed(e?.params));
            }}
          />
          <SelectOption
            name={"Source"}
            options={SourceOptions}
            selected={newsSliceData.source}
            isClearable={false}
            handelSelect={(e) => {
              e && dispatch(setSource(e));
            }}
          />
          {newsSliceData.source?.value !== "bbc-news" && (
            <SelectOption
              name={"Category"}
              options={categoryOptions}
              selected={newsSliceData.category}
              isClearable={true}
              handelSelect={(e) => {
                dispatch(setCategory(e));
              }}
            />
          )}
          <DatePicker
            name="From"
            handelChange={(e) => dispatch(setFrom(e))}
            selected={newsSliceData.from}
          />
          <DatePicker
            name="To"
            handelChange={(e) => dispatch(setTo(e))}
            selected={newsSliceData.to}
          />
        </div>
      </div>
      <div className="flex items-center justify-end space-x-3 mt-16">
        <button
          onClick={showSwal}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-gray-800 text-sm font-medium rounded-md"
        >
          save
        </button>
        <button
          onClick={() => {
            const { querySearch, source, category, from, to } = newsSliceData;

            dispatch(setFilter({ querySearch, source, category, from, to }));
          }}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-gray-100 text-md font-medium rounded-md"
        >
          set Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
