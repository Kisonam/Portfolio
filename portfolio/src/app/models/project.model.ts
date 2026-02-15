/**
 * Переклади контенту для однієї мови
 */
export interface ProjectTranslation {
  /** Назва проєкту */
  title: string;

  /** Короткий опис проєкту для картки */
  shortDescription: string;

  /** Повний опис проєкту (підтримує Markdown або HTML) */
  content: string;
}

/**
 * Інтерфейс для проєкту.
 * Описує структуру документа в колекції 'projects' у Firestore.
 */
export interface Project {
  /** Унікальний ідентифікатор документа у Firestore */
  id?: string;

  /** URL головного зображення проєкту */
  coverImage: string;

  /** Переклади контенту на різні мови */
  translations: {
    uk?: ProjectTranslation;
    pl?: ProjectTranslation;
    en?: ProjectTranslation;
  };

  /** Масив URL додаткових фото для галереї */
  gallery: string[];

  /** Хештеги для фільтрації та пошуку */
  tags: string[];

  /** Посилання на живий сайт або демо */
  liveUrl?: string;

  /** Посилання на репозиторій */
  repoUrl?: string;

  /** Список авторів/учасників проєкту */
  authors: string[];

  /** Дата створення проєкту (Firestore Timestamp) */
  createdAt: Date;

  /** Дата останнього редагування проєкту (Firestore Timestamp) */
  updatedAt: Date;

  /** Чи опублікований проєкт */
  published: boolean;

  /** Доступні мови для цього проєкту */
  availableLanguages: string[];

  /** Чи є проєкт актуальним (закріпленим) */
  featured?: boolean;

  /** Дата проєкту (коли був створений/завершений) */
  projectDate?: string;

  // Старі поля для зворотної сумісності (deprecated)
  /** @deprecated Використовуйте translations.uk.title */
  title?: string;
  /** @deprecated Використовуйте translations.uk.shortDescription */
  shortDescription?: string;
  /** @deprecated Використовуйте translations.uk.content */
  content?: string;
}
