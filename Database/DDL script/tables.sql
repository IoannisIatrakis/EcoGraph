Create table Countries (Countryid int AUTO_INCREMENT,
                        ISO3 varchar(3),
                        CountryName varchar(50),
                        Capital varchar(50),
                        Continent varchar(50),
                        CurrencyCode varchar(8),
                        RegionCode int,
                        RegionName varchar(50),
                        SubRegionCode int,
                        SubRegionName varchar(50),
                        CountryStatus varchar(50),
                        Area_SqKm int,
                        CountryPopulation int,
                        primary key(Countryid)
);

CREATE INDEX Countries_ISO3_idx on countries(ISO3);

Create table ForestCarbon( ISO3 varchar(3),
                           MeasureYear int,
                           ForestArea double,
                           ForestExtent double,
                           LandArea double,
                           ShareForest double,
                           CarbonStocksForests double,
                           ICarbonStocksForests double,
                           primary key(ISO3,MeasureYear),
                           foreign key (ISO3) references Countries(ISO3)
);

Create table Temperature(ISO3 varchar(3),
                         MeasureYear int,
                         TemperatureChange double,
                         primary key(ISO3,MeasureYear),
                         foreign key (ISO3) references Countries(ISO3)
);

Create table Disasters (ISO3 varchar(3),
                           MeasureYear int,
                           Drought int,
                           ExtremeTemperature int,
                           Flood int,
                           Landslide int,
                           Storm int,
                           Wildfire int,
                           TOTAL int,
                           primary key(ISO3,MeasureYear),
                           foreign key (ISO3) references Countries(ISO3)
);

Create table Land(ISO3 varchar(3),
                  MeasureYear int,
                  ArtificialSurfaces double,
                  Grassland double,
                  HerbaceousCrops double,
                  InlandWaterBodies double,
                  Mangroves double,
                  PermanentSnowAndGlaciers double,
                  ShrubCoveredAreas double,
                  ShrubsAndOrHerbaceousVegetation double,
                  SparselyNaturalVegetatedAreas double,
                  TerrestrialBarrenLand double,
                  TreeCoveredAreas double,
                  WoodyCrops double,
                  TotalLandCover double,
                  ClimateAlteringCoverIndex double,
                  primary key(ISO3,MeasureYear),
                  foreign key (ISO3) references Countries(ISO3)
);


CREATE INDEX Countries_CountryName_idx on countries(CountryName);
CREATE INDEX Countries_Area_SqKm_idx on countries(Area_SqKm);
CREATE INDEX Countries_CountryPopulation_idx on countries(CountryPopulation);



CREATE INDEX ForestCarbon_Year_idx on ForestCarbon(MeasureYear);
CREATE INDEX Disasters_Year_idx on disasters(MeasureYear);
CREATE INDEX Land_Year_idx on land(MeasureYear);
CREATE INDEX Temperature_Year_idx on temperature(MeasureYear);

