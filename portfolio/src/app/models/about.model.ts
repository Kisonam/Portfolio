export interface AboutTranslation {
  name: string;
  title: string;
  bio: string;
  location?: string;
}

export interface AboutSkillGroup {
  category: string;
  skills: string[];
}

export interface AboutExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface AboutEducation {
  institution: string;
  degree: string;
  period: string;
}

export interface AboutContent {
  id?: string;
  photo: string;
  email?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  translations: {
    uk: AboutTranslation;
    pl: AboutTranslation;
    en: AboutTranslation;
  };
  skills: AboutSkillGroup[];
  experience: AboutExperience[];
  education: AboutEducation[];
  updatedAt?: Date;
}
