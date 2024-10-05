const fs = require('fs');

fs.copyFileSync('apps/backend/.env', 'dist/apps/backend/.env');
