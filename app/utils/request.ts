import { AxiosRequestConfig } from 'axios';
import QueryString from 'qs';
import { config } from '~/config';
import axiosInstance from '~/utils/api';

export interface IRequestOptionsAxios extends AxiosRequestConfig {
  excludeBaseHeader?: boolean;
}

export interface IRequestOptions extends RequestInit {
  params?: object;
  excludeBaseHeader?: boolean;
}

export const httpRequest = async <Data>(completeUrl: string, options?: IRequestOptionsAxios): Promise<Data> => {
  const { data } = await axiosInstance.request<Data>({
    ...(options ?? {}),
    paramsSerializer: (params) => {
      return QueryString.stringify(params, { arrayFormat: 'brackets' });
    },
    headers: {
      ...options?.headers,
    },
    url: completeUrl,
  });

  return data;
};

export const elrondHttpRequest = async <Data>(resource: string, options?: IRequestOptionsAxios): Promise<Data> => {
  return httpRequest(`${config.elrondApiUrl}/${resource}`, options);
};
