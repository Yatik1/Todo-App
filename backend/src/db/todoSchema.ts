import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
    text : {
        type:String ,
        required: true,
    } ,
    complete : {
        type:Boolean,
        default:false
    } , 
    timestamp: {
        type:String ,
        default: Date.now()
    }
})

export const Todo = mongoose.model("Todo" , TodoSchema)


export const getTodos = () => Todo.find(); //all todos 
export const createTodo = (values : Record<string,any>) => new Todo(values).save().then((todo) => todo.toObject()) // to add new todo
export const deleteTodo = (id:string) => Todo.findOneAndDelete({_id:id})
export const updateTodo = (id: string, values: Record<string, any>) => Todo.findByIdAndUpdate(id,values);