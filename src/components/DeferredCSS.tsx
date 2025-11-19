"use client";

import { useEffect } from 'react';

export default function DeferredCSS() {
  useEffect(() => {
    // Importar globals.css de forma assíncrona após o carregamento inicial
    import('../../app/globals.css');
  }, []);

  return null;
}
