import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);

  const handleSerch = useDebouncedCallback((v: string) => {
    setSearch(v);
  }, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["post", page, search],
    queryFn: () => fetchPosts(search, page),
    placeholderData: keepPreviousData,
  });

  const handlePage = (page: number) => {
    setPage(page);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedPost(null);
  };

  const selectPost = (post: Post) => {
    setSelectedPost(post);
    setIsOpenModal(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSerch} />
        {isSuccess && (
          <Pagination currentPage={page} onPageChange={handlePage} totalPages={data.totalPages} />
        )}
        <button className={css.button} onClick={() => setIsOpenModal(true)}>
          Create post
        </button>
      </header>
      {isOpenModal && (
        <Modal onClose={closeModal}>
          {selectedPost ? (
            <EditPostForm post={selectedPost} onClose={closeModal} />
          ) : (
            <CreatePostForm onClose={closeModal} />
          )}
        </Modal>
      )}
      {isSuccess && <PostList posts={data.posts} selectPost={selectPost} />}
    </div>
  );
}
