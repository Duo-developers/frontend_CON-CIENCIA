import React from 'react';
import { ArticleContent } from './ArticleContent';
import { CommentSection } from './CommentSection';
import { RelatedArticles } from './RelatedArticles';

export const ArticleDetailContainer = ({
  article,
  comments,
  otherArticles,
  scrollRef,
  onAddComment,
  onUpdateComment,
  onDeleteComment,
  onArticleClick,
  loading,
  error
}) => {
  if (loading) return <p className="p-8 text-gray-500">Cargando...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!article) return <p className="p-8 text-red-500">Artículo no encontrado.</p>;

  return (
    <div className="bg-white min-h-screen px-6 md:px-20 py-12 text-gray-900 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <ArticleContent article={article} />
        <CommentSection 
          comments={comments} 
          onAddComment={onAddComment} 
          onUpdateComment={onUpdateComment} 
          onDeleteComment={onDeleteComment} 
        />
      </div>
      
      <RelatedArticles 
        articles={otherArticles} 
        scrollRef={scrollRef} 
        onArticleClick={onArticleClick} 
      />
    </div>
  );
};