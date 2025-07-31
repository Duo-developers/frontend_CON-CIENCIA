import React from 'react';

export const ArticleContent = ({ article }) => {
  if (!article) return null;

  return (
    <article className="space-y-6">
      <h1 className="text-5xl font-extrabold leading-snug text-indigo-700">{article.title}</h1>
      <p className="text-sm text-gray-500">
        Publicado el {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <p className="text-md text-gray-700 mb-6">
        Por <span className="font-semibold text-indigo-600">{article.author?.name || 'Anónimo'}</span>
      </p>

      {article.images?.[0] && (
        <img
          src={article.images[0]}
          alt="Imagen del artículo"
          className="rounded-xl shadow-xl w-full object-cover max-h-[400px] border border-indigo-300"
        />
      )}

      <div className="text-justify text-lg text-gray-700 whitespace-pre-wrap leading-relaxed mt-6 tracking-wide">
        {article.content}
      </div>

      {article.videos?.length > 0 && (
        <div className="space-y-6 mt-8">
          {article.videos.map((url, i) => (
            <div key={i} className="aspect-video w-full rounded-lg overflow-hidden shadow-md border border-indigo-400">
              <iframe
                src={url}
                title={`video-${i}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};