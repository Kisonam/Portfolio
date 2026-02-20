export interface ToolNote {
  title: string;
  description: string;
}

export interface Tool {
  id?: string;
  name: string;
  icon?: string;
  category?: string;
  hoursUsed: number;
  purpose?: string;
  notes: ToolNote[];
  websiteUrl?: string;
  pinned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
