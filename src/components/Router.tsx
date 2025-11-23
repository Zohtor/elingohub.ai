import { useState, useEffect, ReactNode } from 'react';

export function Router({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setLocation(window.location.pathname);
    };

    window.addEventListener('popstate', handler);
    window.addEventListener('pushstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
      window.removeEventListener('pushstate', handler);
    };
  }, []);

  return <>{children}</>;
}

export function Route({ path, children }: { path: string; children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handler);

    const pushState = window.history.pushState;
    window.history.pushState = function(...args) {
      pushState.apply(window.history, args);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return () => {
      window.removeEventListener('popstate', handler);
      window.history.pushState = pushState;
    };
  }, []);

  const pathMatch = (pattern: string, current: string): boolean => {
    if (pattern === current) return true;

    const patternParts = pattern.split('/');
    const currentParts = current.split('/');

    if (patternParts.length !== currentParts.length) return false;

    return patternParts.every((part, i) => {
      if (part.startsWith(':')) return true;
      return part === currentParts[i];
    });
  };

  return pathMatch(path, currentPath) ? <>{children}</> : null;
}
