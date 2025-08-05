export const validateName = (name) => {
    if (!name.trim()) return 'El nombre es obligatorio';
    if (name.length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if (name.length > 100) return 'El nombre no puede exceder los 100 caracteres';
    return '';
};

export const validateEmail = (email) => {
    if (!email.trim()) return 'El correo electrónico es obligatorio';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Por favor, introduce un correo electrónico válido';
    
    return '';
};

export const validateUsername = (username) => {
    if (!username.trim()) return 'El nombre de usuario es obligatorio';
    if (username.length < 3) return 'El nombre de usuario debe tener al menos 3 caracteres';
    if (username.length > 30) return 'El nombre de usuario no puede exceder los 30 caracteres';
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) return 'El nombre de usuario solo puede contener letras, números y guiones bajos';
    
    return '';
};