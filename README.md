# Acme Secret Santa

A Next.js application for managing Secret Santa assignments in a company setting. This application allows for uploading employee data, considering previous year's assignments, and generating new Secret Santa assignments while following specific rules and constraints.

## Features

- Upload employee data via CSV
- Upload previous year's assignments (optional)
- Generate Secret Santa assignments following rules:
  - No self-assignments
  - No repeat assignments from previous year
  - One-to-one matching
- Download assignments as CSV
- Preview assignments in the UI
- Error handling and validation
- Responsive design

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Papa Parse for CSV handling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## CSV File Format

### Employee Data CSV

```csv
Employee_Name,Employee_EmailID
John Doe,john@acme.com
Jane Smith,jane@acme.com
```

### Previous Assignments CSV (Optional)

```csv
Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID
John Doe,john@acme.com,Jane Smith,jane@acme.com
```

## Testing

Run the test suite:

```bash
npm run test
```

## Project Structure

- `/app` - Next.js application routes and pages
- `/components` - React components including shadcn/ui components
- `/lib` - Core business logic and utilities
- `/types` - TypeScript type definitions

## Error Handling

The application includes comprehensive error handling for:

- Invalid CSV files
- Missing required data
- Assignment generation failures
- File upload issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
