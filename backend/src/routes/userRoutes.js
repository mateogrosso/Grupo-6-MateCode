const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/usuarios/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifico si ya existe usuario o email
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'El email o nombre de usuario ya está en uso.' });
        }

        // Hasheo la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creo el usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Devolvuelvo datos sin password
        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// POST /api/usuarios/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Busco el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparo la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Genero el token
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respondo con token + algunos datos básicos
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


router.get('/profile', verifyToken, async (req, res) => {
    try {
        // req.user viene del middleware (payload del token)
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
