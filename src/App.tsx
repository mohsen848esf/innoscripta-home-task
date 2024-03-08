import { useEffect, useState } from "react";
import "./App.css";
import NewsCard from "./components/newsCard";
import Pagination from "./components/Pagination";
import FilterBar from "./components/filrerBar";
import { useGetNewsApi } from "./services/apis/query";
import { NewsData, syncParams, saveFilter } from "./utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "./redux/news.slice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function App() {
  const [inputValue, setInputValue] = useState("");
  const handlePageClick = (e: number) => {
    dispatch(setPage(e + 1));
  };

  const dispatch = useDispatch();
  const newsSliceData = useSelector((state: any) => state.news);
  const { data, pageCounts, totalCount, refetch } = useGetNewsApi(
    syncParams(newsSliceData?.params),
    newsSliceData?.params?.source?.value
  );
  useEffect(() => {
    refetch();
  }, [newsSliceData?.params]);
  const showSwal = () => {
    withReactContent(Swal).fire({
      title: <span>Input Saved Filter Name</span>,
      input: "text",
      inputValue,
      preConfirm: () => {
        const label = Swal.getInput()?.value;
        setInputValue(label || "");
        const createDate = new Date();
        label &&
          saveFilter({
            label,
            value: label,
            params: newsSliceData?.params,
            createDate,
          });
      },
    });
  };
  return (
    <>
      <div className="flex space-y-10 flex-col items-center justify-center ">
        {/* <div className="border w-full grid md:grid-cols-2 gap-4 grid-cols-1">
          <div className="border ">

          </div>
        </div> */}

        <div className="w-full sm:px-4">
          <FilterBar showSwal={showSwal} />
        </div>
        <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
          {totalCount > 0 ? (
            data?.map((item: NewsData, i: number) => (
              <NewsCard
                key={i + item.title}
                image={item.image_url}
                title={item.title}
                description={item.description}
                author={item.author}
                link={item.link}
                createDate={item.createDate}
                source={item.source}
                category={item.category}
              />
            ))
          ) : (
            <div className="font-bold text-gray-800" onClick={showSwal}>
              No article found
            </div>
          )}
        </div>
        <Pagination
          containerClassName="flex space-x-4 text-sm dark:text-gray-400 mt-10"
          pageClassName=""
          handlePageClick={handlePageClick}
          // breakLabel="..."
          nextLabel=">"
          pageRangeDisplayed={10}
          pageCount={pageCounts}
          previousLabel="<"
        />
      </div>
    </>
  );
}

export default App;
