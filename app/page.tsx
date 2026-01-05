'use client';

import { ChatKit, useChatKit } from '@openai/chatkit-react';
import type { ChatKitOptions } from '@openai/chatkit';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const options: ChatKitOptions = {
    api: {
      async getClientSecret(existing: any) {
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
    theme: {
      colorScheme: 'dark',
      radius: 'pill',
      density: 'normal',
      typography: {
        baseSize: 16,
        fontFamily: '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        fontFamilyMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
        fontSources: [
          {
            family: 'OpenAI Sans',
            src: 'https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2',
            weight: 400,
            style: 'normal',
            display: 'swap'
          }
          // ...and 7 more font sources
        ]
      }
    },
    composer: {
      attachments: {
        enabled: true,
        maxCount: 5,
        maxSize: 10485760
      },
      tools: [
        {
          id: 'search_docs',
          label: 'Search docs',
          shortLabel: 'Docs',
          placeholderOverride: 'Search documentation',
          icon: 'book-open',
          pinned: false
        }
      ],
    },
    startScreen: {
      greeting: '',
      prompts: [],
    },
  };

  const { control } = useChatKit(options);

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
