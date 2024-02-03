import { FormThread, IThreadCard } from '../../../types/Threads';
import { API } from '../../../libs/api';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AUTH_CHECK } from '../../../store/RootReducer';
import { useDispatch } from 'react-redux';

export function useThreads() {
  const [form, setForm] = useState<FormThread>({
    content: '',
    image: '',
  });
  const dispatch = useDispatch();

  const {
    data: Threads,
    isPending,
    refetch,
  } = useQuery<IThreadCard[]>({
    queryKey: ['thread'],
    queryFn: async () => await API.get('/threads').then((res) => res.data),
  });

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setForm({
      content: '',
      image: '',
    });
    const formData = new FormData();
    formData.append('content', form.content);
    formData.append('image', form.image as File);

    await API.post('/thread', formData);
    const response = await API.get('/auth/check');
    dispatch(AUTH_CHECK(response.data.user));

    refetch();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  return { form, Threads, handleChange, handlePost, isPending, fileInputRef, handleButtonClick };
}
