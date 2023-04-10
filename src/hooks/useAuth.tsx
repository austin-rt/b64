import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS, BASE_URL } from '@/constants/consts';
import { IUserData } from '@/types/interfaces';
import { useAppDispatch } from '@/redux/store';
import { setAuthenticatedUser } from '@/redux/UserSlice';
import { useState } from 'react';

const useAuth = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const getUser = async () => {
    setLoading(true);
    try {
      const { data }: AxiosResponse<IUserData> = await axios.get(
        `${BASE_URL.API}/${API_ENDPOINTS.AUTH.LOGIN.SUCCESS}`,
        {
          withCredentials: true
        }
      );
      if (data.user) {
        dispatch(setAuthenticatedUser({ user: data.user }));
      }
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  };

  return { getUser, loading, error };
};

export default useAuth;
