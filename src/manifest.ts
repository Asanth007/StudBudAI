import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'AI Powered Leetcode Helper',
  version: '1.0',

  permissions: [
    'sidePanel',
    'storage',
    'activeTab',
    'scripting'
  ],

  host_permissions: [
    'https://leetcode.com/problems/*'
  ],

  background: {
    service_worker: 'src/scripts/background.ts',
    type: 'module'
  },

  content_scripts: [
    {
      matches: ['https://leetcode.com/problems/*'],
      js: ['src/scripts/content.ts']
    }
  ],

  side_panel: {
    default_path: 'index.html'
  }
})