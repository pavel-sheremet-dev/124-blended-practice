'use client';

import { useParams, useRouter } from 'next/navigation';
// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';

// import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/lib/api';
// import { User } from '@/types/user';

export default function PostDetailsClient() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  const { data } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPostById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log(data);

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button onClick={handleClickBack} className={css.backBtn}>
              ← Back
            </button>
            {data && (
              <div className={css.post}>
                <div className={css.wrapper}>
                  <div className={css.header}>
                    <h2>{data.title}</h2>
                  </div>

                  <p className={css.content}>{data?.body}</p>
                </div>
                <p className={css.user}>Author: {data.user.name}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
