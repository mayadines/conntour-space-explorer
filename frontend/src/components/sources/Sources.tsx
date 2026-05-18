import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Source } from '../../types';
import Spinner from '../ui/Spinner';
import SourceCard from './SourceCard';

const Sources: FC = () => {
  const [images, setImages] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    axios.get<Source[]>('/api/sources', { signal: controller.signal })
      .then(res => setImages(res.data))
      .catch(err => {
        if (!axios.isCancel(err)) setError('Failed to fetch space images');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NASA Space Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map(image => (
          <SourceCard key={image.id} source={image} />
        ))}
      </div>
    </div>
  );
};

export default Sources;
