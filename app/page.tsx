'use client';

import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const domainPk = process.env.NEXT_PUBLIC_DOMAIN_PK;
  
  const { control } = useChatKit({
    api: {
      ...(domainPk && domainPk.trim() !== '' ? { domainKey: domainPk } : {}),
      async getClientSecret(existing) {
        if (existing) {
          // Para refrescar la sesión existente, puedes implementar lógica aquí
          // Por ahora, creamos una nueva sesión cada vez
        }

        try {
          const res = await fetch('/api/chatkit/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error('Error al crear sesión');
          }

          const { client_secret } = await res.json();
          return client_secret;
        } catch (error) {
          console.error('Error al obtener client_secret:', error);
          throw error;
        }
      },
    },
  });

  if (!mounted) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Cargando ChatKit...
      </div>
    );
  }

  return (
    <main style={{
      width: '100%',
      height: '100vh',
      margin: 0,
      padding: 0
    }}>
      <ChatKit 
        control={control} 
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </main>
  );
}

