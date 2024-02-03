import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import { API } from '../../../libs/api';
import { FormThread } from '../../../types/Threads';

export function useThread() {

  const queryCient = useQueryClient();

  const [form, setForm] = useState<FormThread>({
    content: '',
    image: '',
  });

  const [file, setFile] = useState<File | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setFile(files[0]);
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

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('content', form.content);
      formData.append('image', form.image as File);
  
      if (file) {
        formData.append('image', file as File);
      }
      return await API.post('/thread', formData);
    },
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ['thread'] });
      setForm({
        content: '',
        image: '',
      });
      setFile(null);
    },
    onError: () => {
      console.log(Error);
    },
  });

  return {
    form,
    handleChange,
    handleButtonClick,
    fileInputRef,
    mutate,
    isPending,
  };
}
