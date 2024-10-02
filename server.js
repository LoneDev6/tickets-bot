const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.status(200).json("Every digital footprint is traceable. Hack with caution; consequences are inevitable. 😈💀Skibidisigm🐺🥶Bye🤫🧏🏻‍♂️Bye🗿𝓯𝓻𝓮𝓪𝓴𝔂");
})

app.listen(process.env.WEB_PORT)