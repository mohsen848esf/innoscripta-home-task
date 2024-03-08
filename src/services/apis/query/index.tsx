import { getNews } from "../news.apis";
import { ESourceOptions } from "../../../data/source.data";
import { useQuery } from "@tanstack/react-query";
import { dataMaping } from "../../../utils/helper";

export const useGetNewsApi = (data: any, source: string) => {
  const api_url = data.url;
  const api_params = data.params;
  const {
    data: newsData,
    isLoading,
    refetch,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["newsQuery"],
    queryFn: () => getNews(api_url, api_params),
    enabled: true,
  });
  let response = [];
  let totalCount;
  let pageCounts;
  switch (source) {
    case ESourceOptions.NEWSAPI:
      response = newsData?.data?.articles;
      totalCount = newsData?.data?.totalResults;
      break;
    case ESourceOptions.BBC_NEWS:
      response = newsData?.data?.articles;
      totalCount = newsData?.data?.totalResults;
      break;
    case ESourceOptions.GUARDIANAPIS:
      response = newsData?.data?.response?.results;
      totalCount = newsData?.data?.response?.total;
      break;
    case ESourceOptions.NYTIMES:
      response = newsData?.data?.response?.docs;
      totalCount = newsData?.data?.response?.meta?.hits;
      break;
    default:
      break;
  }
  pageCounts = totalCount ? Math.ceil(totalCount / 10) : 0;
  const finalData = response && dataMaping(response, source);
  return {
    isLoading,
    refetch,
    isError,
    isSuccess,
    data: finalData,
    totalCount,
    pageCounts,
  };
};
