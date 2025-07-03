# File Explorer - Svelte

A modern file explorer built with Svelte and TypeScript.

## Features

- 📁 **File Tree Navigation**: Expand and collapse folders
- 🗑️ **Delete Functionality**: Remove files and folders with confirmation
- 🎨 **Dynamic Icons**: Different icons and colors for various file types
- ♿ **Accessibility**: Keyboard navigation and ARIA support
- ⚡ **Fast Performance**: Built with Svelte for optimal performance

## Tech Stack

- **Svelte 4** - Reactive UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Yarn** - Package manager
- **CSS** - Scoped styling with Svelte

## Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start development server**:
   ```bash
   yarn dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run tests

## Project Structure

```
src/
├── components/          # Svelte components
│   ├── FileExplorer.svelte
│   ├── FileIcon.svelte
│   ├── FolderIcon.svelte
│   ├── ProjectIcon.svelte
│   └── DeleteButton.svelte
├── App.svelte          # Main application component
├── main.ts            # Application entry point
├── api.ts             # API and data types
└── app.css            # Global styles
```

## Features

### File Tree
- Hierarchical display of files and folders
- Expandable/collapsible folders
- Visual indicators for different file types

### File Icons
- Dynamic icons based on file extensions
- Color-coded for different file types
- Support for common development files

### Delete Functionality
- Confirmation dialog before deletion
- Recursive deletion of folders
- Visual feedback

### Accessibility
- Keyboard navigation (Enter/Space to expand)
- ARIA roles and labels
- Focus indicators
- Screen reader friendly
