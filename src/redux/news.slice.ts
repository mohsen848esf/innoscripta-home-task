import { TOption } from "../components/selectOption";
import {
  SourceOptions,
  TSourceOption,
  TSourceValue,
} from "./../data/source.data";
import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface INewsSlice {
  params: {
    querySearch: string;
    source: TSourceOption;
    category: TOption;
    from: string;
    to: string;
    page:number
  };
  querySearch: string;
  source: TSourceOption;
  category: TOption;
  from: string;
  to: string;
  page: number;
}
const initialState = {
  params: {
    querySearch: "",
    source: SourceOptions[0],
    category: null,
    from: "",
    to: "",
  },
  querySearch: "",
  source: SourceOptions[0],
  category: null,
  from: "",
  to: "",
  page: 1,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setFilter: (state: any, action: PayloadAction<any>) => {
      state.params = { ...state.params, ...action.payload, page: 1 };
      state.page = 1;
    },
    setSavedFeed: (state: any, action: PayloadAction<any>) => {
      state.params = { ...state.params, ...action.payload, page: 1 };
      state.querySearch = action.payload.querySearch;
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.page = 1;
      state.category = action.payload.category;
      state.source = action.payload.source;
    },
    setQuerySearch: (state: any, action: PayloadAction<any>) => {
      state.querySearch = action.payload;
    },
    setSource: (state: any, action: PayloadAction<TOption>) => {
      state.source = action.payload;
    },
    setCategory: (state: any, action: PayloadAction<TOption>) => {
      state.category = action.payload;
    },
    setFrom: (state: any, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setTo: (state: any, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    setPage: (state: any, action: PayloadAction<number>) => {
      state.params = { ...state.params, page: action.payload };
      state.page = action.payload;
    },
    setSearch: (state: any, action: PayloadAction<any>) => {
      state.params = { ...state.params, querySearch: action.payload, page: 1 };
      state.page = 1;
    },
    clearState: (state: any) => {
      state.params = {
        querySearch: "",
        source: SourceOptions[0],
        category: null,
        from: "",
        to: "",
        page: 1,
      };
      state.querySearch = "";
      state.from = "";
      state.to = "";
      state.page = 1;
      state.category = null;
      state.source = SourceOptions[0];
    },
  },
});
export const {
  setFilter,
  setQuerySearch,
  setSource,
  setCategory,
  setFrom,
  setTo,
  setPage,
  setSearch,
  clearState,
  setSavedFeed
} = newsSlice.actions;

export default newsSlice.reducer;
