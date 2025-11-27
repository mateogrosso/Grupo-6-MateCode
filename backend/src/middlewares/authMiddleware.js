const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifico que exista el header y empiece con "Bearer "
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        // Verifico el token
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            if (err) {
                return res.status(403).json({ message: 'Token inválido o expirado' });
            }

            // Guardo los datos del usuario en la request para usarlos en los controladores
            req.user = decodedPayload;

            next();
        });
    } else {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
};

module.exports = verifyToken;
