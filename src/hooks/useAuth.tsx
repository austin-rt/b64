import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS, BASE_URL } from '@/constants/consts';
import { IUserData } from '@/types/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setAuthenticatedUser } from '@/redux/UserSlice';
import { useCallback, useState } from 'react';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.UserSlice.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const getUser = useCallback(async () => {
    setLoading(true);
    if (user.name !== '') return;
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
  }, [dispatch, user.name]);

  return { getUser, loading, error };
};

export default useAuth;
