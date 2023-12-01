import User from '../../database/models/users';
import connection from '../../database/connection';


const handler = async (req, res) => {
    try{
        await connection.sync();
        const allUsers = await connection.query('SELECT * FROM users', {
            type: connection.QueryTypes.SELECT,
          });
        res.status(200).json(allUsers);
    } catch (error){
        console.error('Error this Fetching Users: ', error);
        res.status(500).json({message: 'Internal Server Error:'});
    }
}

export default handler;