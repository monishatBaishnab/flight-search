/* eslint-disable @typescript-eslint/no-explicit-any */

// Simple function-based approach
export const logger = {
  log: (...args: any[]) => {
    if (import.meta.env.VITE_NODE_ENV !== 'production') {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (import.meta.env.VITE_NODE_ENV !== 'production') {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (import.meta.env.VITE_NODE_ENV !== 'production') {
      console.warn(...args);
    }
  },
  info: (...args: any[]) => {
    if (import.meta.env.VITE_NODE_ENV !== 'production') {
      console.info(...args);
    }
  },
};
