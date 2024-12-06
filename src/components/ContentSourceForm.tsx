import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'lucide-react';
import type { ContentSource } from '../types';
import { useStore } from '../store/useStore';

export function ContentSourceForm() {
  const { register, handleSubmit, reset } = useForm<ContentSource>();
  const addContentSource = useStore((state) => state.addContentSource);

  const onSubmit = (data: ContentSource) => {
    addContentSource({
      ...data,
      id: crypto.randomUUID(),
      status: 'active',
    });
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Link className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Add Content Source</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Source Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="blog">Blog</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            {...register('url')}
            type="url"
            placeholder="https://"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Source
        </button>
      </form>
    </div>
  );
}