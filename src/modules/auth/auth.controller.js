import bcrypt from 'bcrypt';
import db from '../../models/index.js';
import  jwt  from 'jsonwebtoken';

const { User, Role } = db;

export const register = async (req, res, next) => {
    try {
        const { name, email, password, provider } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const roleId = await Role.findOne({ where: { name: 'user' }, attributes: ['id'] });

        const existingUser = await User.findOne({ where: { email, role_id: roleId?.id }, attributes: ['id'], raw: true,});
        if (existingUser?.id) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role_id: roleId?.id,
            provider: provider || 'local',
            is_verified: true
            // Needs to update as per social login
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                roleId: newUser.role_id,
                provider: newUser.provider
            }
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res) => {
    try {        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, as: 'Role', attributes: ['id'] }]
        });

        if (!user) return res.status(404).json({ message: 'User not found.' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { id: user.id, email: user.email, roleId: user.Role.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.Role.id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};