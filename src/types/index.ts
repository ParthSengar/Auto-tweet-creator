export interface SocialProfile {
  id: string;
  platform: 'twitter' | 'blog' | 'linkedin';
  handle?: string;
  url?: string;
  lastSync?: string;
}

export interface ContentSource {
  id: string;
  type: 'blog' | 'twitter' | 'linkedin';
  url: string;
  status: 'active' | 'inactive';
}

export interface Tweet {
  id: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledFor?: string;
  createdAt: string;
  sourceType?: string;
  sourceUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  tone: string;
  topics: string[];
  contentSources: ContentSource[];
  tweetingFrequency: 'low' | 'medium' | 'high';
}