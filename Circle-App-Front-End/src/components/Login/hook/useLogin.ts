import { Userlogin } from '../../../types/User';
import { useState, ChangeEvent } from 'react';
import { API } from '../../../libs/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AUTH_CHECK, AUTH_LOGIN } from '../../../store/RootReducer';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<Userlogin>({
    email: '',
    password: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await API.post('/login', form);
      console.log(response.data);
      dispatch(AUTH_LOGIN(response.data));
      dispatch(AUTH_CHECK(response.data.user));

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return { form, handleChange, handleLogin };
}
