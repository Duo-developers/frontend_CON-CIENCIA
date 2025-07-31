import { useState } from 'react'; 
import {
  getMyArticles,
  getArticleById,
  getComments,
  postComment,
  editComment,
  deleteComment,
} from '../../services/api';

export const useArticlesWithComments = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await getMyArticles();
      setArticles(res.data.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al obtener artículos');
    } finally {
      setLoading(false);
    }
  };

  const selectArticle = async (id) => {
    setLoading(true);
    try {
      const res = await getArticleById(id);
      setSelectedArticle(res.data.data);
      await fetchComments(id);
    } catch (err) {
      console.error(err);
      setError('Error al obtener artículo');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (articleId) => {
    try {
      const res = await getComments(articleId);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err);
      setComments([]);
    }
  };

  const handleCommentSubmit = async (articleId, message) => {
    try {
      await postComment(articleId, { message });
      await fetchComments(articleId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = async (commentId, message) => {
    try {
      await editComment(commentId, { message });
      await fetchComments(selectedArticle.aid);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      await fetchComments(selectedArticle.aid);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    articles,
    selectedArticle,
    comments,
    loading,
    error,
    fetchArticles,
    selectArticle,
    handleCommentSubmit,
    handleEditComment,
    handleDeleteComment,
  };
};
