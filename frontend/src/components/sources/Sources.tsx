import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Source } from '../../types';
import SourceCard from './SourceCard';
import Spinner from '../ui/Spinner';

const Sources: FC = () => {
  const [images, setImages] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<Source[]>('/api/sources');
        setImages(response.data);
      } catch {
        setError('Failed to fetch space images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NASA Space Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <SourceCard key={image.id} source={image} />
        ))}
      </div>
    </div>
  );
};

export default Sources;
