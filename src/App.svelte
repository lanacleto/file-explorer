<script lang="ts">
  import { onMount } from 'svelte';
  import api, { type TreeNode } from './api';
  import FileExplorer from './components/FileExplorer.svelte';

  let directoryTree: TreeNode | null = null;

  onMount(async () => {
    directoryTree = await api.getDirectoryTree();
  });

  async function handleDelete(id: string) {
    if (!directoryTree) return;
    directoryTree = await api.deleteById(id);
  }
</script>

<main>
  <FileExplorer 
    node={directoryTree} 
    onDelete={handleDelete}
  />
</main>

<style lang="scss">
  @use './styles/variables.scss' as *;

  main {
    font-family: $font-family-sans;
  }
</style>
 