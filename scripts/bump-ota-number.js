const fs = require('node:fs');
const path = require('node:path');

const [variant, environment] = process.argv.slice(2);

if (!variant || !environment) {
  console.error('Usage: node scripts/bump-ota-number.js <variant> <environment>');
  process.exit(1);
}

const configPath = path.join(process.cwd(), 'apps', variant, 'config.js');

if (!fs.existsSync(configPath)) {
  console.error(`Variant config not found: ${configPath}`);
  process.exit(1);
}

const fieldName =
  environment === 'production' ? 'otaUpdateNumberProd' : 'otaUpdateNumberDev';

const source = fs.readFileSync(configPath, 'utf8');
const pattern = new RegExp(`(${fieldName}:\\s*")(\\d+)(")`);
const match = source.match(pattern);

if (!match) {
  console.error(`Could not find ${fieldName} in ${configPath}`);
  process.exit(1);
}

const nextValue = String(Number(match[2]) + 1);
const updated = source.replace(pattern, `$1${nextValue}$3`);

fs.writeFileSync(configPath, updated);
console.log(`${variant} ${fieldName} -> ${nextValue}`);

