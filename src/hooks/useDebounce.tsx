import { useEffect, useState } from 'react';

export function useDebouncedValue<T extends string | number>(
  value?: T,
  delay = 300,
): T | undefined {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (!value) return;
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
