**Disclaimer**
----
Every request to the application (besides /auth itself) must have a signed `token` (returned in authentication response, see Authenticate below).

The `token` can be passed as:
  * url parameter: `token=xyz`, example `http://localhost:3000/token=mytoken`
  * header parameter: `['x-access-token'] = xyz`
  * body parameter: `{"token": "xyz"}`
  
 Besides, for every request `Content-Type` header must be set to `application/json`.
 
 If a `token` is not provided for requests, status code `403 FORBIDDEN` is returned.

**Authenticate API**
----
Authenticates a user/password (matches with `apiConfig.user` and `apiConfig.password` in [default.yaml](app/config/default.yaml))

* **URL**

  `/auth`

* **Method**

  `POST`

* **Data Params**

  `username` and `password`
  
  Example: `{"username": "apiuser", "password": "apipassword"}`
  
* **Success Response**

  * **Code:** 200<br />
    **Content:** `{"success": true, "message": "Login Successful!", "token": "<token-value>"}`
  
* **Error Response**
  * **Code:** 200<br />
    **Content:** `{"success": false, "message": "Invalid [username|password]."}`

**Show Invoice**
----
  Returns json data about a single invoice.

* **URL**

  /invoices/:id

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "Id": 1,
      "CreatedAt": "2017-07-27T18:19:05.000Z",
      "ReferenceMonth": 4,
      "ReferenceYear": 2006,
      "Document": "a3b5df83hf",
      "Description": "Description of this invoice.",
      "Amount": 9999.90,
      "IsActive": 1,
      "DeactiveAt": "2020-12-12T14:12:12.000Z"
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : ["Invoice not found"] }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  `http://localhost:3000/invoices/1?token=myawesometoken`
