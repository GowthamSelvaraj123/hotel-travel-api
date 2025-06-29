const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res)=> {
    res.send("startedapp succssfully")
});

app.listen(5000, () => {
    console.log("App started successfully");
})