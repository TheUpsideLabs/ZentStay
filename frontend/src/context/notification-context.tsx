"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import notificationService from "@/services/notification.service";
import { Notification } from "@/types/api/notification";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;

  refreshNotifications: () => Promise<void>;

  markAsRead: (
    notificationId: string
  ) => Promise<void>;

  markAllAsRead: () => Promise<void>;

  deleteNotification: (
    notificationId: string
  ) => Promise<void>;
}

const NotificationContext =
  createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // ==========================================
  // CHECK AUTH
  // ==========================================

  const checkAuthentication = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const accessToken =
      localStorage.getItem("accessToken");

    const user =
      localStorage.getItem("user");

    return Boolean(accessToken && user);
  }, []);

  // ==========================================
  // LOAD NOTIFICATIONS
  // ==========================================

  const refreshNotifications =
    useCallback(async () => {
      if (!checkAuthentication()) {
        setNotifications([]);
        return;
      }

      try {
        setLoading(true);

        const data =
          await notificationService.getMyNotifications();

        setNotifications(data);
      } catch (error) {
        console.error(
          "Failed to load notifications:",
          error
        );

        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }, [checkAuthentication]);

  // ==========================================
  // AUTH STATE CHECK
  // ==========================================

  useEffect(() => {
    const syncAuthState = () => {
      const authenticated =
        checkAuthentication();

      setIsAuthenticated(authenticated);

      if (!authenticated) {
        setNotifications([]);
      }
    };

    syncAuthState();

    window.addEventListener(
      "zentstay-auth-changed",
      syncAuthState
    );

    return () => {
      window.removeEventListener(
        "zentstay-auth-changed",
        syncAuthState
      );
    };
  }, [checkAuthentication]);

  // ==========================================
  // LOAD WHEN AUTHENTICATED
  // ==========================================

  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      return;
    }

    refreshNotifications();

    const interval =
      window.setInterval(() => {
        refreshNotifications();
      }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    isAuthenticated,
    refreshNotifications,
  ]);

  // ==========================================
  // UNREAD COUNT
  // ==========================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  // ==========================================
  // MARK ONE AS READ
  // ==========================================

  const markAsRead = useCallback(
    async (notificationId: string) => {
      const updated =
        await notificationService.markAsRead(
          notificationId
        );

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? updated
            : notification
        )
      );
    },
    []
  );

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const markAllAsRead =
    useCallback(async () => {
      await notificationService.markAllAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    }, []);

  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  const deleteNotification =
    useCallback(
      async (notificationId: string) => {
        await notificationService.deleteNotification(
          notificationId
        );

        setNotifications((current) =>
          current.filter(
            (notification) =>
              notification.id !==
              notificationId
          )
        );
      },
      []
    );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        refreshNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useNotifications() {
  const context =
    useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}