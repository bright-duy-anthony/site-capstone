require("dotenv").config()
const app=require("./app")

try {
    app.listen(Number(process.env.PORT) || 3001, () => {
        console.log(`🚀 Server listening on port ` + Number(process.env.PORT))
    })
} catch(error) {
    console.error(error);
}
