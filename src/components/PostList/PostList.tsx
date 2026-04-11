import { Post } from "../../types/post";
import css from "./PostList.module.css";

interface PostListPrors {
  posts: Post[];
}

export default function PostList({ posts }: PostListPrors) {
  return (
    <ul className={css.list}>
      {posts.map((post) => {
        return (
          <li className={css.listItem}>
            <h2 className={css.title}>{post.title}</h2>
            <p className={css.content}>{post.body}</p>
            <div className={css.footer}>
              <button className={css.edit}>Edit</button>
              <button className={css.delete}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
