/**
 * Переклади контенту для однієї мови
 */
export interface PostTranslation {
  /** Назва поста */
  title: string;

  /** Короткий опис для прев'ю картки */
  shortDescription: string;

  /** Повний текст поста (підтримує Markdown або HTML) */
  content: string;
}

/**
 * Інтерфейс для блог-поста.
 * Описує структуру документа в колекції 'posts' у Firestore.
 */
export interface Post {
  /** Унікальний ідентифікатор документа у Firestore */
  id?: string;

  /** URL головного зображення поста */
  coverImage: string;

  /** Переклади контенту на різні мови */
  translations: {
    uk?: PostTranslation;
    pl?: PostTranslation;
    en?: PostTranslation;
  };

  /** Список авторів поста (масив рядків) */
  authors: string[];

  /** Хештеги для фільтрації та пошуку */
  tags: string[];

  /** Дата створення поста (Firestore Timestamp) */
  createdAt: Date;

  /** Дата останнього редагування поста (Firestore Timestamp) */
  updatedAt: Date;

  /** Чи опублікований пост (для чернеток в адмін-панелі) */
  published: boolean;

  /** Доступні мови для цього поста */
  availableLanguages: string[];

  /** Чи є пост актуальним (закріпленим) */
  featured?: boolean;

  // Старі поля для зворотної сумісності (deprecated)
  /** @deprecated Використовуйте translations.uk.title */
  title?: string;
  /** @deprecated Використовуйте translations.uk.shortDescription */
  shortDescription?: string;
  /** @deprecated Використовуйте translations.uk.content */
  content?: string;
}
