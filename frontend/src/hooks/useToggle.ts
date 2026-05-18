import { useState } from 'react';

function useToggle<T>(a: T, b: T): [T, () => void] {
  const [value, setValue] = useState<T>(a);
  const toggle = () => setValue(v => (v === a ? b : a));
  return [value, toggle];
}

export default useToggle;
