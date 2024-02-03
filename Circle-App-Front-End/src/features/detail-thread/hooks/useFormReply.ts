import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FormReply } from "../../../types/Replies";
import { ChangeEvent, useRef, useState } from "react";
import { API } from "../../../libs/api";

export function useCreateReply() {
  const { id } = useParams();
  const queryCient = useQueryClient();

  const [form, setForm] = useState<FormReply>({
    content: "",
    image: "",
    threadId: Number(id),
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
      formData.append("content", form.content);
      formData.append("threadId", form.threadId.toString());

      if (file) {
        formData.append("image", file as File);
      }
      return await API.post("/reply", formData);
    },
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ["thread"] });
      setForm({
        content: "",
        image: "",
        threadId: Number(id),
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
