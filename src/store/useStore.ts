import { create } from 'zustand';
import type { UserProfile, Tweet, ContentSource } from '../types';

interface Store {
  profile: UserProfile | null;
  tweets: Tweet[];
  contentSources: ContentSource[];
  setProfile: (profile: UserProfile) => void;
  addContentSource: (source: ContentSource) => void;
  removeContentSource: (id: string) => void;
  addTweet: (tweet: Tweet) => void;
  updateTweet: (id: string, tweet: Partial<Tweet>) => void;
}

export const useStore = create<Store>((set) => ({
  profile: null,
  tweets: [],
  contentSources: [],
  setProfile: (profile) => set({ profile }),
  addContentSource: (source) =>
    set((state) => ({
      contentSources: [...state.contentSources, source],
    })),
  removeContentSource: (id) =>
    set((state) => ({
      contentSources: state.contentSources.filter((s) => s.id !== id),
    })),
  addTweet: (tweet) =>
    set((state) => ({
      tweets: [...state.tweets, tweet],
    })),
  updateTweet: (id, updatedTweet) =>
    set((state) => ({
      tweets: state.tweets.map((t) =>
        t.id === id ? { ...t, ...updatedTweet } : t
      ),
    })),
}));