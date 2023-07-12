import axios from 'axios';

export const BASE_URL = 'https://pokeapi.co/api/v2/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const httpClient = {
  get(url: string, params?: Record<string, string>): Promise<any> {
    return axiosInstance.get(url, { params });
  },
  post(url: string, data: any, headers?: Record<string, string>): Promise<any> {
    return axiosInstance.post(url, data, { headers });
  },

  put(
    url: string,
    data: any,
    headers: Record<string, string> = { 'content-type': 'application/json' },
  ) {
    return axiosInstance.put(url, data, { headers });
  },
  delete(url: string) {
    return axiosInstance.delete(url);
  },
};
