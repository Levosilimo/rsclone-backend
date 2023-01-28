**Register User**
----
Creates new user with given credentials

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
Validates credentials. Returns a token on success

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
           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkM2UwN2I0MjAyZTVmNWJlMzMyZGU1IiwicGFzc3dvcmQiOiJyc2Nsb25lIiwiaWF0IjoxNjc0ODI5OTQ3LCJleHAiOjE2NzQ4NTE1NDd9.WGbXvAV02oPqZx6awbR53Lw3TSksZBWH6Ja-tT2hO58"
         }
      ```

* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:**

      Invalid input: "password" and "login" are required

  OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**

      User with this "password" and "login" was not found

* **Notes:**

  None

</details>

**Update Avatar**
----
Changes the user's avatar to the sent one if the given token is valid

<details>

* **URL**

  /avatar/upload

* **Method:**

  `PATCH`

* **Headers:**

  `'Content-Type': 'multipart/form-data'`

  `'x-access-token': ${token}`

* **URL Params**

  None

* **Query Params**

  None

* **Data Params**

    ```typescript
      {
        file: Binary
      }
    ```

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
        None

* **Error Response:**

    * **Code:** 403 FORBIDDEN <br />
      **Content:**

      A token is required for authentication

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      Invalid Token

* **Notes:**

  Request must be sent using the [multipart/form-data](https://developer.mozilla.org/en-US/docs/Web/API/FormData) content-type. See test-pages/uploadImage.html

</details>

**Get Avatar**
----
Responses with user's avatar

<details>

* **URL**

  /avatar/:username

* **Method:**

  `GET`

* **Headers:**

  None

* **URL Params**

   **Required:**

  `username=[string]`

* **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      ```
        image/png, image/jpg (chunked)
      ```

* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:**

      Invalid input: "username" is required

  OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**

      User with sent "username" not found

* **Notes:**

  None

</details>

**Update User Data**
----
Validates token. Replaces user data with the data from request's body. Returns object of mutable user data.

<details>

* **URL**

  /user

* **Method:**

  `PATCH`

* **Headers:**

  `'Content-Type': 'application/json'`

  `'x-access-token': ${token}`

* **URL Params**

  None

* **Query Params**

  None

* **Data Params**

    ```typescript
      {
        language ?: string;
        levelFlexbox ?: number;
      }
    ```

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      ```json
        {
           "language": "en-us",
           "levelFlexbox": "1"
        }
      ```

* **Error Response:**

    * **Code:** 403 FORBIDDEN <br />
      **Content:**

      A token is required for authentication

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      Invalid Token

* **Notes:**

  None

</details>

**Get User Data**
----
Validates token. Returns object of mutable user data.

<details>

* **URL**

  /user

* **Method:**

  `GET`

* **Headers:**

  `'x-access-token': ${token}`

* **URL Params**

  None

* **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      ```json
        {
           "language": "en-us",
           "levelFlexbox": "1"
        }
      ```

* **Error Response:**

    * **Code:** 403 FORBIDDEN <br />
      **Content:**

      A token is required for authentication

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      Invalid Token

* **Notes:**

  None

</details>