## Tocca API 

This API extracts groups of 50 records from a Firebase real-time database


## Getting Started
Make sure you install the corresponding dependencies of the project
```
npm install
```
Run the following command to start the server
```
npm run start
```

## REST API

This API only provides groups of 50 records at a time. Therefore, the user must first request the total number of records and then make multiple API calls with each individual group ID


#### URL / Method

* **GET request**
```
  http://localhost:5000/api/users 
```

This endpoint provides the total number of groups available ( starting from 1 )

```
 http://localhost:5000/api/users/:id
```



#### URL Params

* **Required:** `id`

This refers to the group id. For example, if the total number of groups is 10, then the user must request each individual group separately ( each group contains 50 records)



#### Success Response:

  * **Code:** 200
  * **Content:** `'[{"age":43,"name":"John"},{"age":33,"name":"JD"},{"age":34,"name":"k"},{"age":24,"name":"kl"},{"age":23,"name":"tom"}]'`



#### Error Response:

- **Code**: 404



#### Sample Call:

```
http://localhost:5000/api/users
```

```
http://localhost:5000/api/users/1
```

