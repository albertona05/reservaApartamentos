const esEmailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const esPasswordValido = (password) => password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);

module.exports = { esEmailValido, esPasswordValido };
