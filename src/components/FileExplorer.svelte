<script lang="ts">
  import { onMount } from 'svelte';
  import api from '../api';
  import { 
    ArrowDown, 
    ArrowRight, 
    XFile,
  } from '../assets/icons';
  import { FileIconService } from '../services/iconMapping';
  import { FileExplorerKeyboardService } from '../services/keyboardHandler';
  import { fileExplorerStore } from '../stores/fileExplorerStore';
  import type { TreeNode } from '../types/fileExplorer';
  import FileExplorer from './FileExplorer.svelte';

  interface Props {
    node?: TreeNode | null;
    onDelete?: (id: string) => void;
    isRoot?: boolean;
  }

  let { node = $bindable(null), onDelete = () => {}, isRoot = true }: Props = $props();

  let keyboardService: FileExplorerKeyboardService;
  let expandedNodes = $state(new Set<string>());

  // Subscribe to store changes
  $effect(() => {
    const unsubscribe = fileExplorerStore.subscribe(state => {
      expandedNodes = state.expandedNodes;
    });
    
    return unsubscribe;
  });

  // Helper function to check if a node is expanded
  function isExpanded(nodeId: string): boolean {
    return expandedNodes.has(nodeId);
  }

  const getFileIcon = $derived((filename: string) => FileIconService.getFileIcon(filename));

  onMount(() => {
    if (!node) {
      api.getDirectoryTree().then(result => {
        node = result;
      });
    }
    
    keyboardService = new FileExplorerKeyboardService(
      (nodeId: string) => fileExplorerStore.toggleExpanded(nodeId),
      (nodeId: string) => handleDelete(nodeId)
    );
  });

  async function handleDelete(id: string) {
    if (onDelete) {
      onDelete(id);
    }
  }

  function handleKeyDown(event: KeyboardEvent, nodeId: string) {
    keyboardService?.handleKeyDown(event, nodeId);
  }

  function handleDeleteKeyDown(event: KeyboardEvent, nodeId: string) {
    keyboardService?.handleDeleteKeyDown(event, nodeId);
  }
</script>

{#if isRoot}
  <div class="file-explorer" role="tree" aria-label="File Explorer">
    {#if node}
      {@const currentNode = node}
      <h2 class="project-header">{currentNode.name}</h2>
      
      {#if currentNode.children}
        <div class="project-children">
          {#each currentNode.children as child}
            <FileExplorer 
              node={child} 
              {onDelete}
              isRoot={false}
            />
          {/each}
        </div>
      {/if}
    {:else}
      <div>Loading...</div>
    {/if}
  </div>
{:else}
  {#if node}
    {@const currentNode = node}
    {@const expanded = isExpanded(currentNode.id)}
    <div class="node" role="treeitem" aria-expanded={currentNode.type === 'folder' ? expanded : undefined} aria-selected="false">
      <div class="node-content">
        <div class="grid-item">
          {#if currentNode.type === 'folder'}
            <button 
              class="folder-button" 
              onclick={() => fileExplorerStore.toggleExpanded(currentNode.id)}
              onkeydown={(e) => handleKeyDown(e, currentNode.id)}
              aria-label="{expanded ? 'Collapse' : 'Expand'} {currentNode.name}"
              tabindex="0"
            >
              {#if expanded}
                <ArrowDown width={24} height={24} />
              {:else}
                <ArrowRight width={24} height={24} />
              {/if}
            </button>
          {:else}
            {@const SvelteComponent = getFileIcon(currentNode.name)}
            <span class="icon" tabindex="0" role="button" aria-label="File: {currentNode.name}">
              <SvelteComponent width={24} height={24} />
            </span>
          {/if}
        </div>
        
        <div class="grid-item">
          {#if currentNode.type === 'folder'}
            <span class="name clickable" role="presentation" onclick={() => fileExplorerStore.toggleExpanded(currentNode.id)} onkeydown={(e) => handleKeyDown(e, currentNode.id)}>
              {currentNode.name}
            </span>
          {:else}
            <span class="name">
              {currentNode.name}
            </span>
          {/if}
        </div>
        
        <div class="grid-item">
          <button 
            class="delete-button" 
            onclick={() => handleDelete(currentNode.id)}
            onkeydown={(e) => handleDeleteKeyDown(e, currentNode.id)}
            title="Delete {currentNode.name}"
            aria-label="Delete {currentNode.name}"
            tabindex="0"
          >
            <XFile width={24} height={24} />
          </button>
        </div>
      </div>
      
      {#if currentNode.type === 'folder' && currentNode.children && expanded}
        <div class="children" role="group">
          {#each currentNode.children as child}
            <FileExplorer 
              node={child} 
              {onDelete}
              isRoot={false}
            />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
{/if}

<style lang="scss">
  @use '../styles/variables.scss' as *;
  
  .file-explorer {
    width: fit-content;
    min-width: 300px;
    height: 100%;
    font-family: $font-family-sans;
    border: 2px solid $border-file-explorer;
    overflow: auto;
    max-height: 100vh;
    max-width: 100vw;
    background-color: $background-main;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $border-main;
      border-radius: $border-radius-full;
      
      &:hover {
        background: $gray-500;
      }
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }

    scrollbar-width: thin;
    scrollbar-color: $border-main transparent;
  }

  .project-header {
    margin: 0 0 $spacing-2 0;
    padding: $spacing-1 $spacing-2;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-h2;
    background-color: $background-h2;
    border-bottom: 1px solid $border-main;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .project-children {
    margin-left: 0;
  }

  .node {
    margin: $spacing-1 0;
  }

  .node-content {
    display: grid;
    grid-template-columns: 24px 1fr auto;
    align-items: center;
    padding: 0 $spacing-2;
    gap: $spacing-1;
    border-radius: $border-radius-sm;
    @include transition(background-color);

    &:hover {
      .name {
        color: $white;
      }
      
      .icon :global(svg) {
        fill: $white;
      }
      
      .folder-button :global(svg) {
        fill: $white;
      }

      .delete-button {
        opacity: 1;
      }
    }

    .grid-item {
      @include flex-center;

      &:nth-child(2) {
        justify-content: flex-start;
      }

      &:nth-child(3) {
        justify-content: flex-end;
      }
    }
  }

  .icon {
    width: 20px;
    @include flex-center;
  }

  .folder-button {
    width: 24px;
    height: 24px;
    @include button-reset;
    @include flex-center;
    @include transition(transform);
    
    &:hover {
      transform: scale(1.1);
    }

    &:focus-visible {
      @include focus-ring($primary-color);
    }
  }

  .name {
    font-size: $font-size-xs;
    text-align: left;
    flex: 1;
    color: $text-file-explorer;
    @include transition(color);

    &.clickable {
      cursor: pointer;
      
      &:hover {
        color: $white;
      }
    }
  }

  .delete-button {
    @include button-reset;
    @include flex-center;
    color: $gray-500;
    padding: $spacing-1 $spacing-1;
    border-radius: $border-radius-sm;
    opacity: 0;
    @include transition(all);
    
    &:hover {
      :global(svg path) {
        fill: $white;
      }
    }

    &:focus {
      opacity: 1;
    }

    &:focus-visible {
      @include focus-ring($primary-color);
    }
  }

  .children {
    margin-left: $spacing-3;
    padding-left: $spacing-2;
  }

  .icon:focus-visible {
    @include focus-ring($primary-color);
  }
</style>
