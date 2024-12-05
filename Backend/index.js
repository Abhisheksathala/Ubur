import { app } from './app.js';
import 'dotenv/config';
import connectDB from './src/DB/IndexDB.js';

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
