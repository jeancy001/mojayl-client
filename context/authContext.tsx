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

  // Méthodes d’authentification
  register: (data: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  // Mot de passe
  requestResetCode: (email: string) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;

  // Profil
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

  /** ----------------- CHARGER LA SESSION ----------------- */
  useEffect(() => {
    const chargerSession = async () => {
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

    chargerSession();
  }, []);

  /** ----------------- INSCRIPTION ----------------- */
  const register = async (data: any) => {
    const res = await axios.post(`${API_URL}/auth/register`, data);
    const { user, accessToken } = res.data;

    setUser(user);
    setAccessToken(accessToken);

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("accessToken", accessToken);
  };

  /** ----------------- CONNEXION ----------------- */
  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { user, accessToken } = res.data;

    setUser(user);
    setAccessToken(accessToken);

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("accessToken", accessToken);
  };

  /** ----------------- DÉCONNEXION ----------------- */
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.warn("Erreur lors de la déconnexion :", error);
    }

    setUser(null);
    setAccessToken(null);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("accessToken");
  };

  /** ----------------- DEMANDER UN CODE DE RÉINITIALISATION ----------------- */
  const requestResetCode = async (email: string) => {
    await axios.post(`${API_URL}/auth/request-code`, { email });
  };

  /** ----------------- VÉRIFIER LE CODE ----------------- */
  const verifyCode = async (code: string) => {
    await axios.post(`${API_URL}/auth/verify-code`, { code });
  };

  /** ----------------- RÉINITIALISER LE MOT DE PASSE ----------------- */
  const resetPassword = async (code: string, newPassword: string) => {
    await axios.post(`${API_URL}/auth/reset-password`, { code, newPassword });
  };

  /** ----------------- CHANGER LE MOT DE PASSE ----------------- */
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    await axios.put(
      `${API_URL}/auth/update-password`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  /** ----------------- METTRE À JOUR LE PROFIL ----------------- */
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

  /** ----------------- OBTENIR LES INFORMATIONS DE L’UTILISATEUR ----------------- */
  const getMe = async () => {
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setUser(res.data.user);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
  };

  /** ----------------- OBTENIR TOUS LES PROFILS ----------------- */
  const getProfiles = async () => {
    const res = await axios.get(`${API_URL}/auth/profiles`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.users;
  };

  /** ----------------- SUPPRIMER UN PROFIL ----------------- */
  const deleteProfile = async (id: string) => {
    await axios.delete(`${API_URL}/auth/profile/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  /** ----------------- RAFRAÎCHIR LE TOKEN ----------------- */
  const refreshToken = async () => {
    try {
      const res = await axios.post(`${API_URL}/auth/refresh`);
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
        getMe,
        getProfiles,
        deleteProfile,
        refreshToken,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé à l’intérieur de AuthProvider");
  return context;
};
