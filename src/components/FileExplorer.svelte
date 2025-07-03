<script lang="ts">
  import type { TreeNode } from '../types/fileExplorer';
  import { fileExplorerStore } from '../stores/fileExplorerStore';
  import { FileIconService } from '../services/iconMapping';
  import { FileExplorerKeyboardService } from '../services/keyboardHandler';
  import ArrowDown from '../assets/icons/ArrowDown.svelte';
  import ArrowRight from '../assets/icons/ArrowRight.svelte';
  import XFile from '../assets/icons/XFile.svelte';
  import FileExplorer from './FileExplorer.svelte';

  let { node, onDelete, isRoot = true } = $props<{
    node: TreeNode | null;
    onDelete: (id: string) => void;
    isRoot?: boolean;
  }>();

  let expandedNodes = $state(new Set<string>());

  $effect(() => {
    const unsubscribe = fileExplorerStore.subscribe(state => {
      expandedNodes = state.expandedNodes;
    });
    return unsubscribe;
  });

  const keyboardService = new FileExplorerKeyboardService(
    (id) => fileExplorerStore.toggleExpanded(id),
    (id) => onDelete(id)
  );

  function getFileIcon(filename: string) {
    return FileIconService.getFileIcon(filename);
  }

  function isExpanded(nodeId: string): boolean {
    return expandedNodes.has(nodeId);
  }
</script>

{#if isRoot}
  <div class="file-explorer" role="tree" aria-label="File Explorer">
    {#if node}
      <h2 class="project-header">{node.name}</h2>
      <div class="project-children">
        {#each node.children || [] as childNode (childNode.id)}
          <FileExplorer node={childNode} {onDelete} isRoot={false} />
        {/each}
      </div>
    {:else}
      <div>Loading...</div>
    {/if}
  </div>
{:else if node}
  {@const expanded = isExpanded(node.id)}
  <div
    class="node"
    role="treeitem"
    aria-expanded={node.type === 'folder' ? expanded : undefined}
    aria-selected="false"
  >
    <div class="node-content">
      <div class="grid-item">
        {#if node.type === 'folder'}
          <button
            class="folder-button"
            onclick={() => fileExplorerStore.toggleExpanded(node.id)}
            onkeydown={(e) => keyboardService.handleKeyDown(e, node.id)}
            aria-label={expanded ? `Collapse ${node.name}` : `Expand ${node.name}`}
          >
            {#if expanded}
              <ArrowDown width={24} height={24} />
            {:else}
              <ArrowRight width={24} height={24} />
            {/if}
          </button>
        {:else}
          {@const IconComponent = getFileIcon(node.name)}
          <span class="icon" role="button" aria-label={`File: ${node.name}`} tabindex="0">
            <IconComponent width={24} height={24} />
          </span>
        {/if}
      </div>
      <div class="grid-item">
         {#if node.type === 'folder'}
            <span class="name clickable" role="presentation" onclick={() => fileExplorerStore.toggleExpanded(node.id)} onkeydown={(e) => keyboardService.handleKeyDown(e, node.id)}>{node.name}</span>
        {:else}
            <span class="name">{node.name}</span>
        {/if}
      </div>
      <div class="grid-item">
        <button
          class="delete-button"
          onclick={() => onDelete(node.id)}
          onkeydown={(e) => keyboardService.handleDeleteKeyDown(e, node.id)}
          title={`Delete ${node.name}`}
          aria-label={`Delete ${node.name}`}
        >
          <XFile width={24} height={24} />
        </button>
      </div>
    </div>
    {#if node.type === 'folder' && node.children && expanded}
      <div class="children" role="group">
        {#each node.children as childNode (childNode.id)}
          <FileExplorer {onDelete} node={childNode} isRoot={false} />
        {/each}
      </div>
    {/if}
  </div>
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
    scrollbar-width: thin;
    scrollbar-color: $border-main transparent;

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
    }

    &::-webkit-scrollbar-thumb:hover {
      background: $gray-500;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }
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

      .icon svg {
        fill: $white;
      }

      .folder-button svg {
        fill: $white;
      }

      .delete-button {
        opacity: 1;
      }
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

  .icon {
    width: 20px;
    @include flex-center;

    &:focus-visible {
      @include focus-ring($primary-color);
    }
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
    padding: $spacing-1;
    border-radius: $border-radius-sm;
    opacity: 0;
    @include transition(all);

    &:hover svg path {
      fill: $white;
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
    border-left: 1px solid rgba($border-main, 0.3);
    padding-left: $spacing-2;
  }
</style>
