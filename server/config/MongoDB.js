import mongoose from "mongoose";

mongoose.connect('mongodb+srv://martin12082000:Martin1208__+@ujicobadb.sjemocx.mongodb.net/?retryWrites=true&w=majority&appName=ujicobadb',{
    user:'martin12082000',
    pass:'Martin1208__+',
})

  export const Koneksi = mongoose.connection;

    Koneksi.on('error',(err)=>{
        console.log('MongoDB Terputus', err)
    })

    Koneksi.once('open',()=>{
        console.log(" MongoDB Terhubung")
    })
