import {
  GUARDIAN_API_BASE_URL,
  GUARDIAN_API_KEY,
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NYT_API_BASE_URL,
  NYT_API_KEY,
} from "../config";
import { getRandomImage } from "../data/image";
import { ESourceOptions } from "../data/source.data";
import { CATEGORY } from "../data/category.data";

export interface NewsData {
  title: string;
  description: string;
  author: string;
  category: string;
  image_url: string;
  link: string;
  createDate: string;
  source: string;
}

export const syncParams = (params: any) => {
  let queryParams = {};
  switch (params.source.value) {
    case ESourceOptions.NEWSAPI:
      queryParams = {
        from: params.from ? changeDateFormat(params.from) : undefined,
        to: params.to ? changeDateFormat(params.to) : undefined,
        category: params.category ? params.category?.value : undefined,
        apiKey: NEWS_API_KEY,
        q: params.querySearch ? params.querySearch : undefined,
        page: params?.page,
      };
      return { params: queryParams, url: NEWS_API_BASE_URL };
    case ESourceOptions.BBC_NEWS:
      queryParams = {
        from: params.from ? changeDateFormat(params.from) : undefined,
        to: params.to ? changeDateFormat(params.to) : undefined,
        source: params.source.value,
        apiKey: NEWS_API_KEY,
        page: params?.page,
        q: params.querySearch ? params.querySearch : undefined,
      };
      return { params: queryParams, url: NEWS_API_BASE_URL };
    case ESourceOptions.GUARDIANAPIS:
      queryParams = {
        "from-date": params.from ? changeDateFormat(params.from) : undefined,
        "to-date": params.to ? changeDateFormat(params.to) : undefined,
        section: params.category ? params.category?.value : undefined,
        "api-key": GUARDIAN_API_KEY,
        page: params?.page,
        q: params.querySearch ? params.querySearch : undefined,
      };
      return { params: queryParams, url: GUARDIAN_API_BASE_URL };
    case ESourceOptions.NYTIMES:
      queryParams = {
        begin_date: params.from ? changeDateFormat(params.from) : undefined,
        end_date: params.to ? changeDateFormat(params.to) : undefined,
        fq: params.category
          ? `news_desk:(${params.category?.value})`
          : undefined,
        "api-key": NYT_API_KEY,
        q: params.querySearch ? params.querySearch : undefined,
        page: params?.page,
      };
      return { params: queryParams, url: NYT_API_BASE_URL };
    default:
      break;
  }
};

export const changeDateFormat = (date: string, format = "-") => {
  const originalDate = new Date(date);
  const newDate =
    originalDate.getFullYear() +
    format +
    (originalDate.getMonth() + 1) +
    format +
    originalDate.getDate();

  return newDate;
};

export const dataMaping = (newsData: any, source: string) => {
  let newData: NewsData[] = [];

  switch (source) {
    case ESourceOptions.NEWSAPI:
      newsData?.forEach((data: any) =>
        newData.push({
          title: data.title,
          description: data.description,
          author: data.author,
          category: data.category,
          image_url: data.urlToImage ? data?.urlToImage : getRandomImage(),
          link: data.url,
          createDate: data.publishedAt,
          source: "NewsApi",
        })
      );
      return newData;
    case ESourceOptions.BBC_NEWS:
      newsData?.forEach((data: any) =>
        newData.push({
          title: data.title,
          description: data.description,
          author: data.author,
          category: data.category,
          image_url: data.urlToImage ? data?.urlToImage : getRandomImage(),
          link: data.url,
          createDate: data.publishedAt,
          source: "BBC News",
        })
      );
      return newData;
    case ESourceOptions.GUARDIANAPIS:
      newsData?.forEach((data: any) =>
        newData.push({
          title: data.webTitle,
          author: data.type,
          description: data.description,
          link: data.webUrl,
          createDate: data.webPublicationDate,
          category: data.sectionId,
          image_url: getRandomImage(),
          source: "The Guardian",
        })
      );
      return newData;
    case ESourceOptions.NYTIMES:
      newsData?.forEach((data: any) =>
        newData.push({
          title: data?.headline?.main,
          author: data.type,
          description: data.abstract,
          link: data.web_url,
          createDate: data.pub_date,
          category: data.news_desk.length > 0 ? data.news_desk : "article",
          image_url: getRandomImage(),
          source: data?.source,
        })
      );
      return newData;

    default:
      break;
  }
};

export const shortText = (text: string, length = 125): string => {
  return text.length < length
    ? text.substring(0, length)
    : text.substring(0, length) + " ...";
};

export const useGetCategoryOptions = (source: string) => {
  switch (source) {
    case ESourceOptions.NEWSAPI:
      return CATEGORY[ESourceOptions.NEWSAPI];
    case ESourceOptions.BBC_NEWS:
      return CATEGORY[ESourceOptions.BBC_NEWS];
    case ESourceOptions.GUARDIANAPIS:
      return CATEGORY[ESourceOptions.GUARDIANAPIS];
    case ESourceOptions.NYTIMES:
      return CATEGORY[ESourceOptions.NYTIMES];

    default:
      return CATEGORY[ESourceOptions.NEWSAPI];
  }
};

export const  dateFormater=(date: string | number | Date) =>{
  const now = new Date();
  const newDate = new Date(date);
  const diffMs = now.getTime() - newDate.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
  } else if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  } else if (diffWeeks > 0) {
    return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  } else if (diffDays > 0) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  } else {
    return `${diffSecs} second${diffSecs === 1 ? "" : "s"} ago`;
  }
}


export const saveFilter = ({ label,value,params,createDate }: any) => {
    const saveDataStringify: any = localStorage.getItem("save");
    const saveData = saveDataStringify ? JSON.parse(saveDataStringify) : [];
    const findItem = saveData.find((item: any) => item.value === value);
    if (findItem) {
      console.log("this name is exist");
    } else {
      saveData.push({ label,value,params,createDate });
    }
    localStorage.setItem("save", JSON.stringify(saveData));
  };
  
  export const getSavedFilters = () => {
    const saveDataStringify: any = localStorage.getItem("save");
    return saveDataStringify ? JSON.parse(saveDataStringify) : [];
  };
  