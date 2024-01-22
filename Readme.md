# RSS Feed Reader with Node.js and Express

This is a simple Node.js and Express application that fetches and parses an RSS feed, allowing you to specify the number of entries and sort them in descending order by `pubDate`.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

```bash
# Install dependencies
npm install
```

### Running the Application
```bash
# Run the application
node app.js
```

## Usage
Endpoint
```bash
GET /get-feed?url=RSS_FEED_URL&count=NUMBER_OF_ENTRIES
```
Replace RSS_FEED_URL with the actual URL of the RSS feed you want to fetch.
Optionally, you can include count in the query parameters to specify the number of entries to return.
## Example
```bash
# Fetch the RSS feed, return up to 5 entries, and sort them by pubDate
curl "http://localhost:3000/get-feed?url=https://example.com/rss-feed&count=5"
```

## CORS Configuration
The application includes CORS headers to allow requests from all origins.

## Dependencies
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- axios: Promise-based HTTP client for the browser and Node.js.
- xml2js: XML to JavaScript object converter.
## License
This project is licensed under the MIT License.
