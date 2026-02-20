export interface PageVisibility {
  blog: boolean;
  projects: boolean;
  about: boolean;
  tools: boolean;
}

export interface SiteSettings {
  id?: string;
  pageVisibility: PageVisibility;
  updatedAt?: Date;
}
