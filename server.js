const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.status(200).json("So what? You guessed the port, and now? :)");
})

app.listen(process.env.WEB_PORT)
