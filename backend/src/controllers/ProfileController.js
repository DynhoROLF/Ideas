const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user_id = request.headers.authorization;

        const ideas = await connection('ideas')
        .where('user_id', user_id)
        .select('*');
    
        return response.status(200).json(ideas);
    }

}