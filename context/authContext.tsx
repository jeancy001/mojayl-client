import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import axios from "axios";
import { API_URL } from "@/constants/Api_url";

interface User {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  tel?: string;
  profileUrl?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;

  // Auth methods
  register: (data: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  // Password methods
  requestResetCode: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;

  // Profile methods
  updateProfile: (updates: Partial<User>, file?: any) => Promise<void>;
  getMe: () => Promise<void>;
  getProfiles: () => Promise<User[]>;
  deleteProfile: (id: string) => Promise<void>;

  // Tokens
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  // Restore session on app start
  useEffect(() => {
    const loadSession = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const savedToken = await AsyncStorage.getItem("accessToken");
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setAccessToken(savedToken);
      }
      setLoading(false);
    };
    loadSession();
  }, []);

  /** ----------------- REGISTER ----------------- */
  const register = async (data: any) => {
    const res = await axios.post(`${API_URL}/auth/register`, data, { withCredentials: true });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
  };

  /** ----------------- LOGIN ----------------- */
  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
  };

  /** ----------------- LOGOUT ----------------- */
  const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
  };

  /** ----------------- REQUEST RESET CODE ----------------- */
  const requestResetCode = async (email: string) => {
    await axios.post(`${API_URL}/auth/request-code`, { email });
  };

  /** ----------------- RESET PASSWORD ----------------- */
  const resetPassword = async (email: string, code: string, newPassword: string) => {
    await axios.post(`${API_URL}/auth/reset-password`, { email, code, newPassword });
  };

  /** ----------------- UPDATE PASSWORD ----------------- */
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    await axios.put(
      `${API_URL}/auth/update-password`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  /** ----------------- UPDATE PROFILE ----------------- */
  const updateProfile = async (updates: Partial<User>, file?: any) => {
    const formData = new FormData();
    Object.entries(updates).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (file) {
      formData.append("profileImage", {
        uri: file.uri,
        name: file.name || "profile.jpg",
        type: file.type || "image/jpeg",
      } as any);
    }

    const res = await axios.put(`${API_URL}/auth/profile`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setUser(res.data.user);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
  };

  /** ----------------- GET ME ----------------- */
  const getMe = async () => {
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setUser(res.data.user);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
  };

  /** ----------------- GET PROFILES ----------------- */
  const getProfiles = async () => {
    const res = await axios.get(`${API_URL}/auth/profiles`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.users;
  };

  /** ----------------- DELETE PROFILE ----------------- */
  const deleteProfile = async (id: string) => {
    await axios.delete(`${API_URL}/auth/profile/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  /** ----------------- REFRESH TOKEN ----------------- */
  const refreshToken = async () => {
    const res = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
    setAccessToken(res.data.accessToken);
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        register,
        login,
        logout,
        requestResetCode,
        resetPassword,
        updatePassword,
        updateProfile,
        getMe,
        getProfiles,
        deleteProfile,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
