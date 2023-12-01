import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/database/models/users';
import connection from '@/database/connection';


export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        await connection.sync();
        const { name, email, password } = await req.body;
        if(!name || !email || !password) {
            // return new Response("email and password is required", {status: 401});
            return res.status(401).json({message: "email and password is required"});
        }

        const UserExist = await connection.query('SELECT * FROM users WHERE email = :email', {
            replacements: { email },
            type: connection.QueryTypes.SELECT,
        });
        if(Object.keys(UserExist).length !== 0){
            console.log('User already exists', typeof(UserExist));
            // return new Response('User Already Exists',{status: 400});
            return res.status(400).json({message: 'User Already Exists'});
        }
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        await User.create({
           name,
           email,
           password: hashedPassword,
          });

        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error By Register API' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }