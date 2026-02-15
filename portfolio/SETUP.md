# Налаштування проєкту

## Environment файли

Для роботи проєкту потрібно створити файли конфігурації Firebase.

### Крок 1: Створення environment файлів

1. Скопіюйте template файл для development:
```bash
cp src/environments/environment.template.ts src/environments/environment.ts
```

2. Скопіюйте template файл для production:
```bash
cp src/environments/environment.template.ts src/environments/environment.prod.ts
```

### Крок 2: Налаштування Firebase credentials

1. Відкрийте [Firebase Console](https://console.firebase.google.com/)
2. Виберіть свій проєкт
3. Перейдіть в Project Settings (⚙️)
4. Скопіюйте Firebase configuration
5. Вставте дані в обидва файли:
   - `src/environments/environment.ts` (для development)
   - `src/environments/environment.prod.ts` (для production)

### Приклад environment.ts:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSy...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
  }
};
```

### Приклад environment.prod.ts:

```typescript
export const environment = {
  production: true,  // ⚠️ Змініть на true для production
  firebaseConfig: {
    // Ті самі дані що й у environment.ts
    apiKey: "AIzaSy...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
  }
};
```

## Запуск проєкту

### Development:
```bash
npm install
npm start
```

### Production build:
```bash
npm run build
```

### Deploy на Vercel:
1. Додайте environment змінні в Vercel Dashboard
2. Push код в Git
3. Vercel автоматично задеплоїть проєкт

## Важливо! 🔒

- ❌ **НЕ** комітьте файли `environment.ts` та `environment.prod.ts` в Git
- ✅ Вони вже додані в `.gitignore`
- ✅ Використовуйте environment змінні в Vercel для production
