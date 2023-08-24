import dotenv from "dotenv";
dotenv.config();

import app from "./server";

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`App listening on port ${port}`));
