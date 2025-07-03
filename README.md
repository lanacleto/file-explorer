# 🌳 File Explorer - Svelte 5

Hey! Hope you love it. Thank you, Carta.

![File Explorer Demo](https://file-explorer-x47x.vercel.app/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- yarn

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the file explorer.

### Key Technologies

- **Svelte 5**: Latest version with Runes for reactive state management
- **TypeScript**: Type-safe development
- **SCSS**: Modern CSS with variables and mixins
- **Vite**: Fast build tool and dev server

### State Management

The file explorer uses a custom store pattern for managing expanded/collapsed states:

```typescript
// Store for managing folder expansion states
const fileExplorerStore = {
  expandedNodes: Set<string>,
  toggleExpanded: (nodeId: string) => void,
  isExpanded: (nodeId: string) => boolean
}
```

## 🎮 Usage

### Basic Implementation

```svelte
<script lang="ts">
  import FileExplorer from './components/FileExplorer.svelte';
  import type { TreeNode } from './types/fileExplorer';

  let directoryTree: TreeNode | null = $state(null);

  async function handleDelete(id: string) {
    // Handle file/folder deletion
    directoryTree = await api.deleteById(id);
  }
</script>

<FileExplorer node={directoryTree} onDelete={handleDelete} />
```

## ♿ Accessibility

The file explorer is fully accessible with:

- **ARIA Roles**: `tree`, `treeitem`, `group`
- **Keyboard Navigation**: Tab, Enter, Space support
- **Screen Reader**: Descriptive labels and states
- **Focus Management**: Visible focus indicators
- **WCAG 2.1 AA**: Compliant with accessibility standards

### Keyboard Shortcuts

- **Tab**: Navigate between interactive elements
- **Enter/Space**: Expand/collapse folders
- **Arrow Keys**: Navigate tree structure (planned)

## 🔧 Development

### Available Scripts

```bash
# Development
yarn dev          # Start dev server
yarn build        # Build for production
yarn preview      # Preview production build

# Code Quality
yarn check        # Type checking
yarn lint         # Code formatting
yarn type-check   # TypeScript validation

# Testing
yarn test:cypress # Run component tests
```

### Project Structure

```
src/
├── components/
│   └── FileExplorer.svelte    # Main component
├── services/
│   ├── iconMapping.ts         # File icon logic
│   └── keyboardHandler.ts     # Keyboard navigation
├── stores/
│   └── fileExplorerStore.ts   # State management
├── types/
│   └── fileExplorer.ts        # TypeScript interfaces
├── assets/
│   └── icons/                 # SVG icon components
└── styles/
    └── variables.scss         # Design system variables
```

## 🧪 Testing

The project includes comprehensive testing:

- **Component Tests**: Cypress for UI interactions
- **Type Checking**: TypeScript validation
- **Linting**: Prettier for code formatting

## 📦 Build & Deploy

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

**Built with ❤️ using Svelte 5 and TypeScript**
