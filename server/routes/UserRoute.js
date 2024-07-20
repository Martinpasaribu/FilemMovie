import  express  from "express";
import { createdata, getdata } from "../controllers/User.js";


// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.post('/data', createdata);

router.get('/data', getdata);



export default router; 