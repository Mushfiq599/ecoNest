"use client";

import { useMemo } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export function useApiClient() {
  const { getToken } = useAuth();

  return useMemo(() => {
    const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return instance;
  }, [getToken]);
}