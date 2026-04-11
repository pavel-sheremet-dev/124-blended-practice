import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination currentPage={1} onPageChange={() => {}} totalPages={5} />
        <button className={css.button}>Create post</button>
      </header>
      <Modal>
        <div>Контент модального вікна</div>
      </Modal>
      <PostList />
    </div>
  );
}
