'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Cmd/Ctrl + K: Quick search (future feature)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Quick search triggered');
      }

      // G shortcuts (Gmail-style navigation)
      if (e.key === 'g') {
        const nextKey = new Promise<string>((resolve) => {
          const handler = (event: KeyboardEvent) => {
            resolve(event.key);
            window.removeEventListener('keydown', handler);
          };
          window.addEventListener('keydown', handler);
          setTimeout(() => {
            window.removeEventListener('keydown', handler);
            resolve('');
          }, 1000);
        });

        nextKey.then((key) => {
          switch (key) {
            case 'h':
              router.push('/dashboard');
              break;
            case 'g':
              router.push('/generate');
              break;
            case 't':
              router.push('/tracks');
              break;
            case 'c':
              router.push('/credits');
              break;
            case 'p':
              router.push('/profile');
              break;
          }
        });
      }

      // ? : Show keyboard shortcuts help
      if (e.key === '?') {
        e.preventDefault();
        showShortcutsHelp();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);
}

function showShortcutsHelp() {
  const shortcuts = `
Keyboard Shortcuts:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Navigation:
  g + h    →  Dashboard
  g + g    →  Generate Music
  g + t    →  My Tracks
  g + c    →  Credits
  g + p    →  Profile

Actions:
  ?        →  Show this help
  Esc      →  Close dialogs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
  alert(shortcuts);
}
