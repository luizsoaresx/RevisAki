import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    if (email && password) {
      setUser({ email });
      return { success: true };
    } else {
      return { success: false, error: 'Dados inválidos' };
    }
  };

  const register = async (email, password) => {
    // aqui você faria uma chamada para o backend
    // por enquanto vamos simular um registro com sucesso
    if (email && password) {
      setUser({ email });
      return { success: true };
    } else {
      return { success: false, error: 'Preencha todos os campos' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook de acesso ao contexto
export const useAuth = () => useContext(AuthContext);
