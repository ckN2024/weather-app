import express from "express"

const app = express()
const PORT = 5000

app.get("/", (req, res) => {
    res.json({
        message: "server responded"
    })
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})