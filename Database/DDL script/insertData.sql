set global local_infile = 1;

LOAD DATA LOCAL INFILE 'Data\\FinaldataETL\\countriesETLShorter.csv' INTO TABLE Countries 
FIELDS TERMINATED BY ';'  LINES TERMINATED BY '\n' IGNORE 1 LINES
(ISO3, CountryName, Capital, Continent, CurrencyCode, RegionCode, RegionName, SubRegionCode, SubRegionName, CountryStatus, Area_SqKm, CountryPopulation);

LOAD DATA LOCAL INFILE "Data\\FinaldataETL\\DisastersETL.csv" INTO TABLE Disasters FIELDS
TERMINATED BY ";" ENCLOSED BY '\"' LINES TERMINATED BY "\n" IGNORE 1 LINES;

LOAD DATA LOCAL INFILE "Data\\FinaldataETL\\ForestCarbonETL.csv" INTO TABLE ForestCarbon FIELDS
TERMINATED BY ";" ENCLOSED BY '\"' LINES TERMINATED BY "\n" IGNORE 1 LINES;

LOAD DATA LOCAL INFILE "Data\\FinaldataETL\\LandETL.csv" INTO TABLE Land FIELDS
TERMINATED BY ";" ENCLOSED BY '\"' LINES TERMINATED BY "\n" IGNORE 1 LINES;

LOAD DATA LOCAL INFILE "Data\\FinaldataETL\\TemperatureETL.csv" INTO TABLE Temperature FIELDS
TERMINATED BY ";" ENCLOSED BY '\"' LINES TERMINATED BY "\n" IGNORE 1 LINES;