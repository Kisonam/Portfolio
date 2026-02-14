/**
 * Інтерфейс для проєкту.
 * Описує структуру документа в колекції 'projects' у Firestore.
 */
export interface Project {
  /** Унікальний ідентифікатор документа у Firestore */
  id?: string;

  /** Назва проєкту */
  title: string;

  /** URL головного зображення проєкту */
  coverImage: string;

  /** Короткий опис проєкту для картки */
  shortDescription: string;

  /** Повний опис проєкту (підтримує Markdown або HTML) */
  content: string;

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

  /** Мова контенту проєкту (uk, pl, en) */
  lang?: string;

  /** Чи є проєкт актуальним (закріпленим) */
  featured?: boolean;

  /** Дата створення проєкту (день/місяць/рік, необов'язково) */
  projectDate?: string;
}
