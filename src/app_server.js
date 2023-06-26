import express, { text } from "express";
import cors from "cors";
const app = express();

const users = []
let chat = []
// Cria uma instância do servidor
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    // Manda como resposta o texto 'Hello World'
    res.send('Hello World');
});

app.post('/sign-up',(req,res)=>{
    const {username, avatar} = req.body
    if(typeof username !== 'string'|| typeof avatar  !== 'string'){
        res.sendStatus(400)
        return
    }
    if(!username || !avatar){
        res.sendStatus(400)
        return
    }
    const user = {username, avatar}
    users.push(user)
    console.log(users)
    res.status(201).send("ok")
})
app.post('/tweets',(req,res)=>{
    const {username, tweet} = req.body
    //não cadrasatado 
    const user = users.find((user)=>user.username=== username)
    if(!user){
        return res.sendStatus(401)
    }
    // tweet vazios
    if(typeof username !== 'string'|| typeof tweet  !== 'string'){
        res.sendStatus(400)
        return
    }
    if(!username || !tweet){
        res.sendStatus(400)
        return
    }
    
    const avatar = user.avatar
    const position = chat.length
    const text = {position, username, tweet, avatar}
    chat.push(text)
    console.log(chat)
    res.status(201).send("ok")
})
app.get('/tweets',(req,res)=>{
    let tweet10 = []
    if(chat.length >= 10){
        for (let index = 10; index > 0; index--) {
            tweet10.push(chat[chat.length - index])
        };
        console.log('mais de 10')
        res.status(201).send(tweet10)
        return
    }else{
        tweet10 = chat.map((text)=> text)
        console.log('mais de 10')
        console.log(tweet10)
        res.status(201).send(tweet10)
        return
    }
})
app.get("/tweets/:name",(req,res)=>{
    const name = req.params.name;
    const chatname = chat.filter((mensager)=>mensager.username === name)
    console.log(chatname)
    res.send(chatname)

}
)

// Configura o servidor para rodar na porta 4000
app.listen(5000,()=>console.log('the server is running'));