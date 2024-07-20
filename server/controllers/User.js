import  {  DataModel  }  from "../models/FormsModel.js";
import moment from 'moment'; // Import moment.js jika belum diimpor


export const createdata = async(req, res) =>{
    const {id, original_title} = req.body;
  
    try {
        await DataModel.create({
            id: id,
            original_title : original_title,
          
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: "Error kabeh"});
    }
}


// =========================  GET =============================

export const getdata = async(req, res) =>
    {
        try {
            const users = await DataModel.find({}); // Mengambil hanya UUID pengguna
            res.status(200).json(users); // Mengembalikan array UUID pengguna
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
    
    
