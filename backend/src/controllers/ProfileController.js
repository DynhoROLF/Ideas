const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const user_id = req.headers.authorization;

        const ideas = await connection('ideas')
        .where('user_id', user_id)
        .select('*');
    
        return res.status(200).json(ideas);
    }

}