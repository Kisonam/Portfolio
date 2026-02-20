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
    'nav.about': 'Про мене',
    'nav.tools': 'Інструменти',

    // Tools page
    'tools.title': 'Інструменти',
    'tools.subtitle': 'Програми які я використовую для роботи',
    'tools.empty': 'Інструментів поки немає.',
    'tools.viewDetails': 'Детальніше',
    'tools.hours': 'год',
    'tools.minutes': 'хв',
    'tools.hoursUsed': 'Час використання',
    'tools.totalHours': 'Загально годин',
    'tools.purpose': 'Для чого використовую',
    'tools.notes': 'Нотатки',
    'tools.openWebsite': 'Відкрити сайт',
    'tools.filter.all': 'Всі',

    // Tool form
    'toolForm.newTitle': 'Новий інструмент',
    'toolForm.editTitle': 'Редагувати інструмент',
    'toolForm.back': '← Дашборд',
    'toolForm.general': 'Основна інформація',
    'toolForm.name': 'Назва',
    'toolForm.category': 'Категорія',
    'toolForm.icon': 'Іконка (URL)',
    'toolForm.iconHint': 'PNG/SVG логотип програми',
    'toolForm.websiteUrl': 'Сайт (URL)',
    'toolForm.hoursUsed': 'Годин використання',
    'toolForm.pinned': 'Закріпити на головній',
    'toolForm.purpose': 'Для чого використовую',
    'toolForm.purposePlaceholder': 'Опишіть для чого використовуєте цю програму...',
    'toolForm.notes': 'Нотатки / Результати',
    'toolForm.notesHint': 'Додайте нотатки або результати використання',
    'toolForm.note': 'Нотатка',
    'toolForm.noteTitle': 'Заголовок',
    'toolForm.noteTitlePlaceholder': 'Назва нотатки...',
    'toolForm.noteDesc': 'Опис',
    'toolForm.noteDescPlaceholder': 'Деталі...',
    'toolForm.addNote': 'Додати нотатку',
    'toolForm.save': 'Зберегти',
    'toolForm.saving': 'Збереження...',
    'toolForm.saved': 'Збережено!',
    'toolForm.error': 'Помилка збереження',
    'toolForm.delete': 'Видалити',
    'toolForm.confirmDelete': 'Видалити цей інструмент?',
    'admin.tools': 'Інструменти',

    // About page
    'about.bio': 'Про мене',
    'about.skills': 'Навички',
    'about.experience': 'Досвід',
    'about.education': 'Освіта',
    'about.empty': 'Сторінка "Про мене" ще не заповнена.',

    // About form
    'aboutForm.title': 'Редагувати "Про мене"',
    'aboutForm.back': '← Дашборд',
    'aboutForm.general': 'Загальна інформація',
    'aboutForm.photo': 'URL фото',
    'aboutForm.photoPlaceholder': 'https://example.com/photo.jpg',
    'aboutForm.translations': 'Текстовий контент',
    'aboutForm.name': 'Ім\'я',
    'aboutForm.namePlaceholder': 'Ваше ім\'я',
    'aboutForm.jobTitle': 'Посада / Спеціальність',
    'aboutForm.jobTitlePlaceholder': 'Frontend Developer',
    'aboutForm.bio': 'Про мене (текст)',
    'aboutForm.bioPlaceholder': 'Розкажіть про себе...',
    'aboutForm.skills': 'Навички',
    'aboutForm.skillsHint': 'Введіть навички через кому',
    'aboutForm.skillCategory': 'Категорія (напр. Frontend)',
    'aboutForm.skillsPlaceholder': 'React, TypeScript, SCSS...',
    'aboutForm.addSkillGroup': 'Додати групу навичок',
    'aboutForm.experience': 'Досвід роботи',
    'aboutForm.experienceItem': 'Досвід',
    'aboutForm.role': 'Посада',
    'aboutForm.rolePlaceholder': 'Frontend Developer',
    'aboutForm.company': 'Компанія',
    'aboutForm.companyPlaceholder': 'Company Name',
    'aboutForm.period': 'Період',
    'aboutForm.description': 'Опис',
    'aboutForm.descriptionPlaceholder': 'Що ви робили...',
    'aboutForm.addExperience': 'Додати досвід',
    'aboutForm.education': 'Освіта',
    'aboutForm.educationItem': 'Освіта',
    'aboutForm.degree': 'Ступінь / Спеціальність',
    'aboutForm.degreePlaceholder': 'Бакалавр комп\'ютерних наук',
    'aboutForm.institution': 'Навчальний заклад',
    'aboutForm.institutionPlaceholder': 'Університет...',
    'aboutForm.addEducation': 'Додати освіту',
    'aboutForm.profileName': 'Назва профілю',
    'aboutForm.profileNameHint': 'Інтерна назва для розрізнення профілів',
    'aboutForm.newTitle': 'Новий профіль',
    'aboutForm.editTitle': 'Редагувати профіль',
    'aboutForm.delete': 'Видалити профіль',
    'aboutForm.save': 'Зберегти',
    'aboutForm.saving': 'Збереження...',
    'aboutForm.saved': 'Збережено!',
    'aboutForm.error': 'Помилка збереження',

    // Admin about link
    'admin.about': 'Про мене',
    'admin.newTool': 'Новий інструмент',
    'admin.noTools': 'Інструментів поки немає.',
    'admin.newProfile': 'Новий профіль',
    'admin.noProfiles': 'Профілів поки немає.',

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

    // Settings
    'settings.title': 'Налаштування',
    'settings.back': '← Дашборд',
    'settings.pageVisibility': 'Видимість сторінок',
    'settings.pageVisibilityDesc': 'Керуйте видимістю сторінок на сайті. Виключені сторінки будуть недоступні для відвідувачів.',
    'settings.blogPage': 'Сторінка "Блог"',
    'settings.blogPageDesc': 'Показувати сторінку з постами блогу',
    'settings.projectsPage': 'Сторінка "Проєкти"',
    'settings.projectsPageDesc': 'Показувати сторінку з проєктами',
    'settings.aboutPage': 'Сторінка "Про мене"',
    'settings.aboutPageDesc': 'Показувати сторінку про мене',
    'settings.gamesPage': 'Сторінка "Ігри"',
    'settings.gamesPageDesc': 'Показувати сторінку з іграми',
    'settings.saved': 'Налаштування збережено!',
    'settings.error': 'Помилка збереження',
    'settings.loading': 'Завантаження налаштувань...',

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
    'nav.about': 'O mnie',
    'nav.tools': 'Narzędzia',

    // Tools page
    'tools.title': 'Narzędzia',
    'tools.subtitle': 'Programy których używam do pracy',
    'tools.empty': 'Brak narzędzi.',
    'tools.viewDetails': 'Szczegóły',
    'tools.hours': 'godz',
    'tools.minutes': 'min',
    'tools.hoursUsed': 'Czas użycia',
    'tools.totalHours': 'Razem godzin',
    'tools.purpose': 'Do czego używam',
    'tools.notes': 'Notatki',
    'tools.openWebsite': 'Otwórz stronę',
    'tools.filter.all': 'Wszystkie',

    // Tool form
    'toolForm.newTitle': 'Nowe narzędzie',
    'toolForm.editTitle': 'Edytuj narzędzie',
    'toolForm.back': '← Panel',
    'toolForm.general': 'Informacje ogólne',
    'toolForm.name': 'Nazwa',
    'toolForm.category': 'Kategoria',
    'toolForm.icon': 'Ikona (URL)',
    'toolForm.iconHint': 'Logo PNG/SVG programu',
    'toolForm.websiteUrl': 'Strona (URL)',
    'toolForm.hoursUsed': 'Godziny użycia',
    'toolForm.pinned': 'Przypnij na stronie głównej',
    'toolForm.purpose': 'Do czego używam',
    'toolForm.purposePlaceholder': 'Opisz do czego używasz tego programu...',
    'toolForm.notes': 'Notatki / Wyniki',
    'toolForm.notesHint': 'Dodaj notatki lub wyniki użycia',
    'toolForm.note': 'Notatka',
    'toolForm.noteTitle': 'Tytuł',
    'toolForm.noteTitlePlaceholder': 'Nazwa notatki...',
    'toolForm.noteDesc': 'Opis',
    'toolForm.noteDescPlaceholder': 'Szczegóły...',
    'toolForm.addNote': 'Dodaj notatkę',
    'toolForm.save': 'Zapisz',
    'toolForm.saving': 'Zapisywanie...',
    'toolForm.saved': 'Zapisano!',
    'toolForm.error': 'Błąd zapisu',
    'toolForm.delete': 'Usuń',
    'toolForm.confirmDelete': 'Usunąć to narzędzie?',
    'admin.tools': 'Narzędzia',

    // About page
    'about.bio': 'O mnie',
    'about.skills': 'Umiejętności',
    'about.experience': 'Doświadczenie',
    'about.education': 'Wykształcenie',
    'about.empty': 'Strona "O mnie" nie jest jeszcze wypełniona.',

    // About form
    'aboutForm.title': 'Edytuj "O mnie"',
    'aboutForm.back': '← Panel',
    'aboutForm.general': 'Informacje ogólne',
    'aboutForm.photo': 'URL zdjęcia',
    'aboutForm.photoPlaceholder': 'https://example.com/photo.jpg',
    'aboutForm.translations': 'Treść tekstowa',
    'aboutForm.name': 'Imię i nazwisko',
    'aboutForm.namePlaceholder': 'Twoje imię',
    'aboutForm.jobTitle': 'Stanowisko / Specjalizacja',
    'aboutForm.jobTitlePlaceholder': 'Frontend Developer',
    'aboutForm.bio': 'O mnie (tekst)',
    'aboutForm.bioPlaceholder': 'Opowiedz o sobie...',
    'aboutForm.skills': 'Umiejętności',
    'aboutForm.skillsHint': 'Wpisz umiejętności oddzielone przecinkami',
    'aboutForm.skillCategory': 'Kategoria (np. Frontend)',
    'aboutForm.skillsPlaceholder': 'React, TypeScript, SCSS...',
    'aboutForm.addSkillGroup': 'Dodaj grupę umiejętności',
    'aboutForm.experience': 'Doświadczenie zawodowe',
    'aboutForm.experienceItem': 'Doświadczenie',
    'aboutForm.role': 'Stanowisko',
    'aboutForm.rolePlaceholder': 'Frontend Developer',
    'aboutForm.company': 'Firma',
    'aboutForm.companyPlaceholder': 'Nazwa firmy',
    'aboutForm.period': 'Okres',
    'aboutForm.description': 'Opis',
    'aboutForm.descriptionPlaceholder': 'Co robiłeś...',
    'aboutForm.addExperience': 'Dodaj doświadczenie',
    'aboutForm.education': 'Wykształcenie',
    'aboutForm.educationItem': 'Wykształcenie',
    'aboutForm.degree': 'Stopień / Kierunek',
    'aboutForm.degreePlaceholder': 'Licencjat informatyki',
    'aboutForm.institution': 'Uczelnia',
    'aboutForm.institutionPlaceholder': 'Uniwersytet...',
    'aboutForm.addEducation': 'Dodaj wykształcenie',
    'aboutForm.profileName': 'Nazwa profilu',
    'aboutForm.profileNameHint': 'Wewnętrzna nazwa do rozróżnienia profili',
    'aboutForm.newTitle': 'Nowy profil',
    'aboutForm.editTitle': 'Edytuj profil',
    'aboutForm.delete': 'Usuń profil',
    'aboutForm.save': 'Zapisz',
    'aboutForm.saving': 'Zapisywanie...',
    'aboutForm.saved': 'Zapisano!',
    'aboutForm.error': 'Błąd zapisu',

    // Admin about link
    'admin.about': 'O mnie',
    'admin.newTool': 'Nowe narzędzie',
    'admin.noTools': 'Brak narzędzi.',
    'admin.newProfile': 'Nowy profil',
    'admin.noProfiles': 'Brak profili.',
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

    // Settings
    'settings.title': 'Ustawienia',
    'settings.back': '← Panel',
    'settings.pageVisibility': 'Widoczność stron',
    'settings.pageVisibilityDesc': 'Zarządzaj widocznością stron na stronie. Wyłączone strony będą niedostępne dla odwiedzających.',
    'settings.blogPage': 'Strona "Blog"',
    'settings.blogPageDesc': 'Pokazuj stronę z postami bloga',
    'settings.projectsPage': 'Strona "Projekty"',
    'settings.projectsPageDesc': 'Pokazuj stronę z projektami',
    'settings.aboutPage': 'Strona "O mnie"',
    'settings.aboutPageDesc': 'Pokazuj stronę o mnie',
    'settings.toolsPage': 'Strona "Narzędzia"',
    'settings.toolsPageDesc': 'Pokazuj stronę z narzędziami',
    'settings.saved': 'Ustawienia zapisane!',
    'settings.error': 'Błąd zapisu',
    'settings.loading': 'Ładowanie ustawień...',

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
    'nav.about': 'About',
    'nav.tools': 'Tools',

    // Tools page
    'tools.title': 'Tools',
    'tools.subtitle': 'Apps and tools I use for work',
    'tools.empty': 'No tools yet.',
    'tools.viewDetails': 'View Details',
    'tools.hours': 'hrs',
    'tools.minutes': 'min',
    'tools.hoursUsed': 'Time Used',
    'tools.totalHours': 'Total Hours',
    'tools.purpose': 'What I use it for',
    'tools.notes': 'Notes',
    'tools.openWebsite': 'Open Website',
    'tools.filter.all': 'All',

    // Tool form
    'toolForm.newTitle': 'New Tool',
    'toolForm.editTitle': 'Edit Tool',
    'toolForm.back': '← Dashboard',
    'toolForm.general': 'General Information',
    'toolForm.name': 'Name',
    'toolForm.category': 'Category',
    'toolForm.icon': 'Icon (URL)',
    'toolForm.iconHint': 'PNG/SVG logo of the app',
    'toolForm.websiteUrl': 'Website (URL)',
    'toolForm.hoursUsed': 'Hours Used',
    'toolForm.pinned': 'Pin to homepage',
    'toolForm.purpose': 'What I use it for',
    'toolForm.purposePlaceholder': 'Describe what you use this tool for...',
    'toolForm.notes': 'Notes / Results',
    'toolForm.notesHint': 'Add notes or results from using this tool',
    'toolForm.note': 'Note',
    'toolForm.noteTitle': 'Title',
    'toolForm.noteTitlePlaceholder': 'Note title...',
    'toolForm.noteDesc': 'Description',
    'toolForm.noteDescPlaceholder': 'Details...',
    'toolForm.addNote': 'Add note',
    'toolForm.save': 'Save',
    'toolForm.saving': 'Saving...',
    'toolForm.saved': 'Saved!',
    'toolForm.error': 'Save error',
    'toolForm.delete': 'Delete',
    'toolForm.confirmDelete': 'Delete this tool?',
    'admin.tools': 'Tools',

    // About page
    'about.bio': 'About Me',
    'about.skills': 'Skills',
    'about.experience': 'Experience',
    'about.education': 'Education',
    'about.empty': 'The "About" page is not filled yet.',

    // About form
    'aboutForm.title': 'Edit "About Me"',
    'aboutForm.back': '← Dashboard',
    'aboutForm.general': 'General Information',
    'aboutForm.photo': 'Photo URL',
    'aboutForm.photoPlaceholder': 'https://example.com/photo.jpg',
    'aboutForm.translations': 'Text Content',
    'aboutForm.name': 'Full Name',
    'aboutForm.namePlaceholder': 'Your name',
    'aboutForm.jobTitle': 'Job Title / Specialization',
    'aboutForm.jobTitlePlaceholder': 'Frontend Developer',
    'aboutForm.bio': 'About Me (text)',
    'aboutForm.bioPlaceholder': 'Tell about yourself...',
    'aboutForm.skills': 'Skills',
    'aboutForm.skillsHint': 'Enter skills separated by commas',
    'aboutForm.skillCategory': 'Category (e.g. Frontend)',
    'aboutForm.skillsPlaceholder': 'React, TypeScript, SCSS...',
    'aboutForm.addSkillGroup': 'Add skill group',
    'aboutForm.experience': 'Work Experience',
    'aboutForm.experienceItem': 'Experience',
    'aboutForm.role': 'Role',
    'aboutForm.rolePlaceholder': 'Frontend Developer',
    'aboutForm.company': 'Company',
    'aboutForm.companyPlaceholder': 'Company Name',
    'aboutForm.period': 'Period',
    'aboutForm.description': 'Description',
    'aboutForm.descriptionPlaceholder': 'What you did...',
    'aboutForm.addExperience': 'Add experience',
    'aboutForm.education': 'Education',
    'aboutForm.educationItem': 'Education',
    'aboutForm.degree': 'Degree / Major',
    'aboutForm.degreePlaceholder': 'Bachelor of Computer Science',
    'aboutForm.institution': 'Institution',
    'aboutForm.institutionPlaceholder': 'University...',
    'aboutForm.addEducation': 'Add education',
    'aboutForm.profileName': 'Profile Name',
    'aboutForm.profileNameHint': 'Internal name to distinguish profiles',
    'aboutForm.newTitle': 'New Profile',
    'aboutForm.editTitle': 'Edit Profile',
    'aboutForm.delete': 'Delete Profile',
    'aboutForm.save': 'Save',
    'aboutForm.saving': 'Saving...',
    'aboutForm.saved': 'Saved!',
    'aboutForm.error': 'Save error',

    // Admin about link
    'admin.about': 'About Me',
    'admin.newTool': 'New Tool',
    'admin.noTools': 'No tools yet.',
    'admin.newProfile': 'New Profile',
    'admin.noProfiles': 'No profiles yet.',

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

    // Settings
    'settings.title': 'Settings',
    'settings.back': '← Dashboard',
    'settings.pageVisibility': 'Page Visibility',
    'settings.pageVisibilityDesc': 'Manage page visibility on the site. Disabled pages will be unavailable to visitors.',
    'settings.blogPage': 'Blog Page',
    'settings.blogPageDesc': 'Show blog posts page',
    'settings.projectsPage': 'Projects Page',
    'settings.projectsPageDesc': 'Show projects page',
    'settings.aboutPage': 'About Page',
    'settings.aboutPageDesc': 'Show about me page',
    'settings.toolsPage': 'Tools Page',
    'settings.toolsPageDesc': 'Show tools page',
    'settings.saved': 'Settings saved!',
    'settings.error': 'Save error',
    'settings.loading': 'Loading settings...',

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
