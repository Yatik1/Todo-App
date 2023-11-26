import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Todo, deleteTodo, getTodos } from "./db/todoSchema"

require('dotenv').config() 

const app = express()
const PORT = process.env.PORT! || 5555

app.use(express.json());
app.use(cors({
    credentials: true,
}))

//GET Endpoint for fetching Todo data 
app.get('/todos' , async (req: express.Request,res : express.Response) => {
  try {
      const todos = await getTodos();
      res.json(todos)
  } catch (error) {
    console.log("Error" ,error)
  }
})

//POST Endpoint for adding new Todo data in the database
app.post('/todo/new' , async (req:express.Request , res:express.Response) => {
    try {
        const todo = new Todo({
          text: req.body.text
        });
    
        await todo.save();
        res.json(todo);
      } catch (error) {
        console.error("Error saving todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


//DELETE Endpoint for deleting Todo data 
app.delete('/todo/delete/:id' , async (req:express.Request , res:express.Response) => {
  try {
      const { id } = req.params;
    
      const result = await deleteTodo(id)    
      return res.json(result);

  } catch (error) {
    console.log("Error" , error)
    return res.sendStatus(500)
  }
  });

  //PUT Endpoint for upadating TOdo task
app.put('/todo/complete/:id' , async (req:express.Request , res:express.Response) => {
    try {
        const {id} = req.params;
        const todo = await Todo.findById(id)
    
        todo.complete = !todo.complete
        await todo.save()
    
        return res.status(200).json(todo).end()

    } catch (error) {
        console.log("Error" , error)
        return res.sendStatus(400)
    }
})

    
app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})


mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL!) 
  .then(() => console.log("Databse is connected ! "))
  .catch((error) => console.log("Error" , error))
  