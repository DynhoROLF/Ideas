const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

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
    
        response.header('X-Total-Count', count['count(x)']);

        return response.status(200).json(ideas);
    },

    async create(request, response){
        const {title, description, value } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('ideas').insert({
            title,
            description,
            value,
            user_id,
        })

        return response.status(201).json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const idea = await connection('ideas')
        .where('id', id)
        .select('user_id')
        .first();

        if (idea.user_id !== user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('ideas')
        .where('id', id)
        .delete();

        return response.status(204).send();
    }
};