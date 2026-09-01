# ZentStay API Inventory

## 1. College Endpoints

### Get All Colleges (Search-First, Geolocation, Pincode)
- **Method:** `GET`
- **Endpoint:** `/api/v1/colleges`
- **Access:** Public
- **Query Parameters:**
  - `search` (optional): string - Multi-token text search (`name`, `shortName`, `city`, `state`).
  - `pincode` (optional): string - Filter colleges with properties at this 6-digit pincode.
  - `popular` (optional): boolean - Filter colleges with active properties.
  - `lat` (optional): float - User latitude for Haversine distance calculation.
  - `lng` (optional): float - User longitude for Haversine distance calculation.
  - `radius` (optional): float - Geolocation radius in km (default: 50).
  - `city` (optional): string - District / city filter.
  - `state` (optional): string - State filter.
  - `page` (optional): number - Page number (default: 1).
  - `limit` (optional): number - Items per page.
- **Response:**
  ```json
  {
    "success": true,
    "count": 12,
    "data": [
      {
        "id": "uuid",
        "name": "Ajay Kumar Garg Engineering College",
        "shortName": "AKGEC",
        "slug": "akgec",
        "city": "Ghaziabad",
        "state": "Uttar Pradesh",
        "distance": 2.4,
        "verified": true,
        "_count": { "properties": 4 }
      }
    ],
    "pagination": {
      "total": 12,
      "page": 1,
      "limit": 12,
      "totalPages": 1
    }
  }
  ```

### Get College by Slug
- **Method:** `GET`
- **Endpoint:** `/api/v1/colleges/slug/:slug`
- **Access:** Public
- **Response:** `{ "success": true, "data": CollegeWithProperties }`

### Get College by ID
- **Method:** `GET`
- **Endpoint:** `/api/v1/colleges/:id`
- **Access:** Public

---

## 2. Property Endpoints

### Get All Properties (with College & Pincode Filter)
- **Method:** `GET`
- **Endpoint:** `/api/v1/properties`
- **Access:** Public
- **Query Parameters:**
  - `collegeId` (optional): string - Filter properties linked to a specific college.
  - `pincode` (optional): string - Filter by postal pincode.
  - `search` (optional): string - Search title, address, description.
  - `city` (optional): string.
  - `gender` (optional): `BOYS` | `GIRLS` | `UNISEX`.
  - `roomType` (optional): `SINGLE` | `DOUBLE` | `TRIPLE`.
  - `furnishing` (optional): `FURNISHED` | `SEMI_FURNISHED` | `UNFURNISHED`.
  - `minRent`, `maxRent` (optional): number.
  - `page`, `limit`, `sort` (optional).
