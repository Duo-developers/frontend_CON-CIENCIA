import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getArticleById,
  getComments,
  postComment,
  editComment,
  deleteComment,
  getMyArticles
} from '../services/api';
import { MessageCircle, Edit2, Trash2, Save, X } from 'lucide-react';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(true);
  const [otherArticles, setOtherArticles] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getArticleById(id);
      setArticle(res.data.data);

      const commentsRes = await getComments(id);
      const commentsWithAuthor = commentsRes.data.comments.map(c => ({
        ...c,
        author: c.author || null
      }));
      setComments(commentsWithAuthor);

      const all = await getMyArticles();
      setOtherArticles(all.data.data.filter((a) => a.aid !== id));
    } catch (error) {
      console.error('Error al cargar artículo o comentarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await postComment(id, { message: newComment });
      setNewComment('');
      fetchData();
    } catch (error) {
      console.error('Error al publicar comentario:', error);
    }
  };

  const startEditing = (cid, currentText) => {
    setEditingId(cid);
    setEditingText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = async (cid) => {
    if (!editingText.trim()) return;
    try {
      await editComment(cid, { message: editingText });
      setEditingId(null);
      setEditingText('');
      fetchData();
    } catch (error) {
      console.error('Error al editar comentario:', error.response?.data || error.message);
    }
  };

  const handleDeleteComment = async (cid) => {
    try {
      await deleteComment(cid);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar comentario:', error.response?.data || error.message);
    }
  };

  if (loading) return <p className="p-8 text-gray-500">Cargando...</p>;
  if (!article) return <p className="p-8 text-red-500">Artículo no encontrado.</p>;

  return (
    <div className="bg-white min-h-screen px-6 md:px-20 py-12 text-gray-900 font-sans selection:bg-indigo-500 selection:text-white">
      <article className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold leading-snug text-indigo-700">{article.title}</h1>
        <p className="text-sm text-gray-500">Publicado el {new Date(article.createdAt).toLocaleDateString()}</p>
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

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-700">
            <MessageCircle size={28} /> Comentarios ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <p className="text-gray-500 italic">Sé el primero en comentar.</p>
          ) : (
            <ul className="space-y-6 mb-8">
              {comments.map((c) => (
                <li
                  key={c.cid}
                  className="bg-gray-100 border border-indigo-300 p-5 rounded-2xl shadow-sm relative group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center text-white font-bold uppercase select-none">
                      {c.author?.name?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-indigo-700">{c.author?.name || 'Usuario'}</p>
                      <p className="text-xs text-indigo-500 italic">{c.author?.perfil || 'Perfil no disponible'}</p>
                    </div>
                  </div>

                  {editingId === c.cid ? (
                    <>
                      <textarea
                        rows="3"
                        className="w-full p-3 rounded-lg bg-white border border-indigo-500 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <div className="mt-3 flex gap-4 justify-end">
                        <button
                          onClick={() => saveEdit(c.cid)}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                          title="Guardar"
                          type="button"
                        >
                          <Save size={16} /> Guardar
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex items-center gap-2 bg-gray-400 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg transition"
                          title="Cancelar"
                          type="button"
                        >
                          <X size={16} /> Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-900 text-justify whitespace-pre-wrap">{c.message}</p>
                      <p className="text-xs text-indigo-500 mt-2">{new Date(c.createdAt).toLocaleString()}</p>

                      <div className="absolute top-4 right-5 flex gap-3 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => startEditing(c.cid, c.message)}
                          className="text-indigo-600 hover:text-indigo-800"
                          title="Editar comentario"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c.cid)}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar comentario"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-4 mt-4">
            <textarea
              rows="3"
              placeholder="Escribe tu comentario..."
              className="w-full border border-indigo-500 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow font-semibold transition"
            >
              Publicar comentario
            </button>
          </form>
        </section>
      </article>

      {otherArticles.length > 0 && (
        <section className="max-w-6xl mx-auto mt-24">
          <h3 className="text-4xl font-extrabold text-center mb-12 text-indigo-700 tracking-wide drop-shadow-md">
            Más artículos
          </h3>
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-hidden px-2 py-4 relative"
            style={{ scrollBehavior: 'smooth' }}
          >
            {otherArticles.slice(0, 10).map((art) => (
              <div
                key={art.aid}
                onClick={() => navigate(`/article/${art.aid}`)}
                className="w-[48%] flex-shrink-0 bg-gradient-to-br from-indigo-100 via-indigo-300 to-indigo-200
                  rounded-3xl shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:rotate-3"
                title={art.title}
              >
                {art.images?.[0] && (
                  <img
                    src={art.images[0]}
                    alt={art.title}
                    className="rounded-t-3xl h-60 w-full object-cover border-b border-indigo-400"
                  />
                )}
                <div className="p-4 text-indigo-900">
                  <h4 className="font-semibold text-2xl mb-2 line-clamp-2">{art.title}</h4>
                  <p className="text-base line-clamp-3 leading-relaxed">{art.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}