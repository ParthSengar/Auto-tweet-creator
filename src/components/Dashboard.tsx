import React from 'react';
import { Brain, FileText, Settings, Users, Twitter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProfileSetup } from './ProfileSetup';
import { ContentSourceForm } from './ContentSourceForm';

export function Dashboard() {
  const profile = useStore((state) => state.profile);
  const tweets = useStore((state) => state.tweets);
  const contentSources = useStore((state) => state.contentSources);

  if (!profile) {
    return <ProfileSetup />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-sm fixed">
          <div className="p-4">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              AI Social Clone
            </h1>
          </div>
          <nav className="mt-8">
            <NavItem icon={<Twitter />} text="Tweets" active />
            <NavItem icon={<FileText />} text="Content Sources" />
            <NavItem icon={<Users />} text="Profile" />
            <NavItem icon={<Settings />} text="Settings" />
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {profile.name}</h2>
            <p className="text-gray-600">Manage your AI-powered social presence</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Generated Tweets"
              value={tweets.length.toString()}
              description="Total tweets generated"
            />
            <StatCard
              title="Content Sources"
              value={contentSources.length.toString()}
              description="Connected platforms"
            />
            <StatCard
              title="Scheduled"
              value={tweets.filter(t => t.status === 'scheduled').length.toString()}
              description="Tweets in queue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <ContentSourceForm />
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              {tweets.length === 0 ? (
                <p className="text-gray-500">No tweets generated yet</p>
              ) : (
                <div className="space-y-4">
                  {tweets.slice(0, 5).map((tweet) => (
                    <div key={tweet.id} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800">{tweet.content}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {tweet.status} • {new Date(tweet.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 ${
        active ? 'bg-blue-50 text-blue-600' : ''
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </div>
  );
}