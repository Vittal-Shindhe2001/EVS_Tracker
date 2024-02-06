const express=require('express')
const cors=require('cors')
const app=express()
const port=3068
const db=require('./config/db')
const router=require('./config/routes')
app.use(express.json())
app.use(cors())
db()
app.use(router)

app.listen(port,()=>{
    console.log('server running on port ',port);
})


app.post('/', async (req, res) => {
    try {
        res.json("Server running"); // Sending a JSON response with a message
    } catch (error) {
        res.json(error); // Sending the error message as JSON
    }
});
