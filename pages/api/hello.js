// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Sequelize } from "sequelize";
import connection from '../../database/connection';
import users from "@/database/models/users";

const handler = async (req, res) =>  {
  // res.status(200).json({ name: 'John Doe' })
  try{
    await connection.sync();
    console.log('Database Synchronized');

    res.status(200).json({message: 'Success'});

  }catch(error){
    console.error("Error syncing database:", error);
    res.status(500).json({message: 'Internal Server Error:'});
  }
}

export default handler;
