# EcoGraph 🌍

**EcoGraph** is an interactive data visualization tool that showcases environmental and nature-related statistics from countries around the world. With EcoGraph, users can explore key indicators such as carbon emissions, renewable energy usage, biodiversity levels, and more—all through clean, dynamic, and insightful visualizations. Designed to promote awareness and data-driven action, EcoGraph turns global environmental data into meaningful insights.

<img width="1917" height="911" alt="EcoHome" src="https://github.com/user-attachments/assets/778775df-40d9-4531-9503-ccc2d7e08f62" />


### Features:

- Bar charts for easy comparison of environmental metrics.
<img width="1897" height="853" alt="barchart" src="https://github.com/user-attachments/assets/839eefac-027e-4e6f-beaa-3e45a86f300a" />


- Line charts to track trends over time.
<img width="1909" height="778" alt="Line" src="https://github.com/user-attachments/assets/32315691-a601-4453-bdb1-90f7edc0d916" />



# Database Tables Description 

For our database, we created 5 tables based on the type of data each one will contain.

- **Countries**: information about countries, such as their name, capital, area, population etc.
- **Disasters**: measurements related to disasters that occurred in a country and the year they happened.
- **Forestcarbon**: measurements for land area and forest area.
- **Land**: information on how a country’s land is distributed.
- **Temperature**: measurements of temperature changes per year in each country.


# Getting Started

To set up the development environment for the EcoGraph application, follow these steps:

### Configure the Database

1. **Create a MySQL Database:**
   Create a MySQL database to store the data for the EcoGraph  application.
	- Run tables.sql file located in Database/DDL script/ to create the tables.
	- Run insertData.sql file located in Database/DDL script/ to insert the Data. 

2. **Update Database Connection Settings:**
   Open the `db.js` file located in `back-end/` directory of the project.
   Update the database connection settings in this file to match your MySQL database configuration.
```properties
    user: 'username',
    password: 'password',
    database: 'database_name'
```

### BackEnd

- In the back-end directory in order to start the expressJS app run **npm i && npm start**.

### FrontEnd

- In the front-end directory in order to start the angularApp run **npm i && ng serve**.


### ETL Process (if you want)

- Run the Transformation_1.ktr file with rawData located in /data/rawData/ directory of the project, in the Pentaho Data Integration (Kettle) app. 



# Thank you

Thank you for checking out the EcoGraph project! We hope this application helps data analysts, researchers, and anyone interested in environmental issues explore and understand global environmental data through clear and meaningful visualizations. Your feedback and contributions are always welcome as we continue to improve and expand EcoGraph.

I would also like to thank all the contributors, **Alexander Moutso** and **Konstantinos Evangelou**, for their valuable contributions and dedication to the EcoGraph project.


      



