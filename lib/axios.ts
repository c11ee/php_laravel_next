// lib/axios.ts
import axios from "axios";
import { toast } from "sonner";

// 定义 API 响应类型
export interface ApiResponse<T = any> {
  code: 200 | 500;
  message: string;
  data: T;
}

// 创建 axios 实例
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加 token 到请求头
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 统一添加 proxy 前缀
    config.url = `/proxy/api${config.url}`;
    return config;
  },
  (error: any) => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    if (response.data.code == 200) {
      return response.data;
    } else {
      toast.error(response.data.msg);
      throw new Error(response.data.msg);
    }
  },
  (error: any) => {
    console.error("API 错误:", error);
    return Promise.reject(error);
  }
);

export default api;
