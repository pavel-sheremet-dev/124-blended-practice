import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetails({ params }: Props) {
  const { id } = await params;
  console.log(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
