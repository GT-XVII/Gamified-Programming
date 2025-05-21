// LoginForm.tsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("firebase_uid", userCredential.user.uid);
      onLoginSuccess();
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input name="email" type="email" placeholder="Email" className="p-2 border rounded-md" required />
      <input name="password" type="password" placeholder="Password" className="p-2 border rounded-md" required />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};