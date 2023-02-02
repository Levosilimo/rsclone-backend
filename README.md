- [Register User](#register-user)
- [Check Username Eligibility](#check-username-eligibility)
- [Check Email Eligibility](#check-email-eligibility)
- [Login User](#login-user)
- [Update Avatar](#update-avatar)
- [Get Avatar](#get-avatar)
- [Update User Data](#update-user-data)
- [Get User Data](#get-user-data)
- [Get Records](#get-records)

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
        adminPassword?: string;
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

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      Invalid admin password

* **Notes:**

  None

</details>

**Check Username Eligibility**
----
Checks username eligibility

<details>

* **URL**

  /register/check-username

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
        username: string;
      }
    ```

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      None

* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:**

      Invalid input: "username" is required

  OR

    * **Code:** 422 UNPROCESSABLE ENTITY <br />
      **Content:**

      Username is already taken

* **Notes:**

  None

</details>

**Check Email Eligibility**
----
Checks email eligibility

<details>

* **URL**

  /register/check-email

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
      }
    ```

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      None

* **Error Response:**

    * **Code:** 400 BAD REQUEST <br />
      **Content:**

      Invalid input: "email" is required

  OR

    * **Code:** 409 CONFLICT <br />
      **Content:**

      A user with this email address already exists

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

  /avatar

* **Method:**

  `PATCH`

* **Headers:**

  `'Content-Type': 'multipart/form-data'`

  `'x-access-token': ${token}`

* **URL Params**

  **Unrequired:**
  `username=[string]`

* **Query Params**

  None

* **Data Params**

    ```typescript
      {
        file: Binary;
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

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      You don't have rights to do that

  OR

    * **Code:** 404 NOT FOUND <br />
      **Content:**

      User with this "nickname" not found

* **Notes:**

   * Request must be sent using the [multipart/form-data](https://developer.mozilla.org/en-US/docs/Web/API/FormData) content-type. See test-pages/uploadImage.html

   * Only admin users can use "nickname" in url params to update other user's avatar

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

      User with this "username" not found

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

  **Unrequired:**
  `username=[string]`

* **Query Params**

  None

* **Data Params**

    ```typescript
      {
        language?: string;
        levelFlexbox?: number;
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

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      You don't have rights to do that

* **Notes:**

  * Only admin users can use "nickname" in url params to update other user's data

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

  **Unrequired:**
  `username=[string]`

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

  OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:**

      You don't have rights to do that

* **Notes:**

    * Only admin users can use "nickname" in url params to get other user's data

</details>

**Get Records**
----
Validates a token. Returns an array of users records objects.

<details>

* **URL**

  /records

* **Method:**

  `GET`

* **Headers:**

  `'x-access-token': ${token}`

* **URL Params**

  None

* **Query Params**

  **Unrequired:**
    * `page = [number]`
    * `limit = [number]`
    * `sort = 'username' | 'levelFlexbox'`
    * `order = -1 | 1 | 'asc' | 'ascending' | 'desc' | 'descending'`

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 OK <br />
      **Content:**
      ```json
        [  
           {
           "username": "aaa",
           "levelFlexbox": 3
           }, {
           "username": "bbb",
           "levelFlexbox": 1
           }, {
           "username": "ccc",
           "levelFlexbox": 8
           }, {
           "username": "ddd",
           "levelFlexbox": 5
           }, {
           "username": "eee",
           "levelFlexbox": 12
           }, {
           "username": "fff",
           "levelFlexbox": 2
           }, {
           "username": "ggg",
           "levelFlexbox": 6
           }, {
           "username": "hhh",
           "levelFlexbox": 1
           }, {
           "username": "iii",
           "levelFlexbox": 1
           }, {
           "username": "jjj",
           "levelFlexbox": 9
           }, {
           "username": "kkk",
           "levelFlexbox": 5
           }
        ]
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