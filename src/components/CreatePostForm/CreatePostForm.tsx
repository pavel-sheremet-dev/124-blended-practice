import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./CreatePostForm.module.css";
import { PostFormData } from "../../types/post";
import { createPost } from "../../services/postService";

const initialValues: PostFormData = { title: "", body: "" };

interface CreatePostFormProps {
  onClose: () => void;
}

export default function CreatePostForm({ onClose }: CreatePostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onClose();
    },
  });

  const handleSubmit = (values: PostFormData, actions: FormikHelpers<PostFormData>) => {
    console.log(values);
    mutation.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
