'use client';

import { ChatKit, useChatKit } from '@openai/chatkit-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        try {
          const res = await fetch('/api/chatkit/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) throw new Error('Error al crear sesión');

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
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '100vw',
          height: '100vh',
          margin: 0,
        }}
      >
        Cargando ChatKit...
      </div>
    );
  }

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <ChatKit
        control={control}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 0,
        }}
      />
    </main>
  );
}
