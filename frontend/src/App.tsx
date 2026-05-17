import { FC, useState } from 'react';
import Search from './components/Search';
import Sources from './components/Sources';

const App: FC = () => {
  const [query, setQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Search query={query} setQuery={setQuery} setSearchActive={setSearchActive} />
      {!searchActive && <Sources />}
    </div>
  );
};

export default App;
