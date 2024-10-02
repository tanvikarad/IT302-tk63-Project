import express from 'express'
import cors from 'cors'
import books_tk63 from './api/books.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/tk63/books", books_tk63)
console.log("route.js works");

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app
