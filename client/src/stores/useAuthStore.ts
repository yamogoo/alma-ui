import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { z } from "zod";

import { useTypedLocalStorage } from "@/composables";

import type { ServerResponseError } from "@/typings";

const LoginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    email: z.string(),
  }),
});

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${API_URL}/api`;

export const useAuthStore = defineStore("auth-store", () => {
  const isLoggedIn = computed(() => !!user.value);
  const isLoading = ref(false);
  const error = ref<ServerResponseError>(null);
  const token = useTypedLocalStorage("AUTH_TOKEN", "");
  const user = useTypedLocalStorage("AUTH_USER", "");

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const data = LoginResponseSchema.parse(response.data);

      user.value = email;

      token.value = data.token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        console.error("Zod validation error:", err.issues);
        error.value = "Error validating response from server.";
      } else if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
        error.value =
          err.response?.data?.message || "Authorization error. Try again.";
      } else {
        console.error("Unexpected error:", err);
        error.value = "Unexpected error.";
      }
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;

    delete axios.defaults.headers.common["Authorization"];
  };

  const initializeAuth = (): void => {
    const authToken = localStorage.getItem("auth_token");
    const userJson = localStorage.getItem("auth_user");

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        token.value = authToken;
        user.validation = userJson;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        console.warn("Failed to restore session from localStorage");
      }
    }
  };

  return {
    user,
    token,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    initializeAuth,
  };
});
