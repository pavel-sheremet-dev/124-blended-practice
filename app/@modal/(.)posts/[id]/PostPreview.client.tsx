'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import css from './PostPreview.module.css';

export default function PostPreviewClient() {
  const { id } = useParams<{ id: string }>();
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

  return (
    <Modal onClose={handleClickBack}>
      <button onClick={handleClickBack} className={css.backBtn}>
        ← Back
      </button>
      {data && (
        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>

            <p className={css.content}>{data.body}</p>
          </div>
          <p className={css.user}>{data.user.name}</p>
        </div>
      )}
    </Modal>
  );
}
