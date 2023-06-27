require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT
const HOST = process.env.HOST
const controller = require("./controllers/routes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", controller)


app.listen(PORT, () => {
    console.log(`[server] is listening on ${PORT}`)
})