import axios from 'axios';
import { IRequestOptionsAxios } from '~/utils/request';

const axiosInstance = axios.create();

axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  (config: IRequestOptionsAxios): IRequestOptionsAxios => {
    const headers = {
      ...config?.headers,
    };

    return {
      ...config,
      headers: {
        ...(!config.excludeBaseHeader ? headers : {}),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
