# Back-End-Software-Developer-Coding-Challenge----2
Backend server for pasturemap 


## INSTRUCTIONS:
These instructions are for linux and mac os:
It is assumed that the user has __node v.10.4.0__  , __psql (PostgreSQL) 9.5.13__ ,__npm 6.1.0__ installed in their system.
the system might run with older versions of above softwares but it is preferred to have these versions.


the backend system consists of two parts
* 1.express server
* 2.postgresql database.


### SETTING UP OF EXPRESS SERVER:
* 1.Open your bash.

* 2.Run the command in your bash.

  ```
  mkdir pastureMapBackEnd
  ```
* 3.cd into the folder  

  ```
  cd pastureMapBackEnd
  ```
* 4.Clone the git repository into the folder

  ```
  git clone https://github.com/harshakns/Back-End-Software-Developer-Coding-Challenge----2.git
  ```
* 5.cd into the folder

  ```
  cd Back-End-Software-Developer-Coding-Challenge----2
  ```

* 6.To install all the dependencies

  ```
  npm install
  ```
* 7.open the server.js and update the host,user and password details.

```
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',//your database host ip address.
	//optional  parameter port:your port in quotes.It is a string //in case you are using different from default.
        user: 'username',//your postgres username here in quotes. It is a string
        password: 'password',//your postgres password here in quotes. It is a string
        database: 'pastureMapBackEnd'
    }
});
```
* 8.To start the server run the following command and keep the terminal alive.

  ```
  node server.js
  ```


### SETTING UP OF POSTGRESQL DATABASE:
* 1.Open your bash.
* 2.Run the following commands

```
  createdb 'pastureMapBackEnd'
```
```
  psql 'pastureMapBackEnd'
```
* 3.Now you will get pastureMapBackEnd prompt, run the following commands.

```
  CREATE TABLE deviceinfo( deviceid VARCHAR(50) PRIMARY KEY, devicename VARCHAR(50) NOT NULL);
```
```
  CREATE TABLE devicestatus(deviceid VARCHAR(50) NOT NULL,batterystatus INTEGER, longitude VARCHAR(20), latitude VARCHAR(20), time TIMESTAMP);
```
* 4.Keep the prompt alive so that postgresql server is running in the background.


### INPUTS:
#### For storing the data:
The backend stores the device data and retrieves the data based on the DeviceId parameter.

* 1.For storing the new data, the backend server accepts a POST request with a json formatted data of the following format.
```
{
	"DeviceId":"142578655854frtf",
	"DeviceName":"pastureMapDevice",
	"BatteryStatus":"90",
	"Longitude":"17.83N15.63E",
	"Latitude":"17.83N15.63E"
}
```
* 2.All the requests to store the data should be routed to the __/store__ route. For example:
```
http://127.0.0.1:3000/store
```

#### For retrieving the data:
* 1.for querying data, the backend server POST resquest with a  json formatted data of the following format.
```
{
	"DeviceId":"142578655854frtf"
}
```
* 2.All the requests to retrieve the data should be routed to the __/retrieve__ route. for exaple:
```
http://127.0.0.1:3000/retrieve
```

*============================================================================================*
For Further details, contact:
__harshakns@gmail.com__
*=============================================================================================*
