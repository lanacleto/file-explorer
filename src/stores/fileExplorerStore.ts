import { writable, get } from 'svelte/store';

export interface FileExplorerState {
  expandedNodes: Set<string>;
}

function createFileExplorerStore() {
  const { subscribe, set, update } = writable<FileExplorerState>({
    expandedNodes: new Set()
  });

  return {
    subscribe,
    toggleExpanded: (nodeId: string) => {
      update(state => {
        const newExpandedNodes = new Set(state.expandedNodes);
        if (newExpandedNodes.has(nodeId)) {
          newExpandedNodes.delete(nodeId);
        } else {
          newExpandedNodes.add(nodeId);
        }
        return { ...state, expandedNodes: newExpandedNodes };
      });
    },
    isExpanded: (nodeId: string) => {
      const currentState = get({ subscribe });
      return currentState.expandedNodes.has(nodeId);
    },
    reset: () => set({ expandedNodes: new Set() })
  };
}

export const fileExplorerStore = createFileExplorerStore(); 
