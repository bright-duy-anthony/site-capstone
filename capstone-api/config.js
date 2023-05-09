require("dotenv").config()
require("colors")

const PORT = Number(process.env.PORT);
const BCRYPT_WORK_FACTOR = Number(process.env.BCRYPT_WORK_FACTOR);
const SECRET_KEY = process.env.SECRET_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

function getDatabaseUri() {
  const dbUser = process.env.PGUSER;
  const dbPass = encodeURI(process.env.PGPASSWORD);
  const dbHost = process.env.PGHOST;
  const dbPort = process.env.PGPORT;
  const dbName = process.env.PGDATABASE;

  // if the DATABASE_URL environment variable, use that
  // otherwise create the db connection string ourselves
  return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?sslmode=require`;
}



console.log("App Config".red)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("---")

module.exports={
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
}