# API Contracts - Cinema Schedule Viewer

This directory contains JSON Schema definitions for the cinema schedule viewer data structures.

## Schemas

### Core Entities

1. **movie.schema.json** - Movie entity definition
   - Validates movie data structure
   - Includes genres, ratings, and validation rules

2. **hall.schema.json** - Cinema hall entity definition
   - Validates hall configuration
   - Includes features and capacity constraints

3. **showtime.schema.json** - Showtime entity definition
   - Validates screening schedule entries
   - Ensures proper date/time formats

### Collections

4. **data-collections.schema.json** - Collection schemas
   - Defines arrays of entities
   - Ensures collection-level constraints

## Usage

### TypeScript Type Generation

Generate TypeScript types from schemas:

```bash
npm install -D json-schema-to-typescript

npx json2ts contracts/movie.schema.json > src/types/movie.ts
npx json2ts contracts/hall.schema.json > src/types/hall.ts
npx json2ts contracts/showtime.schema.json > src/types/showtime.ts
```

### Validation

Validate JSON data files against schemas:

```javascript
import Ajv from 'ajv';
import movieSchema from './contracts/movie.schema.json';
import moviesData from './data/movies.json';

const ajv = new Ajv();
const validate = ajv.compile(movieSchema);

moviesData.forEach(movie => {
  const valid = validate(movie);
  if (!valid) {
    console.error('Validation errors:', validate.errors);
  }
});
```

## Data Files Location

The actual JSON data files should be placed in:
- `/public/data/movies.json`
- `/public/data/halls.json`
- `/public/data/schedule.json`

## Sample Data Structure

See individual schema files for `examples` sections containing valid sample data.