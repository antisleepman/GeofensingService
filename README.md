<h1>Test task </h1>
<h2>Problem</h2>
<h3>Geofencing service
Managing the list of geofences and checking whether user coordinates fit within their boundaries.
Implement a simple HTTP server that should contain methods:
1) Geofence list management - create, edit, delete (CRUD)
1) Getting a list of geofences
2) The method of checking the occurrence of the {lat, lon} coordinates passed in the request in
boundaries of the specified geofence
Execution conditions:
1) Toolchain: Javascript/Typescript, Node.js
2) DBMS - mongodb or postgresql
3) You can limit yourself to one type of geofence - a polygon
4) The algorithm for entering the geofence can be taken ready-made, or
take advantage of DBMS
5) Determine the structure of requests and responses yourself</h3>
Stack
* Docker 
* Nest.js(Sequlize, Cross-env) 
* PostGreSql
* Swagger