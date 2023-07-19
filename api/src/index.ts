import app from './server';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`App listening on port ${port}`));
