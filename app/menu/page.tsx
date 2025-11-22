'use client';

import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import { SlipList } from '@/components/UploadCard';
import { mockUploadedSlips, UploadedSlip } from '@/lib/mockData';
import { Link2, Wallet, Settings, Moon, Sun, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Menu() {
  const [darkMode, setDarkMode] = useState(true);
  const [uploadedSlips, setUploadedSlips] = useState<UploadedSlip[]>(mockUploadedSlips);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      description: 'Link your Kalshi account (Use .env.local for API keys)',
      action: () => alert('Kalshi integration is live! Set KALSHI_API_KEY_ID and KALSHI_PRIVATE_KEY_PEM in your environment variables. Check the /positions page to see your real Kalshi positions.'),
    },
    {
      icon: Wallet,
      label: 'Connect Crypto Wallet',
      description: 'Track memecoin & crypto positions',
      action: () => alert('Wallet connection coming soon'),
    },
  ];

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('source', detectSource(file.name));

      const response = await fetch('/api/upload/slip', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Add the new slip to the list
      setUploadedSlips((prev) => [data.slip, ...prev]);
      setUploadSuccess(true);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading slip:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload');
    } finally {
      setUploading(false);
    }
  };

  const detectSource = (filename: string): string => {
    const lower = filename.toLowerCase();
    if (lower.includes('underdog') || lower.includes('ud')) return 'Underdog';
    if (lower.includes('prizepicks') || lower.includes('pp')) return 'PrizePicks';
    return 'Unknown';
  };

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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="slip-upload"
            />
            <label
              htmlFor="slip-upload"
              className={`w-full bg-card border-2 border-dashed rounded-lg p-6 transition-colors flex flex-col items-center gap-3 cursor-pointer ${
                uploading ? 'border-blue/50 opacity-50 cursor-not-allowed' : 'border-border hover:border-blue'
              }`}
            >
              <div className="w-12 h-12 bg-blue/20 rounded-full flex items-center justify-center">
                {uploading ? (
                  <Loader2 className="w-6 h-6 text-blue animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-blue" />
                )}
              </div>
              <div className="text-center">
                <div className="font-medium mb-1">
                  {uploading ? 'Uploading...' : 'Upload Pick Screenshot'}
                </div>
                <div className="text-sm text-muted">
                  Underdog, PrizePicks, or other slips
                </div>
              </div>
            </label>

            {/* Upload Status */}
            {uploadError && (
              <div className="mt-3 bg-red/10 border border-red/30 rounded-lg p-3 text-sm text-red">
                {uploadError}
              </div>
            )}

            {uploadSuccess && (
              <div className="mt-3 bg-green/10 border border-green/30 rounded-lg p-3 flex items-center gap-2 text-sm text-green">
                <CheckCircle2 className="w-4 h-4" />
                Slip uploaded successfully!
              </div>
            )}
          </Section>

          <Section title={`Uploaded Slips (${uploadedSlips.length})`}>
            <SlipList slips={uploadedSlips} />
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
