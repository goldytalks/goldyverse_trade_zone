'use client';

import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { UploadButton, SlipList } from '@/components/UploadCard';
import { mockUploadedSlips } from '@/lib/mockData';
import { Link2, Wallet, Settings, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function Menu() {
  const [darkMode, setDarkMode] = useState(true);

  const connectionItems = [
    {
      icon: Link2,
      label: 'Connect Polymarket',
      description: 'Link your Polymarket account',
      action: () => alert('Polymarket connection coming soon'),
    },
    {
      icon: Link2,
      label: 'Connect Kalshi',
      description: 'Link your Kalshi account',
      action: () => alert('Kalshi connection coming soon'),
    },
    {
      icon: Wallet,
      label: 'Connect Crypto Wallet',
      description: 'Track memecoin & crypto positions',
      action: () => alert('Wallet connection coming soon'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <PageHeader
        title="Menu & Tools"
        subtitle="Manage connections and upload picks"
      />

      {/* Theme Toggle */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          <div>
            <div className="font-medium">Theme</div>
            <div className="text-sm text-muted">
              {darkMode ? 'Dark mode' : 'Light mode'}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-6 rounded-full transition-colors relative ${
            darkMode ? 'bg-blue' : 'bg-border'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connections */}
        <div>
          <Section title="Platform Connections">
            <div className="space-y-3">
              {connectionItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors text-left flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted truncate">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Settings */}
          <Section title="Settings">
            <button
              onClick={() => alert('Settings coming soon')}
              className="w-full bg-card border border-border rounded-lg p-4 hover:border-blue transition-colors text-left flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-blue/20 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue" />
              </div>
              <div className="flex-1">
                <div className="font-medium">App Settings</div>
                <div className="text-sm text-muted">Preferences & configuration</div>
              </div>
            </button>
          </Section>
        </div>

        {/* Upload Slips */}
        <div>
          <Section title="Upload Pick Screenshots">
            <UploadButton onUploadClick={() => alert('Screenshot upload coming soon! This will allow you to upload Underdog, PrizePicks, or other pick slips for automatic parsing.')} />
          </Section>

          <Section title="Uploaded Slips">
            <SlipList slips={mockUploadedSlips} />
          </Section>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8 text-center text-sm text-muted">
        <div className="mb-2">Goldyverse Trade Zone</div>
        <div>Version 1.0.0 • Track all your gambles & trades</div>
      </div>
    </div>
  );
}
