# ZentStay College Search & Discovery Architecture

## 1. Overview
ZentStay's College section has been redesigned from an unmanageable all-college listing into a **Search-First, Pincode-Aware, and Geolocation-Based Finder**. The database contains ~37,580 master AISHE records from the official Government of India dataset. The UI ensures no full-table dumping occurs on page load.

---

## 2. API Endpoints & Query Model

### `GET /api/v1/colleges`
Fetches colleges with support for full-text search, pincode filtering, geolocation nearest-first ordering, and popular curation.

#### Query Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `search` | string | `undefined` | Case-insensitive multi-field search against `name`, `shortName`, `city`, `state`. If 6-digit number, also matches property pincodes. |
| `pincode` | string | `undefined` | Filters colleges that have linked student properties with the specified 6-digit pincode. |
| `popular` | boolean | `false` | When `true`, returns only colleges that have active verified properties in the database. |
| `lat` | float | `undefined` | Latitude of user's current location. |
| `lng` | float | `undefined` | Longitude of user's current location. |
| `radius` | float | `50` | Radius in kilometers for geolocation search. |
| `city` | string | `undefined` | Exact/case-insensitive filter for district/city. |
| `state` | string | `undefined` | Exact/case-insensitive filter for state. |
| `page` | integer | `1` | Page number for pagination. |
| `limit` | integer | `20` (frontend uses 12) | Number of records per page. |

---

## 3. Geolocation & Distance Calculation
Nearby colleges are computed using the standard **Haversine Formula**:
$$\Delta\sigma = 2 \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)}\right)$$
$$d = R \cdot \Delta\sigma$$
where $R = 6371\text{ km}$.

- When `lat` and `lng` are provided in the request, the backend queries colleges with non-null coordinates, computes the distance in km, filters by `radius`, and sorts results ascending by distance.
- The computed `distance` is attached to each college item in the response payload (e.g., `distance: 2.4`).

---

## 4. Pincode Search Strategy & AISHE Limitations
- **AISHE Data Constraint:** The official Government AISHE dataset does not contain postal pincodes for institutions (it provides State Name and District Name).
- **ZentStay Strategy:** 
  1. Searches for colleges with student properties located at that pincode.
  2. If the user enters a pincode in the universal search bar, it attempts both property pincode matching and keyword matching.
  3. No artificial coordinates or fake pincodes are fabricated into the master AISHE dataset.

---

## 5. Frontend Discovery UX Features
1. **Search Hero:** Prominent centered search bar with instant clear (X) button, mode toggle (All / By Pincode / Near Me), and 400ms debouncing.
2. **Recent Searches:** Automatically stores the last 5 unique queries in `localStorage` for one-click re-searching.
3. **Popular Hubs Showcase:** Initial state renders verified colleges with live properties (AKGEC, ABES, KIET, GL Bajaj, IMS) instead of 37,580 random entries.
4. **Geolocation ("Near Me"):** Prompts for browser GPS permission, handles permission denial/timeouts with friendly user guidance, and displays `📍 X.X km` tags on result cards.
5. **Property Linking ("Find Stays"):** Each college card links directly to `/properties?collegeId=${college.id}`, which instantly filters PGs linked to that campus.
6. **Mobile Optimization:** Responsive grid layout tested and optimized across 360px, 390px, 430px, and desktop viewports without horizontal scroll.
