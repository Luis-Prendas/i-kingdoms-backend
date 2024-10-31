// copy-file.js
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/knex/prod.sqlite3');
const destPath = path.join(__dirname, '../dist/knex/prod.sqlite3');

if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('Archivo copiado correctamente.');
} else {
    console.log('Archivo no encontrado, no se realizó la copia.');
}
