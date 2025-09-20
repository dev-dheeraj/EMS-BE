
import db from '../../models/index.js';
const { Template, User } = db;


export const createTemplate = async (req, res) => {
    try {
        const { name, description, is_global = false, is_verified = false, created_by } = req.body;

        if (!name || !created_by) {
            return res.status(400).json({ error: 'Name and created_by are required' });
        }
        const userExists = await User.findByPk(created_by);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        const template = await Template.create({
            name,
            description,
            is_global,
            is_verified,
            created_by,
        });
        return res.status(201).json(template);
    } catch (error) {
        console.error('Error creating template:', error);
        return res.status(500).json({ error: 'Failed to create template' });
    }
};

export const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.findAll({
            where: {
                is_global: true,
                is_verified: true,
            },
            order: [['created_at', 'DESC']],
        });
        return res.json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        return res.status(500).json({ error: 'Failed to fetch templates' });
    }
};


export const getTemplatesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'userId parameter is required' });
        }
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        const templates = await Template.findAll({
            where: { created_by: userId },
            order: [['created_at', 'DESC']],
        });
        return res.json(templates);
    } catch (error) {
        console.error('Error fetching templates by user:', error);
        return res.status(500).json({ error: 'Failed to fetch templates by user' });
    }
};
