# Sixfold Assignment


Prerequisite for running this project

1. Project uses Postgres Database. Install Postgres
2. Create a database name it sixfold (if any other database created change `ormconfig.json`)
3. There are initial create and data sql insertions in src/data/sql folder. Run all of them starting from create.sql.

**Good news**: Docker image will be prepared in the soon future.

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

npx ts-node src/index.ts

Steps to run tests in this project:

1. After `npm i` run npm test (look at `package.json` for further info)

Notes:

- Default port is 8881. In order to change by command line parameter must be passed by -port:number
```    
  ts-node src/index.ts -port:8882  
```   

## Technical Info

When the application is started it reads routes and airports from DB and calculates the distances. After that the graph is constructed. This processes take some time. If during this initialization a request is made then the user get such a message "Graph is being initialized. Try later."

ngraph.graph and ngraph.path libraries are being used for finding shortest path.

Tables (``airline, airport, route``) contents downloaded from https://openflights.org/. ``nearby_airport`` table contents are
inserted by a helpful sql and by ``airport`` table to find the close airports whose distance is less than 100 Km.


## How to use API

**Endpoint**: `/find-path?from={from}&to={to}`  method: GET

| Param | Description  |

|--|--|

|**from**|Can be IATA or ICAO code, for example **TLL**

|**to**  |Can be IATA or ICAO code, for example **IST**




**Result** success

```json  
{
	prettyPath: "TLL -> FRA -> MAD",
	pathLink: { ground: false,
		airport: "TLL",
		next: {
			ground: false,
			airport: "FRA",
			next: {
				ground: false,
				airport: "MAD",
				next: null
			}
		}
	}
}  
```
**Result** failure if  entered ``from`` or ``to`` IATA/ICAO code can not be found in graph

```json
{
	error:  "Nodes are not in graph"
}
``` 

**Result** failure if initialization process is going on.

```json
{
	error:  "Graph is being initialized. Try later."
}
``` 

