**Register User**
----
Registers new user

<details>

* **URL**

  /register

* **Method:**

  `POST`

* **Headers:**

  `'Content-Type': 'application/json'`

* **URL Params**

   None

* **Query Params**

  None

  * **Data Params**

      ```typescript
        {
          email: string;
          username: string;
          password: string;
        }
      ```

* **Success Response:**

    * **Code:** 201 CREATED <br />
      **Content:**
      ```json
        {
           "username": "Lev Sylin",
           "email": "silin.lev@gmail.com",
           "password": "$2a$10$Wlow2WzWpEERDRJVUOy5buIayKBpFd3UC.kEOcnI.nGV.KpBc1E6G",
           "_id": "63d3e07b4202e5f5be332de5",
           "__v": 0,
           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkM2UwN2I0MjAyZTVmNWJlMzMyZGU1IiwicGFzc3dvcmQiOiJyc2Nsb25lIiwiaWF0IjoxNjc0ODI5OTQ3LCJleHAiOjE2NzQ4NTE1NDd9.WGbXvAV02oPqZx6awbR53Lw3TSksZBWH6Ja-tT2hO58"
         }
      ```

* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:**

      Invalid input: "email", "password" and "username" are required

  OR

    * **Code:** 409 CONFLICT <br />
      **Content:**

      A user with this email address already exists

  OR

    * **Code:** 422 UNPROCESSABLE ENTITY <br />
      **Content:**

      Username is already taken

* **Notes:**

  None

</details>

**Login User**
----
Logs user in

<details>

* **URL**

  /login

* **Method:**

  `POST`

* **Headers:**

  `'Content-Type': 'application/json'`

* **URL Params**

  None

* **Query Params**

  None

    * **Data Params**

        ```typescript
          {
            login: string;
            password: string;
          }
        ```

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      ```json
        {
           "username": "Lev Sylin",
           "email": "silin.lev@gmail.com",
           "password": "$2a$10$Wlow2WzWpEERDRJVUOy5buIayKBpFd3UC.kEOcnI.nGV.KpBc1E6G",
           "_id": "63d3e07b4202e5f5be332de5",
           "__v": 0,
           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkM2UwN2I0MjAyZTVmNWJlMzMyZGU1IiwicGFzc3dvcmQiOiJyc2Nsb25lIiwiaWF0IjoxNjc0ODI5OTQ3LCJleHAiOjE2NzQ4NTE1NDd9.WGbXvAV02oPqZx6awbR53Lw3TSksZBWH6Ja-tT2hO58"
         }
      ```

* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:**

      Invalid input: "password" and "username"/"email" are required

  OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**

      User with this "password" and "username"/"email" was not found

* **Notes:**

  None

</details>