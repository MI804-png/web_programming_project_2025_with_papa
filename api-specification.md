# API Specification for AJAX Task

The following page contains a web service (API) with the following features:
**URL:** [http://gamf.nhely.hu/ajax2/](http://gamf.nhely.hu/ajax2/)

## General Information
- The API reads/writes from the database in the background.
- It implements CRUD operations: Create, Read, Update, Delete.
- It accepts POST requests with parameters.
- All data in the table is of type `String (VARCHAR)` to avoid type matching issues.
- The `code` parameter must be sent with every request, identifying the user.
- The `code` parameter should be in the form of: `BBBBBBefg456`, where:
  - `BBBBBB` is the student's Neptun code.
  - `efg456` is a custom code invented by the student.

### CRUD Operations

#### **Read**
- **Parameters:**
  - `op=read`
  - `code`
- **Description:** Queries the data of the database table.
- **Response:** Returns the following data in JSON format:
  ```json
  {
    "rowCount": 3,
    "maxNum": 100,
    "list": [
      {
        "id": 1,
        "name": "John Doe",
        "height": "180",
        "weight": "75",
        "code": "BBBBBBefg456"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "height": "165",
        "weight": "60",
        "code": "BBBBBBefg456"
      },
      {
        "id": 3,
        "name": "Alice Johnson",
        "height": "170",
        "weight": "68",
        "code": "BBBBBBefg456"
      }
    ]
  }  ```

#### 2. **Create**
- **Parameters:**
  - `op=create`
  - `name`
  - `height`
  - `weight`
  - `code`
- **Description:** Inserts a record formed from the first 100 characters of the `name`, `height`, `weight`, and `code` parameters into the table.
- **Response:** Returns the number of records affected (0 or 1).

#### 3. **Update**
- **Parameters:**
  - `op=update`
  - `id`
  - `name`
  - `height`
  - `weight`
  - `code`
- **Description:** Modifies the record with the given `id` and `code` with the new values provided.
- **Response:** Returns the number of records affected (0 or 1).

#### 4. **Delete**
- **Parameters:**
  - `op=delete`
  - `id`
  - `code`
- **Description:** Deletes the record with the given `id` and `code`.
- **Response:** Returns the number of records affected (0 or 1).

## Notes
- The `code` parameter ensures that only rows belonging to the student's code are accessible.
- The maximum number of records returned in a single request is 100.