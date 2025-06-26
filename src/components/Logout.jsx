// src/utils/logout.js (opsional)
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Berhasil logout");
    // Opsional: redirect ke halaman login atau landing
    window.location.href = "/login";
  } catch (error) {
    console.error("Gagal logout:", error.message);
  }
};
