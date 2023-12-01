import User from '@/database/models/users';
import bcryptjs from bcryptjs;
import jwt from 'jsonwebtoken';
import connection from '@/database/connection';

export default async function handler(req, res) {
    if(req.method == 'GET'){
        try{
            await connection.sync();
            const {email, password} = req.body;
            if(!email || !password) {
                // return new Response("email and password is required", {status: 401});
                return res.status(401).json({message: 'email and password is required'});
            }

            const UserExist = await connection.query('SELECT * FROM users WHERE email = :email', {
                replacements: { email },
                type: connection.QueryTypes.SELECT,
            });

            if(Object.keys(UserExist).length === 0){
                // return new Response("Username does not exist", {status: 400});
                return res.status(400).json({message: 'Username does not exist'});
            }

            const validPassword = await bcryptjs.compare(password, UserExist.password);

            if(!validPassword){
                // return new Response('Incorrect Password', {status: 400});
                return res.status(400).json({message: 'Incorrect Password'});
            }

            const tokenData = {
                email: UserExist.email,
            }

            const token = jwt.sign(tokenData, process.env.JWT_KEY, {expiresIn: '1d'});
            const response = res.status(200).json({message: 'Success'});

            response.cookies.set('token', token, {httpOnly: true});
            return response;

        } catch (error){
            console.log("Error:", error.message);
            // return new Response("Something went wrong", {status: 500});
            return res.status(500).json({message: "Something Went Wrong"});
        }
    }
}