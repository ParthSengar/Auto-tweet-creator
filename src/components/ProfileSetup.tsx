import React from 'react';
import { useForm } from 'react-hook-form';
import type { UserProfile } from '../types';
import { useStore } from '../store/useStore';

export function ProfileSetup() {
  const { register, handleSubmit } = useForm<UserProfile>();
  const setProfile = useStore((state) => state.setProfile);

  const onSubmit = (data: UserProfile) => {
    setProfile({
      ...data,
      id: crypto.randomUUID(),
      contentSources: [],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Set Up Your AI Clone</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...register('bio')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Writing Tone
          </label>
          <input
            {...register('tone')}
            placeholder="e.g., Professional, Casual, Technical"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Topics (comma-separated)
          </label>
          <input
            {...register('topics')}
            placeholder="e.g., Technology, AI, Startups"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tweeting Frequency
          </label>
          <select
            {...register('tweetingFrequency')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low (1-2 tweets/day)</option>
            <option value="medium">Medium (3-5 tweets/day)</option>
            <option value="high">High (6-8 tweets/day)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}