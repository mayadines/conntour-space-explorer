import { FC } from 'react';
import Navbar from '../components/ui/Navbar';
import Search from '../components/sources/Search';
import Sources from '../components/sources/Sources';

const Home: FC = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <Search />
    <Sources />
  </div>
);

export default Home;
