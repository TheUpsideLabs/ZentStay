import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";

const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise: Promise<string> | null =
  null;

function clearAuthStorage() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

// ========================================
// REQUEST INTERCEPTOR
// ========================================

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken =
        localStorage.getItem(
          "accessToken"
        );

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    // Only handle 401 errors.
    if (
      !originalRequest ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    // Never refresh the refresh request itself.
    if (
      originalRequest.url?.includes(
        "/auth/refresh"
      )
    ) {
      return Promise.reject(error);
    }

    // Don't retry the same request twice.
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const refreshToken =
      localStorage.getItem(
        "refreshToken"
      );

    console.log(
      "ZentStay: Access token expired/invalid. Refreshing..."
    );

    if (!refreshToken) {
      console.warn(
        "ZentStay: No refresh token found."
      );

      clearAuthStorage();

      return Promise.reject(error);
    }

    try {
      // ==================================
      // If another request is already
      // refreshing, wait for that request.
      // ==================================

      if (!refreshPromise) {
        console.log(
          "ZentStay: Calling /auth/refresh..."
        );

        refreshPromise = axios
          .post(
            `${env.apiUrl}/auth/refresh`,
            {
              refreshToken,
            },
            {
              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          )
          .then((response) => {
            const newAccessToken =
              response.data?.data
                ?.accessToken;

            if (!newAccessToken) {
              throw new Error(
                "Refresh endpoint did not return an access token."
              );
            }

            console.log(
              "ZentStay: Access token refreshed successfully."
            );

            localStorage.setItem(
              "accessToken",
              newAccessToken
            );

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      } else {
        console.log(
          "ZentStay: Waiting for existing refresh request..."
        );
      }

      const newAccessToken =
        await refreshPromise;

      // ==================================
      // Retry original request
      // ==================================

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      console.log(
        "ZentStay: Retrying original request..."
      );

      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        "ZentStay: Token refresh failed.",
        refreshError
      );

      clearAuthStorage();

      return Promise.reject(
        refreshError
      );
    }
  }
);

export default api;