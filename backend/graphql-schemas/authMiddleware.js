import env from 'dotenv';
import Jwt from 'jsonwebtoken';
import { Users } from '../models/app-user.js';

// dotEnv config
env.config()
const JWT_SECRETE = process.env.JWT_KEY

export const authMiddleware = async (request, response, next) => {
    let { query } = request.query
    query = JSON.stringify(query)
    if (query !== undefined && (!query.includes('login') && !query.includes('singUp'))) {
        let { authorization } = request.headers
        if (!authorization) {
            return response.status(401).json({ error: true, message: `Authorization fails.` });
        }
        await Jwt.verify(authorization, JWT_SECRETE, async (err, decode) => {
            if (err) {
                return response.status(401).send({ error: true, message: 'Unauthorized! Access Token was expired!' });
            }
            let { userDetails } = decode
            let userDetailsDB = await Users.findOneBy({ id: parseInt(userDetails.id) });
            if (!userDetailsDB) {
                return response.status(401).json({ error: true, message: `Authorization fails.` });
            }
        });
    }
    next();
}