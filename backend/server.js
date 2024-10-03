//tk63@njit.edu          10/3/24             Tanvi Karad         IT302-451           Phase 2


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
