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
  Returns json data about a single active invoice.

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

* **Sample Call:**

  `http://localhost:3000/invoices/1?token=myawesometoken`
  
* **Notes:**

  An active invoice has `IsActive=1`.

**Show Invoice Listing**
----
  Returns array of active invoices as json.

* **URL**

  /invoices/[pagination, filtering and sorting parameters]

* **Method:**

  `GET`

*  **URL Params**

   **Optional:**
   * Pagination
     - `limit`: limit number of results (max: 50)
     - `page`: requests a specific page
     
   * Filtering
     - `year`: filters by `Invoice.ReferenceYear`
     - `month`: filters by `Invoice.ReferenceMonth`
     - `doc`: filters by `Invoice.Document`
     
   * Sorting: `/invoices/sort=[parameters separated by comma ',']`, `-` for descending order
     - `year`: sorts by `Invoice.ReferenceYear`
     - `month`: sorts by `Invoice.ReferenceMonth`
     - `doc`: sorts by `Invoice.Document`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    { "invoices": [
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
        },
        {
          "Id": 2,
          "CreatedAt": "2018-07-27T18:19:05.000Z",
          "ReferenceMonth": 2,
          "ReferenceYear": 2008,
          "Document": "a3b5df8sfhf",
          "Description": "Description of this new invoice.",
          "Amount": 100.90,
          "IsActive": 1,
          "DeactiveAt": "2020-12-12T14:12:12.000Z"
        }
      ]
    }
    ```

* **Error Response:**

  * No error. Invalid parameters are ignored.

* **Sample Call:**

  `http://localhost:3000/invoices`?token=mytoken&`month=12`&`year=2017`&`sort=-doc`&`page=1`&`limit=10`
  
  Read above call as "Return `page 1` limited to `10 results` containing active invoices with `ReferenceMonth=12` and `RerefenceYear=2017` sorted in `descending` order by `Document`.
  
* **Notes:**

  An active invoice has `IsActive=1`. Filters are `AND` conditions. Parameters order in URL do ***not*** matter.
  
**Add Invoice**
----
  Adds an invoice (data represented as json) to database.

* **URL**

  /invoices

* **Method:**

  `POST`

*  **Data Params (request body)**

   **Required: JSON following the format below** 
    ```
    {
      "ReferenceMonth": 4,
      "ReferenceYear": 2006,
      "Document": "a3b5df83hf",
      "Description": "Description of this invoice.",
      "Amount": 9999.90,
      "IsActive": 1,
      "DeactiveAt": "2020-12-12T14:12:12.000Z"
    }
    ```
   
   `DeactiveAt` and `Description` are optional.

* **Success Response:**

  * **Code:** 201 CREATED<br />
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
    
    Note that `Id` and `CreatedAt` are automatically generated and are ignored if passed in the request.

* **Error Response:**

  * **Code:** 400 BAD REQUEST<br />
    **Content:**
    ```
    {
      "errors": [
        {
          "param": <parameter that raised a validation error>,
          "msg": <validation error message>,
          "value": <given value>
        }
      ]
    }
    ```
    
    Example validation error response:
    ```
    {
      "errors": [
        {
          "param": "ReferenceMonth",
          "msg": "Month must be an integer between [1, 12]",
          "value": ""
        }
      ]
    }
    ```

* **Sample Call:**

  `http://localhost:3000/invoices?token=mytoken`
  
  **Body** (Method=`POST`):
  ```
    {
      "ReferenceMonth": 4,
      "ReferenceYear": 2006,
      "Document": "a3b5df83hf",
      "Description": "Description of this invoice.",
      "Amount": 9999.90,
      "IsActive": 1,
      "DeactiveAt": "2020-12-12T14:12:12.000Z"
    }
  ```
  
* **Notes:**

  Remember that only posts with JSON data are accepted.
  
**Update/Patch Invoice**
----
  Update/Patch an invoice (data represented as json) to database.

* **URL**

  /invoices/:id

* **Method:**

  `PUT`|`PATCH`

*  **URL Params**

   **Required:**

   `id=[integer]`

*  **Data Params (request body)**

   * **PUT:** same rules as `POST`
   * **PATCH:** same rules but only provided parameters are validate

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** 
    JSON representing an Invoice (same format as `POST` response) with `updated`|`patched` values.
    
    Note that `Id` and `CreatedAt` are automatically generated and are ignored if passed in the request.

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : ["Invoice not found"] }`
    
  OR
  
  * **Code:** 400 BAD REQUEST<br />
    **Content:**
    ```
    {
      "errors": [
        {
          "param": <parameter that raised a validation error>,
          "msg": <validation error message>,
          "value": <given value>
        }
      ]
    }
    ```

* **Sample Call:**

  `http://localhost:3000/invoices/id=1?token=mytoken`
  
  **Body** (Method=`PUT`|`PATCH`):
  ```
    {
      "ReferenceMonth": 4,
      "ReferenceYear": 2006,
      "Document": "a3b5df83hf",
      "Description": "Description of this invoice.",
      "Amount": 9999.90,
      "IsActive": 1,
      "DeactiveAt": "2020-12-12T14:12:12.000Z"
    }
  ```
  
* **Notes:**

  As expected, `PUT` will fully update the requested resource (i.e., parameters will be overriden) while `PATCH` will update only provided values.
  
**Delete Invoice**
----
  Delete an invoice (sets `IsActive=0`, logical deletion).

* **URL**

  /invoices/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Success Response:**

  * **Code:** 204 NO CONTENT <br />

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : ["Invoice not found"] }`

* **Sample Call:**

  `http://localhost:3000/invoices/1?token=myawesometoken`
  
* **Notes:**

  Deleting an invoice sets `IsActive=0` instead of physically deleting it from the database.
