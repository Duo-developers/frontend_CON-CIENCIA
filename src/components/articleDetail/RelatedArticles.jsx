import React from 'react';

export const RelatedArticles = ({ articles, scrollRef, onArticleClick }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto mt-24">
      <h3 className="text-4xl font-extrabold text-center mb-12 text-indigo-700 tracking-wide drop-shadow-md">
        Más artículos
      </h3>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-hidden px-2 py-4 relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        {articles.slice(0, 10).map((article) => (
          <div
            key={article.aid}
            onClick={() => onArticleClick(article.aid)}
            className="w-[48%] flex-shrink-0 bg-gradient-to-br from-indigo-100 via-indigo-300 to-indigo-200
              rounded-3xl shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:rotate-3"
            title={article.title}
          >
            {article.images?.[0] && (
              <img
                src={article.images[0]}
                alt={article.title}
                className="rounded-t-3xl h-60 w-full object-cover border-b border-indigo-400"
              />
            )}
            <div className="p-4 text-indigo-900">
              <h4 className="font-semibold text-2xl mb-2 line-clamp-2">{article.title}</h4>
              <p className="text-base line-clamp-3 leading-relaxed">{article.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};