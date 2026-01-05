'use client';

import { ChatKit, useChatKit } from '@openai/chatkit-react';
import type { ChatKitOptions } from '@openai/chatkit';
import { useEffect, useState, useMemo, useRef } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Ajustar posición del botón dinámicamente
  useEffect(() => {
    if (!mounted) return;

    const updateButtonPosition = () => {
      const button = themeButtonRef.current;
      if (!button) return;

      // Buscar el botón de nuevo chat primero (buscar por varios selectores posibles)
      const allButtons = Array.from(document.querySelectorAll('button'));
      const newChatButton = allButtons.find(btn => {
        const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';
        const text = btn.textContent?.toLowerCase() || '';
        return ariaLabel.includes('new chat') || 
               ariaLabel.includes('nuevo chat') || 
               ariaLabel.includes('new') && ariaLabel.includes('chat') ||
               text.includes('new') && text.includes('chat');
      }) as HTMLElement | undefined;
      
      if (newChatButton && newChatButton.offsetParent !== null) {
        // Si el botón de nuevo chat existe y está visible, posicionar a la izquierda de él
        const rect = newChatButton.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const spacing = 8; // Espaciado entre botones
        const buttonWidth = buttonRect.width || 38; // Ancho aproximado si no está disponible
        
        // Posicionar a la izquierda del nuevo chat (más a la derecha en pantalla)
        button.style.right = `${window.innerWidth - rect.left + spacing + buttonWidth}px`;
        button.style.top = `${rect.top + (rect.height - buttonRect.height) / 2}px`;
        return;
      }

      // Si no hay botón de nuevo chat, buscar el reloj (history/clock icon)
      // Buscar botones con iconos de reloj/historial
      const clockButton = allButtons.find(btn => {
        // Excluir nuestro propio botón de tema
        if (btn === button) return false;
        const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';
        const svg = btn.querySelector('svg');
        // Buscar por aria-label o por SVG con viewBox característico de reloj
        return ariaLabel.includes('history') || 
               ariaLabel.includes('historial') ||
               (svg && (svg.getAttribute('viewBox')?.includes('20') || svg.querySelector('circle')));
      }) as HTMLElement | undefined;
      
      if (clockButton && clockButton.offsetParent !== null) {
        // Posicionar a la izquierda del reloj (un poco a la izquierda)
        const rect = clockButton.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const spacing = 8;
        const buttonWidth = buttonRect.width || 38;
        
        button.style.right = `${window.innerWidth - rect.left + spacing + buttonWidth}px`;
        button.style.top = `${rect.top + (rect.height - buttonRect.height) / 2}px`;
        return;
      }

      // Fallback: posición por defecto
      button.style.right = '16px';
      button.style.top = '16px';
    };

    // Actualizar posición inicial
    const timeoutId = setTimeout(updateButtonPosition, 100);

    // Observar cambios en el DOM
    const observer = new MutationObserver(() => {
      updateButtonPosition();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // También escuchar eventos de scroll y resize
    window.addEventListener('resize', updateButtonPosition);
    window.addEventListener('scroll', updateButtonPosition);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', updateButtonPosition);
      window.removeEventListener('scroll', updateButtonPosition);
    };
  }, [mounted]);

  const baseOptions: Omit<ChatKitOptions, 'theme'> = useMemo(() => ({
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
  }), []);

  const options: ChatKitOptions = useMemo(() => ({
    ...baseOptions,
    theme: {
      colorScheme,
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
  }), [baseOptions, colorScheme]);

  const { control } = useChatKit(options);

  const toggleTheme = () => {
    setColorScheme((prev: 'light' | 'dark') => prev === 'dark' ? 'light' : 'dark');
  };

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
        position: 'relative',
      }}
    >
      <button
        ref={themeButtonRef}
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          transition: 'background-color 0.2s, right 0.3s ease, top 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
        }}
        aria-label={colorScheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        <img
          src={colorScheme === 'dark' ? '/light.svg' : '/dark.svg'}
          alt={colorScheme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          width={22}
          height={22}
        />
      </button>
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


