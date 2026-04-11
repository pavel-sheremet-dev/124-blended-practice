import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListPrors {
  posts: Post[];
  selectPost: (post: Post) => void;
}

export default function PostList({ posts, selectPost }: PostListPrors) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => {
        return (
          <li key={post.id} className={css.listItem}>
            <h2 className={css.title}>{post.title}</h2>
            <p className={css.content}>{post.body}</p>
            <div className={css.footer}>
              <button className={css.edit} onClick={() => selectPost(post)}>
                Edit
              </button>
              <button
                className={css.delete}
                onClick={() => {
                  mutation.mutate(post.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
