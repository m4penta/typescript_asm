import express from "express";
import path from "path";
import {Request, Response} from 'express'
const app = express();
var port = 3000;
app.set("view engine", "ejs");
app.set("views", "templates");
app.use('/assets/', express.static(path.join("dist/frontend")));
app.use('/', express.static(path.join("public")));

app.get("/board", (req: Request, res:Response) =>{
    res.render('index', {});
});
app.get('/login',(req: Request, res:Response) =>{
    res.render('login', {});
});
app.listen(port, ()=>{
    console.log(`sever is listenning ${port}`)
})