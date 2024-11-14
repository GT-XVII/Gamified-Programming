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
      onRegisterSuccess();
    } catch (err) {
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