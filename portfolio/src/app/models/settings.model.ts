export interface PageVisibility {
  blog: boolean;
  projects: boolean;
  about: boolean;
}

export interface SiteSettings {
  id?: string;
  pageVisibility: PageVisibility;
  updatedAt?: Date;
}
