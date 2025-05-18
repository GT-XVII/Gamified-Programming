// RegisterForm.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      if (!user) throw new Error("No user found after registration.");

      const response = await fetch("http://127.0.0.1:5050/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebase_uid: user.uid,
          email: user.email,
          username: user.email?.split("@")[0] || "new_user"
        })
      });

      if (!response.ok) {
        const resText = await response.text();
        console.error("Supabase user creation failed:", resText);
        throw new Error("Failed to create Supabase user.");
      }

      onRegisterSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input name="email" type="email" placeholder="Email" className="p-2 border rounded-md" required />
      <input name="password" type="password" placeholder="Password" className="p-2 border rounded-md" required />
      <button type="submit" className="p-2 bg-green-500 text-white rounded-md">Register</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};