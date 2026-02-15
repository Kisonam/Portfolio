/**
 * Скрипт для генерації environment.ts файлів з environment variables
 * Використовується під час build на Vercel
 */
const fs = require('fs');
const path = require('path');

// Шлях до директорії environments
const envDir = path.join(__dirname, '../src/environments');

// Перевіряємо чи існує директорія
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Функція для створення environment файлу
function createEnvFile(isProduction) {
  // Отримуємо значення з environment variables
  const apiKey = process.env.apiKey || '';
  const authDomain = process.env.authDomain || '';
  const projectId = process.env.projectId || '';
  const storageBucket = process.env.storageBucket || '';
  const messagingSenderId = process.env.messagingSenderId || '';
  const appId = process.env.appId || '';

  const envContent = `export const environment = {
  production: ${isProduction},
  firebaseConfig: {
    apiKey: '${apiKey}',
    authDomain: '${authDomain}',
    projectId: '${projectId}',
    storageBucket: '${storageBucket}',
    messagingSenderId: '${messagingSenderId}',
    appId: '${appId}'
  }
};
`;

  const fileName = isProduction ? 'environment.prod.ts' : 'environment.ts';
  const filePath = path.join(envDir, fileName);

  fs.writeFileSync(filePath, envContent);
  console.log(`✅ Created ${fileName}`);
}

// Створюємо обидва файли
createEnvFile(false); // environment.ts
createEnvFile(true);  // environment.prod.ts

console.log('🎉 Environment files generated successfully!');
