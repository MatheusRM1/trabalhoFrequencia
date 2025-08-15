import { useEffect } from 'react';

type RefreshCallback = () => void;

let refreshCallbacks: RefreshCallback[] = [];

export const triggerGlobalRefresh = () => {
  refreshCallbacks.forEach(callback => {
    try {
      callback();
    } catch (error) {
      console.error('Erro ao executar callback de refresh:', error);
    }
  });
};

export function useGlobalRefresh(callback: RefreshCallback) {
  useEffect(() => {
    refreshCallbacks.push(callback);
    
    return () => {
      refreshCallbacks = refreshCallbacks.filter(cb => cb !== callback);
    };
  }, [callback]);
}
