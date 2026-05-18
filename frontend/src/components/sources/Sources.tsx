import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { fetchSources } from '../../api/sources';
import { Source } from '../../types';
import Pagination from '../ui/Pagination';
import Spinner from '../ui/Spinner';
import SourceCard from './SourceCard';

const PAGE_SIZE = 6;

const Sources: FC = () => {
  const [images, setImages] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    fetchSources(controller.signal)
      .then(data => setImages(data))
      .catch(err => {
        if (!axios.isCancel(err)) setError('Failed to fetch space images');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  const pageImages = images.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NASA Space Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageImages.map(image => (
          <SourceCard key={image.id} source={image} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(p => p - 1)}
        onNext={() => setPage(p => p + 1)}
      />
    </div>
  );
};

export default Sources;
