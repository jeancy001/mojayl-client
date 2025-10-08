import { API_URL } from "@/constants/Api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

/** ---------- TYPES ---------- */
export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  address: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
  profileUrl: string;
}

export interface UserProfileResponse {
  success: boolean;
  message?: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;

  register: (data: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  requestResetCode: (email: string) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;

  updateProfile: (updates: Partial<User>, file?: any) => Promise<void>;
  getProfiles: () => Promise<User[]>;
  deleteProfile: (id: string) => Promise<void>;
  refreshToken: () => Promise<void>;
}

/** ---------- CONTEXTE ---------- */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** ---------- PROVIDER ---------- */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /** ----------------- CHARGER LA SESSION ----------------- */
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedToken = await AsyncStorage.getItem("accessToken");

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          setAccessToken(savedToken);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la session :", error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  /** ----------------- FETCH FULL USER (Middleware) ----------------- */
  const fetchUserMiddleware = async (token: string) => {
    try {
      const res = await axios.get<UserProfileResponse>(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success && res.data.user) {
        const fullUser = res.data.user;
        setUser(fullUser);
        await AsyncStorage.setItem("user", JSON.stringify(fullUser));

        // Optionally update accessToken if API provides
        if (fullUser.refreshToken) {
          setAccessToken(fullUser.refreshToken);
          await AsyncStorage.setItem("accessToken", fullUser.refreshToken);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du middleware user:", error);
    }
  };

  /** ----------------- INSCRIPTION ----------------- */
  const register = async (data: any) => {
    const res = await axios.post<{ accessToken: string }>(`${API_URL}/auth/register`, data);
    const token = res.data.accessToken;

    setAccessToken(token);
    await AsyncStorage.setItem("accessToken", token);

    // Middleware: fetch full user info after token is set
    await fetchUserMiddleware(token);
  };

  /** ----------------- CONNEXION ----------------- */
  const login = async (email: string, password: string) => {
    const res = await axios.post<{ accessToken: string }>(`${API_URL}/auth/login`, { email, password });
    const token = res.data.accessToken;

    setAccessToken(token);
    await AsyncStorage.setItem("accessToken", token);

    // Middleware: fetch full user info silently
    await fetchUserMiddleware(token);
  };

  /** ----------------- DÉCONNEXION ----------------- */
  const logout = async () => {
    try {
      if (accessToken) {
        await axios.post(`${API_URL}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
    } catch (error) {
      console.warn("Erreur lors de la déconnexion :", error);
    }

    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
  };

  /** ----------------- MOT DE PASSE ----------------- */
  const requestResetCode = async (email: string) => {
    await axios.post(`${API_URL}/auth/request-code`, { email });
  };

  const verifyCode = async (code: string) => {
    await axios.post(`${API_URL}/auth/verify-code`, { code });
  };

  const resetPassword = async (code: string, newPassword: string) => {
    await axios.post(`${API_URL}/auth/reset-password`, { code, newPassword });
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!accessToken) return;
    await axios.put(`${API_URL}/auth/update-password`, { currentPassword, newPassword }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

//** ----------------- PROFIL ----------------- */
const updateProfile = async (
  updates: Partial<User> = {},
  file?: { uri: string; name: string; type: string }
) => {
  if (!accessToken) {
    console.warn("❌ No access token available");
    return;
  }

  try {
    const formData = new FormData();

    // 🧩 Add text fields (username, email, etc.)
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // 🖼️ Add image file if provided
    if (file) {
      formData.append("profileImage", {
        uri: file.uri,
        name: file.name || "profile.jpg",
        type: file.type || "image/jpeg",
      } as any);
    }

    console.log("📤 Sending profile update:", formData);

    // 🚀 Send request to backend
    const res = await axios.put<UserProfileResponse>(
      `${API_URL}/auth/update-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 💾 Save user to AsyncStorage if successful
    if (res.data.success && res.data.user) {
      setUser(res.data.user);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("✅ Profil mis à jour avec succès :", res.data.user);
    } else {
      console.warn("⚠️ Réponse inattendue :", res.data);
    }
  } catch (error: any) {
    console.error("❌ Erreur lors de la mise à jour du profil :", error.message);
    if (error.response) {
      console.error("🧾 Détails de l’erreur :", error.response.data);
    }
    throw error;
  }
};



  const getProfiles = async () => {
    if (!accessToken) return [];
    const res = await axios.get<{ users: User[] }>(`${API_URL}/auth/profiles`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.users;
  };

  const deleteProfile = async (id: string) => {
    if (!accessToken) return;
    await axios.delete(`${API_URL}/auth/profile/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  /** ----------------- RAFRAÎCHIR LE TOKEN ----------------- */
  const refreshToken = async () => {
    try {
      const res = await axios.post<{ accessToken: string }>(`${API_URL}/auth/refresh`);
      setAccessToken(res.data.accessToken);
      await AsyncStorage.setItem("accessToken", res.data.accessToken);
    } catch (error) {
      console.warn("Impossible de rafraîchir le token :", error);
      await logout();
    }
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
        verifyCode,
        resetPassword,
        updatePassword,
        updateProfile,
        getProfiles,
        deleteProfile,
        refreshToken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

/** ---------- HOOK PERSONNALISÉ ---------- */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé à l’intérieur de AuthProvider");
  return context;
};
