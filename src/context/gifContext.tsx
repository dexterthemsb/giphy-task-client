import { AxiosResponse } from "axios";
import { createContext, FC, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

export interface IGIFContext {
  fetching: boolean;
  query: string;
  search: Array<Object>;
  trending: Array<Object>;
  offset: number;
  setFetching: Function;
  setQuery: Function;
  setSearch: Function;
  setTrending: Function;
  loadMore: Function;
  setOffset: Function;
}

const initialContext: IGIFContext = {
  fetching: false,
  query: "",
  search: [],
  trending: [],
  offset: 0,
  setFetching: () => {},
  setQuery: () => {},
  setSearch: () => {},
  setTrending: () => {},
  loadMore: () => {},
  setOffset: () => {}
};

const GIFContext = createContext<IGIFContext>(initialContext);

export const GIFContextProvider: FC = ({ children }) => {
  const [fetching, setFetching] = useState<boolean>(initialContext.fetching);
  const [query, setQuery] = useState<string>(initialContext.query);
  const [search, setSearch] = useState<Array<Object>>(initialContext.search);
  const [trending, setTrending] = useState<Array<Object>>(initialContext.trending);
  const [offset, setOffset] = useState<number>(initialContext.offset);

  const loadMore = async (input = "") => {
    try {
      const endpoint = query ? "search" : "trending";
      const params = query ? { q: query, offset } : { offset };

      const res: AxiosResponse = await axiosInstance.get(endpoint, { params });

      if (res.status === 200) {
        if (query) {
          console.log("Update search");
          setSearch(search => [...search, ...res.data.gifs.data]);
        } else {
          console.log("Update trending");
          setTrending(trending => [...trending, ...res.data.gifs.data]);
        }
        setOffset(offset => offset + 9);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!query) {
      setOffset(trending.length);
    } else {
      setOffset(0);
    }

    setSearch([]);
    // eslint-disable-next-line
  }, [query]);

  return (
    <GIFContext.Provider
      value={{
        fetching,
        query,
        search,
        trending,
        offset,
        setFetching,
        setQuery,
        setSearch,
        setTrending,
        loadMore,
        setOffset
      }}
    >
      {children}
    </GIFContext.Provider>
  );
};

export default GIFContext;
