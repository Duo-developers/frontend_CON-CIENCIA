import { useState, useEffect } from 'react';
import { getMyArticles, createArticle, updateArticle, deleteArticle } from '../../services/api';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await getMyArticles();
      setArticles(response.data.data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    const res = await createArticle(data);
    await fetchArticles();
    return res;
  };

  const update = async (id, data) => {
    await updateArticle(id, data);
    await fetchArticles();
  };

  const remove = async (id) => {
    await deleteArticle(id);
    await fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, create, update, remove };
};