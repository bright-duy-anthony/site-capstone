require("dotenv").config()
const app=require("./app")

app.listen(Number(process.env.PORT) || 3001, () => {
    console.log(`🚀 Server listening on port ` + PORT)
})