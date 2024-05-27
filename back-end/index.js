const express = require('express')

const pool = require('./db');
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors({ origin: 'http://localhost:4200' }));
app.options('*', cors());
app.use(express.json());

app.use((req, res, next) => {
  req.pool = pool;
  next();
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







app.post('/countries/manyYear', (req, res) => {
  const tables = req.body.tables; // Array of objects containing table name and fields
  const countryName = req.body.countryName;
  const Year = req.body.Year;

  if (!tables || tables.length === 0) {
    res.status(400).json({ error: 'Tables parameter is required and cannot be empty.' });
    return;
  }

  // Function to create a promise for each table query
  const createTableQuery = (tableObj) => {
    return new Promise((resolve, reject) => {
      const table = tableObj.table;
      const fields = tableObj.fields;
      const fieldList = fields.join(', ');

      let query;
      if (fieldList === 'ALL') {
        query = `SELECT ${table}.* FROM ${table} JOIN countries ON ${table}.ISO3 = countries.ISO3 WHERE TRIM(CountryName) IN (?) AND MeasureYear IN (?)`;
      } else {
        query = `SELECT ${table}.ISO3, MeasureYear, ${fieldList} FROM ${table} JOIN countries ON ${table}.ISO3 = countries.ISO3 WHERE TRIM(CountryName) IN (?) AND MeasureYear IN (?)`;
      }

      pool.query(query, [countryName, Year], (error, results) => {
        if (error) {
          console.error(`Error querying database for table ${table}:`, error);
          reject(error);
        } else {
          resolve({ table, results });
        }
      });
    });
  };

  // Create an array of promises for each table query
  const tableQueries = tables.map(createTableQuery);

  // Execute all queries
  Promise.all(tableQueries)
    .then(results => {
      const response = results.reduce((acc, curr) => {
        acc[curr.table] = curr.results;
        return acc;
      }, {});
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error', details: error });
    });
});


app.post('/fields' ,(req,res)=> {

  let tableName=req.body.tableName;

  pool.query(`SELECT column_name 
    FROM information_schema.columns
    WHERE table_name = '${tableName}'AND COLUMN_NAME NOT IN ('ISO3', 'MeasureYear');`,(error, results) => {
      if (error) {
        console.error('Error querying database for fieldList:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(results);
      res.status(200).json(results);
    });


})

app.get('/countryNames', (req, res) => {
  pool.query('SELECT CountryName FROM countries', (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log(results);
    res.status(200).json(results);
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})