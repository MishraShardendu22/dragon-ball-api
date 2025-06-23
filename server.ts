import app from './app';
import dbConnect from './dbConnect/dbConnect';
import AddInitialData from './AddingToDataSet/AddingToDataSet';

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await dbConnect();
    await AddInitialData();
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error('Startup failed:', err);
  }
});
