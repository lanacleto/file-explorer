<script lang="ts">
  import api, { type TreeNode } from './api';
  import FileExplorer from './components/FileExplorer.svelte';

  let directoryTree = $state<TreeNode | null>(null);
  let isLoading = $state(true);

  $effect(() => {
    loadDirectoryTree();
  });

  async function loadDirectoryTree() {
    try {
      isLoading = true;
      directoryTree = await api.getDirectoryTree();
    } catch (error) {
      console.error('Failed to load directory tree:', error);
    } finally {
      isLoading = false;
    }
  }

  async function handleDelete(id: string) {
    if (!directoryTree) return;
    try {
      directoryTree = await api.deleteById(id);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  }
</script>

<main>
  {#if isLoading}
    <div class="loading">Loading file explorer...</div>
  {:else}
    <FileExplorer 
      node={directoryTree} 
      onDelete={handleDelete}
    />
  {/if}
</main>

<style lang="scss">
  @use './styles/variables.scss' as *;

  main {
    font-family: $font-family-sans;
    display: flex;
    flex-direction: column;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: $font-size-sm;
    color: $text-file-explorer;
  }
</style>
 