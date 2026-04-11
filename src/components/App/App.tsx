import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["post", page],
    queryFn: () => fetchPosts(search, page),
    placeholderData: keepPreviousData,
  });

  const handlePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {isSuccess && (
          <Pagination currentPage={page} onPageChange={handlePage} totalPages={data.totalPages} />
        )}
        <button className={css.button}>Create post</button>
      </header>
      <Modal>
        <div>Контент модального вікна</div>
      </Modal>
      {isSuccess && <PostList posts={data.posts} />}
    </div>
  );
}
