import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

import type { ServerResponseError } from "@/typings";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${API_URL}/api`;

export const useAuthStore = defineStore("auth-store", () => {
  const user = ref<{ email: string } | null>(null);
  const isLoading = ref(false);
  const error = ref<ServerResponseError>(null);

  const isInitialized = ref(false);

  const isLoggedIn = computed(() => isInitialized.value && !!user.value);

  const setUser = (userData: { email: string } | null) => {
    user.value = userData;
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      const meResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });

      setUser({ email: meResponse.data.email });
      isInitialized.value = true;
    } catch (err: any) {
      console.error(err);
      error.value =
        err.response?.data?.message || "Authorization error. Try again.";
      setUser(null);
      isInitialized.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout failed", err);
    } finally {
      setUser(null);
      isInitialized.value = true;
    }
  };

  const initializeAuth = async () => {
    isLoading.value = true;
    try {
      const res = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      setUser({ email: res.data.email });
    } catch {
      setUser(null);
    } finally {
      isLoading.value = false;
      isInitialized.value = true;
    }
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    initializeAuth,
  };
});
