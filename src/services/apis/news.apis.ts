import axios from "axios";

export const getNews = (url: string, params: any) => {
  return axios.get(url, { params: params });
};
