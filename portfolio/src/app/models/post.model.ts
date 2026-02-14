/**
 * Інтерфейс для блог-поста.
 * Описує структуру документа в колекції 'posts' у Firestore.
 */
export interface Post {
  /** Унікальний ідентифікатор документа у Firestore */
  id?: string;

  /** Назва поста */
  title: string;

  /** URL головного зображення поста */
  coverImage: string;

  /** Короткий опис для прев'ю картки */
  shortDescription: string;

  /** Повний текст поста (підтримує Markdown або HTML) */
  content: string;

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

  /** Мова контенту поста (uk, pl, en) */
  lang?: string;

  /** Чи є пост актуальним (закріпленим) */
  featured?: boolean;
}
