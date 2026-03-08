const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api/info", (req,res)=>{
  res.json({
    name:"northbound",
    site:"My website"
  })
})

app.listen(3000,()=>{
  console.log("Server running");
})
