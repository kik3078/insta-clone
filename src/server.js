import dotenv from "dotenv"
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")})
import { GraphQLServer } from "graphql-yoga";
import loggar from "morgan";
import schema from "./schema"
import { sendSecretMail } from "./utils"

sendSecretMail("kik3078@naver.com", "123")

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema })

server.express.use(loggar("dev"));

server.start({port: PORT}, () => console.log(`Server running on port http://localhost:${PORT}`));