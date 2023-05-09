require("dotenv").config()
const app=require("./app")

console.log("Inside server.js");
app.listen(Number(process.env.PORT) || 3001, () => {
    console.log(`🚀 Server listening on port ` + Number(process.env.PORT))
})
