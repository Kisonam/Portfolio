export interface GameAchievement {
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}

export interface Game {
  id?: string;
  title: string;
  coverImage: string;
  backgroundImage?: string;
  developer?: string;
  genre?: string[];
  hoursPlayed: number;
  status: 'playing' | 'completed' | 'dropped' | 'backlog';
  rating?: number;
  review?: string;
  achievements: GameAchievement[];
  steamUrl?: string;
  pinned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
