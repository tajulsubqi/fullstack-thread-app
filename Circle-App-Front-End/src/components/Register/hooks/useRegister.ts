import { useState, ChangeEvent } from "react";
import { UserRegister } from "../../../types/User";
import { API } from "../../../libs/api";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UserRegister>({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post("/register", form);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return { form, handleChange, handleRegister };
}
