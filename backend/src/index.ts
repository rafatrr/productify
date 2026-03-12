import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({origin: ENV.FRONTEND_URL}))
app.use(clerkMiddleware());// auth obj will by attached to the req 
app.use(express.json()); // parses json request bodies
app.use(express.urlencoded({ extended: true})) //parses from data (link html forms )



app.get('/', (req,res) => { 

    res.json({ message: "welcome to productfy api - powered by postgrsql, Drizzle orm, Clerk Auth",

        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        }

     })
} )



app.listen(ENV.PORT, () => console.log("Server is running on port", ENV.PORT))
