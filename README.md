# AI-Powered CSV Importer

An AI-powered CSV importer built for the GrowEasy Software Developer Assignment.

The application accepts CSV files with different column names and structures and intelligently maps lead information into the GrowEasy CRM format using Gemini AI.

## Features

- CSV file upload using drag and drop or file picker
- CSV data preview before import
- Responsive table with horizontal and vertical scrolling
- Sticky table headers
- AI-powered intelligent CRM field mapping
- Batch processing of CSV records
- Support for arbitrary CSV column names
- CRM status normalization
- Data source normalization
- Multiple email and mobile number handling
- Invalid record skipping
- Imported and skipped record statistics
- Display of parsed CRM records
- Display of skipped records
- Error handling

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- PapaParse

### Backend

- Node.js
- Express.js
- TypeScript
- Multer
- csv-parse

### AI

- Google Gemini 2.5 Flash

## CRM Fields

The AI extracts the following fields:

- `created_at`
- `name`
- `email`
- `country_code`
- `mobile_without_country_code`
- `company`
- `city`
- `state`
- `country`
- `lead_owner`
- `crm_status`
- `crm_note`
- `data_source`
- `possession_time`
- `description`

## Project Structure

```text
groweasy-ai-csv-importer/
├── frontend/
│   ├── app/
│   ├── components/
│   └── types/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── prompts/
│       ├── routes/
│       ├── services/
│       ├── types/
│       └── utils/
│
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/MauryaShubhamkumar/groweasy-ai-csv-importer.git
cd groweasy-ai-csv-importer
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Application Flow

1. Upload a valid CSV file.
2. Preview the parsed CSV records.
3. Confirm the import.
4. The CSV is sent to the backend.
5. Records are processed in batches.
6. Gemini AI intelligently maps arbitrary CSV fields to GrowEasy CRM fields.
7. Invalid records without an email or mobile number are skipped.
8. Parsed and skipped records are displayed with import statistics.

## API

### Import CSV

```http
POST /api/import
```

Request type:

```text
multipart/form-data
```

Form field:

```text
file
```

The API returns parsed CRM records, skipped records, total imported records, and total skipped records.

## Additional Implementations

- Drag and drop CSV upload
- AI processing progress indicator
- Incremental CSV parsing
- Retry mechanism for failed AI batches
- Virtualized CSV preview table for large datasets
- Dark mode
- Deployment using Vercel and Render


## Author

**Shubham Kumar Maurya**

B.Tech Computer Science  
Indian Institute of Technology Jammu
