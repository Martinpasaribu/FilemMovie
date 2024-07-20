import mongoose, { Schema, mongo } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const data = new Schema({
    uuid: { type: String, default: () => uuidv4(), required: true, unique: true },
    id:  { type: Number, default: null },
    original_title: { type: String, default: null },
    waktu: { type: Date, default: Date.now },

});
export const DataModel = mongoose.model('Data', data, 'Data');





