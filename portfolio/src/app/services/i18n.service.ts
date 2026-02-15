import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Підтримувані мови сайту.
 * uk — українська, pl — польська, en — англійська.
 */
export type Lang = 'uk' | 'pl' | 'en';

/**
 * Словник перекладів для всіх текстових елементів інтерфейсу.
 */
export interface Translations {
  [key: string]: string;
}

/** Повний набір перекладів для кожної мови */
const TRANSLATIONS: Record<Lang, Translations> = {
  uk: {
    // Header
    'nav.home': 'Головна',
    'nav.blog': 'Блог',
    'nav.projects': 'Проєкти',

    // Home
    'home.title': 'Вітаю у моєму портфоліо',
    'home.subtitle': 'Тут зібрані мої проєкти, статті та активність розробки.',
    'home.featured': 'Актуальне',
    'home.featuredPosts': 'Пости',
    'home.featuredProjects': 'Проєкти',
    'home.lastActivity': 'Остання активність',

    // Blog
    'blog.title': 'Блог',
    'blog.loading': 'Завантаження постів...',
    'blog.empty': 'Поки що немає опублікованих постів.',
    'blog.featured': 'Закріплене',

    // Projects
    'projects.title': 'Проєкти',
    'projects.loading': 'Завантаження проєктів...',
    'projects.empty': 'Поки що немає опублікованих проєктів.',
    'projects.hint': '← Гортайте для перегляду →',
    'projects.featured': 'Закріплене',

    // Post detail
    'post.notFound': 'Пост не знайдено',
    'post.backToBlog': '← Повернутись до блогу',
    'post.back': '← Блог',
    'post.loading': 'Завантаження...',

    // Project detail
    'project.notFound': 'Проєкт не знайдено',
    'project.backToProjects': '← Повернутись до проєктів',
    'project.back': '← Проєкти',
    'project.loading': 'Завантаження...',
    'project.demo': '🌐 Демо',
    'project.repo': '📁 Репозиторій',
    'project.gallery': 'Галерея',
    'project.notTranslated': 'Не перекладено на',
    'project.viewDemo': 'Переглянути демо',
    'project.viewRepo': 'Переглянути репозиторій',

    // Search
    'search.back': '← Головна',
    'search.resultsFor': 'Результати для',
    'search.loading': 'Пошук...',
    'search.empty': 'Нічого не знайдено за тегом',
    'search.posts': 'Пости',
    'search.projects': 'Проєкти',

    // Heatmap
    'heatmap.title': 'Активність за рік',
    'heatmap.less': 'Менше',
    'heatmap.more': 'Більше',
    'heatmap.events': 'подій',
    'heatmap.noActivity': 'Немає активності',
    'heatmap.mon': 'Пн',
    'heatmap.wed': 'Ср',
    'heatmap.fri': 'Пт',
    'heatmap.months': 'Січ,Лют,Бер,Кві,Тра,Чер,Лип,Сер,Вер,Жов,Лис,Гру',
    'heatmap.dayActivity': 'Активність за',
    'heatmap.created': 'Створено',
    'heatmap.updated': 'Оновлено',
    'heatmap.post': 'Пост',
    'heatmap.project': 'Проєкт',

    // Admin
    'admin.title': 'Адмін-панель',
    'admin.logout': 'Вийти',
    'admin.posts': 'Пости',
    'admin.projects': 'Проєкти',
    'admin.newPost': '+ Новий пост',
    'admin.newProject': '+ Новий проєкт',
    'admin.name': 'Назва',
    'admin.status': 'Статус',
    'admin.date': 'Дата',
    'admin.actions': 'Дії',
    'admin.published': 'Опубліковано',
    'admin.draft': 'Чернетка',
    'admin.edit': 'Редагувати',
    'admin.delete': 'Видалити',
    'admin.noPosts': 'Немає постів. Створіть перший!',
    'admin.noProjects': 'Немає проєктів. Створіть перший!',

    // Login
    'login.title': 'Вхід в адмін-панель',
    'login.subtitle': 'Введіть свої облікові дані',
    'login.email': 'Email',
    'login.password': 'Пароль',
    'login.submit': 'Увійти',
    'login.loading': 'Вхід...',

    // Post form
    'postForm.new': 'Новий пост',
    'postForm.edit': 'Редагувати пост',
    'postForm.back': '← Дашборд',
    'postForm.titleLabel': 'Назва *',
    'postForm.titlePlaceholder': 'Введіть назву поста',
    'postForm.coverLabel': 'URL головного зображення *',
    'postForm.shortDescLabel': 'Короткий опис *',
    'postForm.shortDescPlaceholder': "Короткий опис для картки прев'ю",
    'postForm.contentLabel': 'Повний текст (Markdown) *',
    'postForm.contentPlaceholder': 'Підтримується Markdown розмітка...',
    'postForm.authorsLabel': 'Автори (через кому)',
    'postForm.tagsLabel': 'Хештеги (через кому)',
    'postForm.selectLanguages': 'Виберіть мови для заповнення',
    'postForm.langLabel': 'Мова контенту',
    'postForm.publish': 'Опублікувати',
    'postForm.featured': 'Актуальне (закріпити)',
    'postForm.cancel': 'Скасувати',
    'postForm.saving': 'Збереження...',
    'postForm.update': 'Оновити',
    'postForm.create': 'Створити',

    // Project form
    'projectForm.new': 'Новий проєкт',
    'projectForm.edit': 'Редагувати проєкт',
    'projectForm.back': '← Дашборд',
    'projectForm.titleLabel': 'Назва *',
    'projectForm.titlePlaceholder': 'Введіть назву проєкту',
    'projectForm.coverLabel': 'URL головного зображення *',
    'projectForm.shortDescLabel': 'Короткий опис *',
    'projectForm.shortDescPlaceholder': 'Короткий опис для картки проєкту',
    'projectForm.contentLabel': 'Повний опис (Markdown) *',
    'projectForm.contentPlaceholder': 'Підтримується Markdown розмітка...',
    'projectForm.demoLabel': 'URL демо (необов\'язково)',
    'projectForm.repoLabel': 'URL репозиторію (необов\'язково)',
    'projectForm.authorsLabel': 'Автори (через кому)',
    'projectForm.tagsLabel': 'Хештеги (через кому)',
    'projectForm.selectLanguages': 'Виберіть мови для заповнення',
    'projectForm.galleryLabel': 'Галерея (кожен URL на новому рядку)',
    'projectForm.projectDateLabel': 'Дата створення проєкту (необов\'язково)',
    'projectForm.publish': 'Опублікувати',
    'projectForm.featured': 'Актуальне (закріпити)',
    'projectForm.cancel': 'Скасувати',
    'projectForm.saving': 'Збереження...',
    'projectForm.update': 'Оновити',
    'projectForm.create': 'Створити',

    // Language names
    'lang.uk': 'UA',
    'lang.pl': 'PL',
    'lang.en': 'ENG',
    'lang.all': 'All',
  },

  pl: {
    // Header
    'nav.home': 'Strona główna',
    'nav.blog': 'Blog',
    'nav.projects': 'Projekty',

    // Home
    'home.title': 'Witaj w moim portfolio',
    'home.subtitle': 'Tutaj znajdziesz moje projekty, artykuły i aktywność.',
    'home.featured': 'Aktualne',
    'home.featuredPosts': 'Posty',
    'home.featuredProjects': 'Projekty',
    'home.lastActivity': 'Ostatnia aktywność',

    // Blog
    'blog.title': 'Blog',
    'blog.loading': 'Ładowanie postów...',
    'blog.empty': 'Brak opublikowanych postów.',
    'blog.featured': 'Przypięte',

    // Projects
    'projects.title': 'Projekty',
    'projects.loading': 'Ładowanie projektów...',
    'projects.empty': 'Brak opublikowanych projektów.',
    'projects.hint': '← Przewiń, aby zobaczyć więcej →',
    'projects.featured': 'Przypięte',

    // Post detail
    'post.notFound': 'Post nie znaleziony',
    'post.backToBlog': '← Wróć do bloga',
    'post.back': '← Blog',
    'post.loading': 'Ładowanie...',

    // Project detail
    'project.notFound': 'Projekt nie znaleziony',
    'project.backToProjects': '← Wróć do projektów',
    'project.back': '← Projekty',
    'project.loading': 'Ładowanie...',
    'project.demo': '🌐 Demo',
    'project.repo': '📁 Repozytorium',
    'project.gallery': 'Galeria',
    'project.notTranslated': 'Nie przetłumaczono na',
    'project.viewDemo': 'Zobacz demo',
    'project.viewRepo': 'Zobacz repozytorium',

    // Search
    'search.back': '← Strona główna',
    'search.resultsFor': 'Wyniki dla',
    'search.loading': 'Szukanie...',
    'search.empty': 'Nic nie znaleziono dla tagu',
    'search.posts': 'Posty',
    'search.projects': 'Projekty',

    // Heatmap
    'heatmap.title': 'Aktywność w ciągu roku',
    'heatmap.less': 'Mniej',
    'heatmap.more': 'Więcej',
    'heatmap.events': 'wydarzeń',
    'heatmap.noActivity': 'Brak aktywności',
    'heatmap.mon': 'Pn',
    'heatmap.wed': 'Śr',
    'heatmap.fri': 'Pt',
    'heatmap.months': 'Sty,Lut,Mar,Kwi,Maj,Cze,Lip,Sie,Wrz,Paź,Lis,Gru',
    'heatmap.dayActivity': 'Aktywność za',
    'heatmap.created': 'Utworzono',
    'heatmap.updated': 'Zaktualizowano',
    'heatmap.post': 'Post',
    'heatmap.project': 'Projekt',

    // Admin
    'admin.title': 'Panel administracyjny',
    'admin.logout': 'Wyloguj',
    'admin.posts': 'Posty',
    'admin.projects': 'Projekty',
    'admin.newPost': '+ Nowy post',
    'admin.newProject': '+ Nowy projekt',
    'admin.name': 'Nazwa',
    'admin.status': 'Status',
    'admin.date': 'Data',
    'admin.actions': 'Akcje',
    'admin.published': 'Opublikowany',
    'admin.draft': 'Szkic',
    'admin.edit': 'Edytuj',
    'admin.delete': 'Usuń',
    'admin.noPosts': 'Brak postów. Utwórz pierwszy!',
    'admin.noProjects': 'Brak projektów. Utwórz pierwszy!',

    // Login
    'login.title': 'Logowanie do panelu',
    'login.subtitle': 'Wprowadź swoje dane',
    'login.email': 'Email',
    'login.password': 'Hasło',
    'login.submit': 'Zaloguj',
    'login.loading': 'Logowanie...',

    // Post form
    'postForm.new': 'Nowy post',
    'postForm.edit': 'Edytuj post',
    'postForm.back': '← Panel',
    'postForm.titleLabel': 'Tytuł *',
    'postForm.titlePlaceholder': 'Wprowadź tytuł posta',
    'postForm.coverLabel': 'URL obrazu głównego *',
    'postForm.shortDescLabel': 'Krótki opis *',
    'postForm.shortDescPlaceholder': 'Krótki opis do karty podglądu',
    'postForm.contentLabel': 'Pełna treść (Markdown) *',
    'postForm.contentPlaceholder': 'Obsługiwany Markdown...',
    'postForm.authorsLabel': 'Autorzy (przez przecinek)',
    'postForm.tagsLabel': 'Hashtagi (przez przecinek)',
    'postForm.selectLanguages': 'Wybierz języki do wypełnienia',
    'postForm.langLabel': 'Język treści',
    'postForm.publish': 'Opublikuj',
    'postForm.featured': 'Aktualne (przypnij)',
    'postForm.cancel': 'Anuluj',
    'postForm.saving': 'Zapisywanie...',
    'postForm.update': 'Aktualizuj',
    'postForm.create': 'Utwórz',

    // Project form
    'projectForm.new': 'Nowy projekt',
    'projectForm.edit': 'Edytuj projekt',
    'projectForm.back': '← Panel',
    'projectForm.titleLabel': 'Nazwa *',
    'projectForm.titlePlaceholder': 'Wprowadź nazwę projektu',
    'projectForm.coverLabel': 'URL obrazu głównego *',
    'projectForm.shortDescLabel': 'Krótki opis *',
    'projectForm.shortDescPlaceholder': 'Krótki opis do karty projektu',
    'projectForm.contentLabel': 'Pełny opis (Markdown) *',
    'projectForm.contentPlaceholder': 'Obsługiwany Markdown...',
    'projectForm.demoLabel': 'URL demo (opcjonalnie)',
    'projectForm.repoLabel': 'URL repozytorium (opcjonalnie)',
    'projectForm.authorsLabel': 'Autorzy (przez przecinek)',
    'projectForm.tagsLabel': 'Hashtagi (przez przecinek)',
    'projectForm.selectLanguages': 'Wybierz języki do wypełnienia',
    'projectForm.galleryLabel': 'Galeria (każdy URL w nowej linii)',
    'projectForm.projectDateLabel': 'Data utworzenia projektu (opcjonalnie)',
    'projectForm.publish': 'Opublikuj',
    'projectForm.featured': 'Aktualne (przypnij)',
    'projectForm.cancel': 'Anuluj',
    'projectForm.saving': 'Zapisywanie...',
    'projectForm.update': 'Aktualizuj',
    'projectForm.create': 'Utwórz',

    // Language names
    'lang.uk': 'UA',
    'lang.pl': 'PL',
    'lang.en': 'ENG',
    'lang.all': 'All',
  },

  en: {
    // Header
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',

    // Home
    'home.title': 'Welcome to my portfolio',
    'home.subtitle': 'Here you can find my projects, articles and development activity.',
    'home.featured': 'Featured',
    'home.featuredPosts': 'Posts',
    'home.featuredProjects': 'Projects',
    'home.lastActivity': 'Recent activity',

    // Blog
    'blog.title': 'Blog',
    'blog.loading': 'Loading posts...',
    'blog.empty': 'No published posts yet.',
    'blog.featured': 'Pinned',

    // Projects
    'projects.title': 'Projects',
    'projects.loading': 'Loading projects...',
    'projects.empty': 'No published projects yet.',
    'projects.hint': '← Scroll to browse →',
    'projects.featured': 'Pinned',

    // Post detail
    'post.notFound': 'Post not found',
    'post.backToBlog': '← Back to blog',
    'post.back': '← Blog',
    'post.loading': 'Loading...',

    // Project detail
    'project.notFound': 'Project not found',
    'project.backToProjects': '← Back to projects',
    'project.back': '← Projects',
    'project.loading': 'Loading...',
    'project.demo': '🌐 Demo',
    'project.repo': '📁 Repository',
    'project.gallery': 'Gallery',
    'project.notTranslated': 'Not translated to',
    'project.viewDemo': 'View demo',
    'project.viewRepo': 'View repository',

    // Search
    'search.back': '← Home',
    'search.resultsFor': 'Results for',
    'search.loading': 'Searching...',
    'search.empty': 'Nothing found for tag',
    'search.posts': 'Posts',
    'search.projects': 'Projects',

    // Heatmap
    'heatmap.title': 'Activity over the year',
    'heatmap.less': 'Less',
    'heatmap.more': 'More',
    'heatmap.events': 'events',
    'heatmap.noActivity': 'No activity',
    'heatmap.mon': 'Mon',
    'heatmap.wed': 'Wed',
    'heatmap.fri': 'Fri',
    'heatmap.months': 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
    'heatmap.dayActivity': 'Activity on',
    'heatmap.created': 'Created',
    'heatmap.updated': 'Updated',
    'heatmap.post': 'Post',
    'heatmap.project': 'Project',

    // Admin
    'admin.title': 'Admin Panel',
    'admin.logout': 'Logout',
    'admin.posts': 'Posts',
    'admin.projects': 'Projects',
    'admin.newPost': '+ New post',
    'admin.newProject': '+ New project',
    'admin.name': 'Name',
    'admin.status': 'Status',
    'admin.date': 'Date',
    'admin.actions': 'Actions',
    'admin.published': 'Published',
    'admin.draft': 'Draft',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.noPosts': 'No posts. Create the first one!',
    'admin.noProjects': 'No projects. Create the first one!',

    // Login
    'login.title': 'Admin Login',
    'login.subtitle': 'Enter your credentials',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign in',
    'login.loading': 'Signing in...',

    // Post form
    'postForm.new': 'New post',
    'postForm.edit': 'Edit post',
    'postForm.back': '← Dashboard',
    'postForm.titleLabel': 'Title *',
    'postForm.titlePlaceholder': 'Enter post title',
    'postForm.coverLabel': 'Cover image URL *',
    'postForm.shortDescLabel': 'Short description *',
    'postForm.shortDescPlaceholder': 'Short description for preview card',
    'postForm.contentLabel': 'Full text (Markdown) *',
    'postForm.contentPlaceholder': 'Markdown supported...',
    'postForm.authorsLabel': 'Authors (comma-separated)',
    'postForm.tagsLabel': 'Hashtags (comma-separated)',
    'postForm.selectLanguages': 'Select languages to fill',
    'postForm.langLabel': 'Content language',
    'postForm.publish': 'Publish',
    'postForm.featured': 'Featured (pin)',
    'postForm.cancel': 'Cancel',
    'postForm.saving': 'Saving...',
    'postForm.update': 'Update',
    'postForm.create': 'Create',

    // Project form
    'projectForm.new': 'New project',
    'projectForm.edit': 'Edit project',
    'projectForm.back': '← Dashboard',
    'projectForm.titleLabel': 'Title *',
    'projectForm.titlePlaceholder': 'Enter project name',
    'projectForm.coverLabel': 'Cover image URL *',
    'projectForm.shortDescLabel': 'Short description *',
    'projectForm.shortDescPlaceholder': 'Short description for project card',
    'projectForm.contentLabel': 'Full description (Markdown) *',
    'projectForm.contentPlaceholder': 'Markdown supported...',
    'projectForm.demoLabel': 'Demo URL (optional)',
    'projectForm.repoLabel': 'Repository URL (optional)',
    'projectForm.authorsLabel': 'Authors (comma-separated)',
    'projectForm.tagsLabel': 'Hashtags (comma-separated)',
    'projectForm.selectLanguages': 'Select languages to fill',
    'projectForm.galleryLabel': 'Gallery (each URL on a new line)',
    'projectForm.projectDateLabel': 'Project creation date (optional)',
    'projectForm.publish': 'Publish',
    'projectForm.featured': 'Featured (pin)',
    'projectForm.cancel': 'Cancel',
    'projectForm.saving': 'Saving...',
    'projectForm.update': 'Update',
    'projectForm.create': 'Create',

    // Language names
    'lang.uk': 'UA',
    'lang.pl': 'PL',
    'lang.en': 'ENG',
    'lang.all': 'ALL',
  }
};

