import React, { useState } from 'react';
import { MessageCircle, Edit2, Trash2, Save, X } from 'lucide-react';

export const CommentSection = ({ comments, onAddComment, onUpdateComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (await onAddComment(newComment)) {
      setNewComment('');
    }
  };

  const startEditing = (commentId, currentText) => {
    setEditingId(commentId);
    setEditingText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = async (commentId) => {
    if (await onUpdateComment(commentId, editingText)) {
      setEditingId(null);
      setEditingText('');
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-700">
        <MessageCircle size={28} /> Comentarios ({comments.length})
      </h2>

      {comments.length === 0 ? (
        <p className="text-gray-500 italic">Sé el primero en comentar.</p>
      ) : (
        <ul className="space-y-6 mb-8">
          {comments.map((comment) => (
            <li
              key={comment.cid}
              className="bg-gray-100 border border-indigo-300 p-5 rounded-2xl shadow-sm relative group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center text-white font-bold uppercase select-none">
                  {comment.author?.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-indigo-700">{comment.author?.name || 'Usuario'}</p>
                  <p className="text-xs text-indigo-500 italic">
                    {comment.author?.perfil || 'Perfil no disponible'}
                  </p>
                </div>
              </div>

              {editingId === comment.cid ? (
                <>
                  <textarea
                    rows="3"
                    className="w-full p-3 rounded-lg bg-white border border-indigo-500 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className="mt-3 flex gap-4 justify-end">
                    <button
                      onClick={() => saveEdit(comment.cid)}
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
                  <p className="text-gray-900 text-justify whitespace-pre-wrap">{comment.message}</p>
                  <p className="text-xs text-indigo-500 mt-2">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>

                  <div className="absolute top-4 right-5 flex gap-3 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => startEditing(comment.cid, comment.message)}
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Editar comentario"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteComment(comment.cid)}
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
  );
};