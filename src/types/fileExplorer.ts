export interface TreeNode {
  id: string;
  type: "project" | "folder" | "file";
  name: string;
  children?: TreeNode[];
}

export interface FileExplorerProps {
  node: TreeNode | null;
  onDelete: (id: string) => void;
  isRoot?: boolean;
}

export interface FileNodeProps {
  node: TreeNode;
  onDelete: (id: string) => void;
  isRoot: boolean;
}

export interface IconComponent {
  width?: number;
  height?: number;
  fill?: string;
}

export interface KeyboardEventHandlers {
  handleKeyDown: (event: KeyboardEvent, nodeId: string) => void;
  handleDeleteKeyDown: (event: KeyboardEvent, nodeId: string) => void;
}
