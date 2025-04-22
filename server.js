import express from "express"
import cors from "cors"
import clientRouter from "./routes/clienti.js";
import serviceRouter from "./routes/service.js";
import progRouter from "./routes/programari.js";
import adminRouter from "./routes/admin.js";
import statsRouter from "./routes/statistici.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/clienti', clientRouter);
app.use('/programari', progRouter);
app.use('/admin', adminRouter);
app.use('/service', serviceRouter);
app.use('/statistici', statsRouter);

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})