import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getArticleById,
  getComments,
  postComment,
  editComment,
  deleteComment,
  getMyArticles
} from '../../services/api';

export const useArticleDetail = (articleId) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otherArticles, setOtherArticles] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getArticleById(articleId);
      setArticle(res.data.data);

      const commentsRes = await getComments(articleId);
      const commentsWithAuthor = commentsRes.data.comments.map(c => ({
        ...c,
        author: c.author || null
      }));
      setComments(commentsWithAuthor);

      const all = await getMyArticles();
      setOtherArticles(all.data.data.filter((a) => a.aid !== articleId));
      setError(null);
    } catch (error) {
      console.error('Error al cargar artículo o comentarios:', error);
      setError('Error al cargar el contenido');
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al iniciar
  useEffect(() => {
    fetchData();
  }, [articleId]);

  // Controlar auto-scroll para artículos relacionados
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollStep = container.offsetWidth * 0.48 + 32;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [otherArticles]);

  // Funciones para manejar comentarios
  const addComment = async (message) => {
    if (!message.trim()) return;
    try {
      await postComment(articleId, { message });
      await fetchData(); // Recargar comentarios
      return true;
    } catch (error) {
      console.error('Error al publicar comentario:', error);
      return false;
    }
  };

  const updateComment = async (commentId, message) => {
    if (!message.trim()) return false;
    try {
      await editComment(commentId, { message });
      await fetchData(); // Recargar comentarios
      return true;
    } catch (error) {
      console.error('Error al editar comentario:', error);
      return false;
    }
  };

  const removeComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      await fetchData(); // Recargar comentarios
      return true;
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      return false;
    }
  };

  const navigateToArticle = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return {
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
  };
};