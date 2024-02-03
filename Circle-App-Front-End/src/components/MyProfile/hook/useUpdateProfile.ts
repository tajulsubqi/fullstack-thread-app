 import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { API } from "../../../libs/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/type/RootState";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../../store/RootReducer";
import { useNavigate } from "react-router-dom";

export function useUpdateProfile() {
  const auth = useSelector((state: RootState) => state.auth);
  const id = Number(auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [profile, setProfile] = useState({
    full_name: auth.full_name || "",
    username: auth.username || "",
    email: auth.email || "",
    bio: auth.bio || "",
    photo_profile: auth.photo_profile || "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await API.patch(`/user/${id}`, profile);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));

      console.log("The update was successful");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    profile,
    setProfile,
    mutate,
    isPending,
    handleChange,
  };
}
