const fs = require('fs');

fs.copyFileSync('.env', 'dist/apps/backend/.env');
