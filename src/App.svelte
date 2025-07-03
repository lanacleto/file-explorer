<script lang="ts">
  import FileExplorer from './components/FileExplorer.svelte';
  import api from './api';
  import type { TreeNode } from './types/fileExplorer';

  let directoryTree: TreeNode | null = $state(null);

  $effect(() => {
    api.getDirectoryTree().then(data => {
      directoryTree = data;
    });
  });

  async function handleDelete(id: string) {
    directoryTree = await api.deleteById(id);
  }
</script>

<main>
  <FileExplorer node={directoryTree} onDelete={handleDelete} />
</main>
