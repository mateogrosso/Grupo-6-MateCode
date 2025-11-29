const express = require('express');
const jwt = require('jsonwebtoken'); 


const User = require('../models/User');
const verifyToken = require('../middlewares/authMiddleware'); 

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'El email o nombre de usuario ya está en uso.' });
        }

        const newUser = await User.create({
            username,
            email,
            password, 
        });
        
        const token = generateToken(newUser._id);

        res.status(201).json({
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isValidPassword = await user.matchPassword(password); 
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = generateToken(user._id); 
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            },
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


router.get('/profile', verifyToken, async (req, res) => {
    try {
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