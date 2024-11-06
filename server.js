const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.status(200).json("Every living creature on earth dies alone");
})

app.listen(process.env.WEB_PORT)
