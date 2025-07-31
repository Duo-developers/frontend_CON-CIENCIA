import React, { useEffect } from 'react';
import { useArticlesWithComments } from '../../shared/hooks/useArticuleHome';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const CATEGORY_IMAGES = {
  'Biology': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1752967751/fondo_ubpgox.jpg',
  'Chemistry': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925664/imagen_2025-07-30_193418944_v0su64.png',
  'History': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925691/imagen_2025-07-30_193446898_fbxb3j.png',
  'Medicine': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925740/imagen_2025-07-30_193504785_texnit.png',
  'Astronomy': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925754/imagen_2025-07-30_193548709_p9gkxe.png',
  'Physics': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925783/imagen_2025-07-30_193617944_pqye9a.png',
  'Mathematics': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925857/imagen_2025-07-30_193656600_vyfzqa.png',
  'Technology': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925865/imagen_2025-07-30_193740034_bk2vcp.png',
  'Geology and Earth Sciences': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925881/imagen_2025-07-30_193756014_haebed.png',
  'Engineering': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753925945/imagen_2025-07-30_193855915_d109yw.png',
  'Other': 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1753926010/imagen_2025-07-30_194003683_odqc7d.png'
};

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dwc4ynoj9/image/upload/v1752967751/fondo_ubpgox.jpg';

export default function BlogPage() {
  const { articles, fetchArticles, loading, error } = useArticlesWithComments();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="text-gray-500">Cargando artículos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white text-gray-800 font-inter min-h-screen">
      <main className="container mx-auto px-6 py-12">
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Artículos Científicos Recientes
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explora publicaciones avanzadas escritas por investigadores, docentes y estudiantes.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((a) => {
            const category = a.category || 'Other';
            const image = CATEGORY_IMAGES[category] || a.images?.[0] || DEFAULT_IMAGE;
            const comments = a.comments?.length || 0;

            return (
              <ArticleCard
                key={a.aid}
                title={a.title}
                description={a.content}
                author={a.author?.name || 'Anónimo'}
                date={new Date(a.createdAt).toLocaleDateString()}
                category={category}
                image={image}
                videos={a.videos}
                comments={comments}
                onClick={() => navigate(`/article/${a.aid}`)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

function ArticleCard({ title, description, author, date, category, image, videos = [], comments, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
    >
      <div className="overflow-hidden">
        <img
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={image}
          alt="Imagen del artículo"
        />
      </div>
      <div className="p-5">
        <span className="text-sm font-semibold text-indigo-600 uppercase">{category}</span>
        <h3 className="text-2xl font-bold mt-2 mb-2 text-gray-900 line-clamp-2">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <p className="font-medium">{author}</p>
            <p>{date}</p>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} />
            <span>{comments}</span>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="mt-4 space-y-2">
            {videos.map((url, i) => (
              <div key={i} className="aspect-video w-full">
                <iframe
                  src={url}
                  title={`video-${i}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}