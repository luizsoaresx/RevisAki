import React, { useEffect, useState, createContext, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';

const scheme = 'revisaki'; // mesmo do app.json

// Discovery document da Google como exemplo
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Configure a requisição de login
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'SEU_CLIENT_ID_AQUI',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({ scheme }),
      responseType: 'code',
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      // Aqui você pode trocar o code por tokens no seu backend,
      // ou direto aqui se quiser (não recomendado colocar client_secret no app)
      // Exemplo simples:
      exchangeCodeAsync(code);
    }
  }, [response]);

  async function exchangeCodeAsync(code) {
    // Exemplo básico de troca de código por token usando fetch
    const tokenResponse = await fetch(discovery.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: 'SEU_CLIENT_ID_AQUI',
        grant_type: 'authorization_code',
        code,
        redirect_uri: AuthSession.makeRedirectUri({ scheme }),
      }).toString(),
    }).then(res => res.json());

    // Após receber o token, você pode buscar dados do usuário
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    }).then(res => res.json());

    setUser(userInfoResponse);
    router.replace('/'); // redireciona para home, por exemplo
  }

  return (
    <AuthContext.Provider value={{ user, promptAsync, request }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
