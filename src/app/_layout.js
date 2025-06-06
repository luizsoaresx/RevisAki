import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function ProtectedLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  if (!user) return null;

  return children;
}
