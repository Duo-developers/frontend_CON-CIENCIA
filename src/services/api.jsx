import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/conciencia/v1/',
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("usuario");
        if (userDetails) {
            try {
                const userData = JSON.parse(userDetails);
                if (userData && userData.token) {
                    config.headers.Authorization = `Bearer ${userData.token}`;
                    console.log("Token añadido a la solicitud:", userData.token.substring(0, 15) + '...');
                } else {
                    console.log("No se encontró token en los datos del usuario");
                }
            } catch (error) {
                console.error("Error al procesar datos de usuario para token:", error);
            }
        }
        return config;
    },
    (e) => Promise.reject(e)
);
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('usuario');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// --- Funciones de Autenticación ---

export const login = async (data) => {
    return await apiClient.post('/auth/login', data);
}

export const register = async (data) => {
    return await apiClient.post('/auth/register', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

// --- Funciones de Usuario ---

/**
 * Obtiene los datos del usuario actualmente autenticado.
 * Llama al endpoint `/user/me` que es manejado por el controlador `getUserLogged` en el backend.
 * @returns {Promise} La promesa con la respuesta del API que contiene los datos del usuario.
 */
export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get('/user/me');
        console.log("Respuesta de getCurrentUser:", response.data);
        return response;
    } catch (error) {
        console.error("Error en getCurrentUser:", error);
        throw error;
    }
}



// Artículos
export const createArticle = (data) => apiClient.post('/article', data);
export const getMyArticles = () => apiClient.get('/article'); // singular
export const getArticleById = (id) => apiClient.get(`/article/${id}`);
export const updateArticle = (id, data) => apiClient.put(`/article/${id}`, data);
export const deleteArticle = (id) => apiClient.delete(`/article/${id}`);

// Eventos
export const createEvent = (data) => apiClient.post('/event', data);
export const getMyEvents = () => apiClient.get('/event'); // singular
export const getEventById = (id) => apiClient.get(`/event/${id}`);
export const updateEvent = (id, data) => apiClient.put(`/event/${id}`, data);
export const deleteEvent = (id) => apiClient.delete(`/event/${id}`);

// Comentarios
export const getComments = (articleId) => apiClient.get(`/comment/article/${articleId}`);
export const postComment = (articleId, data) => apiClient.post(`/comment/${articleId}`, data);
export const editComment = (commentId, data) => apiClient.put(`/comment/${commentId}`, data);
export const deleteComment = (commentId) => apiClient.delete(`/comment/${commentId}`);