/**
 * Сервіс інтернаціоналізації (i18n).
 * Зберігає поточну мову інтерфейсу та надає переклади.
 * Мова зберігається у localStorage для збереження між сесіями.
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  /** Ключ для збереження мови у localStorage */
  private readonly STORAGE_KEY = 'portfolio_lang';

  /** Поточна мова (BehaviorSubject для реактивності) */
  private langSubject = new BehaviorSubject<Lang>(this.getSavedLang());

  /** Observable поточної мови */
  lang$ = this.langSubject.asObservable();

  /** Поточна мова (синхронний доступ) */
  get currentLang(): Lang {
    return this.langSubject.value;
  }

  /**
   * Змінити мову інтерфейсу.
   * @param lang — нова мова (uk, pl, en)
   */
  setLang(lang: Lang) {
    this.langSubject.next(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  /**
   * Отримати переклад за ключем.
   * @param key — ключ перекладу (наприклад, 'nav.home')
   * @returns перекладений рядок або сам ключ, якщо переклад не знайдено
   */
  t(key: string): string {
    return TRANSLATIONS[this.currentLang]?.[key] ?? key;
  }

  /**
   * Отримати збережену мову з localStorage або повернути 'uk' за замовчуванням.
   */
  private getSavedLang(): Lang {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'uk' || saved === 'pl' || saved === 'en') {
      return saved;
    }
    return 'uk';
  }
}
