import { useQuery } from '@tanstack/react-query';
import { User } from '../../../types/User';
import { API } from '../../../libs/api';

export default function useFollow() {
  const { data: User, isPending } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => await API.get('/users').then((res) => res.data),
  });
  return { User, isPending };
}

export function useFollowing() {
  const {
    data: userFollowData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await API.get('/users');
      return data;
    },
  });

  return { userFollowData, isLoading, error };
}
