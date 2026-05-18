import { useCallback, useState } from 'react';

function useToggle<T>(a: T, b: T): [T, () => void] {
  const [value, setValue] = useState<T>(a);
  const toggle = useCallback(() => setValue(v => (v === a ? b : a)), [a, b]);
  return [value, toggle];
}

export default useToggle;
