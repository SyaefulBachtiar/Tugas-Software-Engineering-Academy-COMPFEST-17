import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config"; // sesuaikan path
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard(){
const [role, setRole] = useState(null);
const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);

      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setRole(userData.role); // "admin" atau "user"
      } else {
        console.warn("Dokumen user tidak ditemukan.");
      }
    } else {
      setUser(null);
      setRole(null);
    }
  });

  return () => unsubscribe();
}, []);
return (
  <>
    {role === "admin" && (
        <AdminDashboard />
    )}

    {role === "user" && (
      <UserDashboard />
    )}
  </>
);


}