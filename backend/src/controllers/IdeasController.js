const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('ideas').count();

        const ideas = await connection('ideas')
        .join('users', 'users.id', '=' , 'ideas.user_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'ideas.*',
            'users.name',
            'users.email',
            'users.whatsapp',
            'users.city',
            'users.uf'
        ]);
    
        res.header('X-Total-Count', count['count(*)']);

        return res.status(200).json(ideas);
    },

    async create(req, res){
        const {title, description, value } = req.body;
        const user_id = req.headers.authorization;

        const [id] = await connection('ideas').insert({
            title,
            description,
            value,
            user_id,
        })

        return res.status(201).json({ id });
    },

    async delete(req, res){
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const idea = await connection('ideas')
        .where('id', id)
        .select('user_id')
        .first();

        if (idea.user_id !== user_id) {
            return res.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('ideas')
        .where('id', id)
        .delete();

        return res.status(204).send();
    }
};