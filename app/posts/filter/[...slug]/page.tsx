// import { fetchPosts } from '@/lib/api';

import { fetchPosts } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function PostsPage({ params }: Props) {
  const { slug } = await params;
  console.log(slug);
  const queryClient = new QueryClient();
  const userId = slug[0];
  await queryClient.prefetchQuery({
    queryKey: ['posts', '', 1, userId],
    queryFn: () => fetchPosts({ searchText: '', page: 1, userId }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={userId} />
    </HydrationBoundary>
  );
}
