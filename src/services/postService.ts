import axios from "axios";
import { Post, PostFormData } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText: string, page: number) => {
  const res = await axios.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: 12,
    },
  });
  const totalPages = Math.ceil(res.headers["x-total-count"] / 12);
  return { posts: res.data, totalPages };
};

export const createPost = async (newPost: PostFormData) => {
  const res = await axios.post<Post>("/posts", newPost);

  console.log(res.data);

  return res.data;
};

type UpdatePostData = Omit<Post, "userId">;

export const editPost = async (newDataPost: UpdatePostData) => {
  const { id, ...body } = newDataPost;
  const res = await axios.put<Post>(`/posts/${id}`, body);

  return res.data;
};

export const deletePost = async (postId: number) => {
  const res = await axios.delete<Post>(`/posts/${postId}`);
  return res.data;
};
