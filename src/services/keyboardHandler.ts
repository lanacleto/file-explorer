export interface KeyboardHandler {
  handleKeyDown: (event: KeyboardEvent, nodeId: string) => void;
  handleDeleteKeyDown: (event: KeyboardEvent, nodeId: string) => void;
}

export class FileExplorerKeyboardService implements KeyboardHandler {
  constructor(
    private toggleExpanded: (nodeId: string) => void,
    private handleDelete: (nodeId: string) => void
  ) {}

  handleKeyDown(event: KeyboardEvent, nodeId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleExpanded(nodeId);
    }
  }

  handleDeleteKeyDown(event: KeyboardEvent, nodeId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleDelete(nodeId);
    }
  }
}
