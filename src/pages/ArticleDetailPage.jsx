import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticleDetail } from '../shared/hooks/useArticleDetail';
import { ArticleDetailContainer } from '../components/articleDetail/ArticleDetailContainer';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const {
    article,
    comments,
    otherArticles,
    loading,
    error,
    scrollRef,
    addComment,
    updateComment,
    removeComment,
    navigateToArticle
  } = useArticleDetail(id);

  return (
    <ArticleDetailContainer
      article={article}
      comments={comments}
      otherArticles={otherArticles}
      scrollRef={scrollRef}
      onAddComment={addComment}
      onUpdateComment={updateComment}
      onDeleteComment={removeComment}
      onArticleClick={navigateToArticle}
      loading={loading}
      error={error}
    />
  );
}