import {  Router } from "express";
import { queryProfile } from "../controllers/query_controller";

const queryRouter = Router()

queryRouter.get('/profile/:username', queryProfile )


export default queryRouter