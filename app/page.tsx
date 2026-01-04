'use client';

import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { control } = useChatKit({
    api: {
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #2a2a3e',
          backgroundColor: '#0f0f23'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: 0,
            color: '#ffffff'
          }}>
            ChatGPT Clone con ChatKit
          </h1>
        </div>
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <ChatKit 
            control={control} 
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>
    </main>
  );
}

