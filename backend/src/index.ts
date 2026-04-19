import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express';
import usersRoutes from "./routes/userRoutes";
import productsRoutes from "./routes/productsRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import uploadRouter from "./routes/upload.routes";
const app = express();

// app.use(cors({origin: ENV.FRONTEND_URL, credentials: true}));

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://productify-coral.vercel.app",
      "https://productify-byay3ax5x-rafat1.vercel.app",
      "http://localhost:5173"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORSss"));
    }
  },
  credentials: true
}));
//'credentials: true' allows the frontend to send cookies to the backend so thatt we can authenticate the user
app.use(clerkMiddleware());// auth obj will by attached to the req 
app.use(express.json()); // parses json request bodies
app.use(express.urlencoded({ extended: true})) //parses from data (link html forms )


app.use('/api/users',usersRoutes)
app.use('/api/products',productsRoutes)
app.use('/api/comments',commentsRoutes)
app.use("/api/upload", uploadRouter);




app.get('/', (req,res) => { 

    res.json({ message: "welcome to productfy api - powered by postgrsql, Drizzle orm, Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        }

     })
} );

app.listen(ENV.PORT, () => console.log("Server is running on port", ENV.PORT))
