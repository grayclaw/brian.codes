import fs from 'fs';

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./public/planets.json', 'utf-8'));

// Convert array to Map
const systemMap = new Map(data.map((obj) => [obj.system, obj]));

// Convert Map back to an object (since JSON doesn’t support Maps directly)
const mapAsObject = Object.fromEntries(systemMap);

// Write to new JSON file
fs.writeFileSync('output.json', JSON.stringify(mapAsObject, null, 2));

console.log('✅ Conversion complete! Check output.json');
