import FileExplorer from '../../src/components/FileExplorer.svelte'
import type { TreeNode } from '../../src/types/fileExplorer'
import { fileExplorerStore } from '../../src/stores/fileExplorerStore'

describe('FileExplorer Component', () => {
  const mockTreeNode: TreeNode = {
    id: "root",
    type: "project",
    name: "Test Project",
    children: [
      {
        id: "folder1",
        type: "folder",
        name: "src",
        children: [
          {
            id: "file1",
            type: "file",
            name: "App.svelte"
          },
          {
            id: "file2",
            type: "file",
            name: "package.json"
          }
        ]
      },
      {
        id: "file3",
        type: "file",
        name: "README.md"
      }
    ]
  }

  beforeEach(() => {
    fileExplorerStore.reset();
    cy.mount(FileExplorer, {
      props: {
        node: mockTreeNode,
        onDelete: cy.stub().as('deleteHandler')
      }
    })
  })

  describe('Initial Rendering', () => {
    it('should display the project header', () => {
      cy.get('.project-header').should('contain', 'Test Project')
    })

    it('should render folders and files', () => {
      cy.get('.node').should('have.length', 2) 
      cy.get('.name').should('contain', 'src')
      cy.get('.name').should('contain', 'README.md')
    })

    it('should show folder expand/collapse buttons', () => {
      cy.get('.folder-button').should('exist')
      cy.get('.folder-button svg').should('be.visible')
    })

    it('should show file icons', () => {
      cy.get('.icon').should('exist')
    })
  })

  describe('Folder Interactions', () => {
    it('should expand folder when arrow button is clicked', () => {
      cy.get('.folder-button').first().click()
      cy.get('.children').should('be.visible')
      cy.get('.children .node').should('have.length', 2) 
    })

    it('should collapse folder when arrow button is clicked again', () => {
      cy.get('.folder-button').first().click()
      cy.get('.children').should('be.visible')
      cy.get('.folder-button').first().click()
      cy.get('.children').should('not.exist')
    })

    it('should expand folder when folder name is clicked', () => {
      cy.get('.name.clickable').first().click()
      cy.get('.children').should('be.visible')
    })

    it('should change arrow direction when folder is expanded', () => {
      cy.get('.folder-button svg').should('have.class', 'icon-arrow-right')
      cy.get('.folder-button').first().click()
      cy.get('.folder-button svg').should('have.class', 'icon-arrow-down')
    })
  })

  describe('Keyboard Navigation', () => {
    it('should expand folder with Enter key on arrow button', () => {
      cy.get('.folder-button').first().focus()
      cy.get('.folder-button').first().type('{enter}')
      cy.get('.children').should('be.visible')
    })

    it('should expand folder when folder name is clicked', () => {
      cy.get('.name.clickable').first().click()
      cy.get('.children').should('be.visible')
    })
  })

  describe('Delete Functionality', () => {
    it('should call onDelete when delete button is clicked', () => {
      cy.get('.node-content').first().trigger('mouseover')
      cy.get('.delete-button').first().click()
      cy.get('@deleteHandler').should('have.been.calledWith', 'folder1')
    })

    it('should call onDelete with Enter key on delete button', () => {
      cy.get('.node-content').first().trigger('mouseover')
      cy.get('.delete-button').first().focus()
      cy.get('.delete-button').first().type('{enter}')
      cy.get('@deleteHandler').should('have.been.calledWith', 'folder1')
    })

    it('should call onDelete with Space key on delete button', () => {
      cy.get('.node-content').first().trigger('mouseover')
      cy.get('.delete-button').first().focus()
      cy.get('.delete-button').first().type(' ')
      cy.get('@deleteHandler').should('have.been.calledWith', 'folder1')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('[role="tree"]').should('exist')
      cy.get('[role="treeitem"]').should('exist')
      cy.get('[role="group"]').should('not.exist')
    })

    it('should have proper ARIA expanded state', () => {
      cy.get('.node[aria-expanded]').first().should('have.attr', 'aria-expanded', 'false')
      cy.get('.folder-button').first().click()
      cy.get('.node[aria-expanded]').first().should('have.attr', 'aria-expanded', 'true')
    })

    it('should have proper focus indicators', () => {
      cy.get('.folder-button').first().focus()
      cy.get('.folder-button').first().should('have.css', 'outline')
    })

    it('should be keyboard navigable', () => {
      cy.get('.folder-button').first().should('be.visible')
      cy.get('.folder-button').first().focus()
      cy.get('.folder-button').first().should('be.focused')
    })
  })

  describe('File Icon Mapping', () => {
    it('should show correct icons for different file types', () => {
      cy.get('.folder-button').first().click() 
      cy.get('.children .icon').should('exist')
    })

    it('should show JSON icon for package.json', () => {
      cy.get('.folder-button').first().click()
      cy.get('.children .name').contains('package.json').parent().parent().find('.icon').should('exist')
    })
  })

  describe('Scrolling', () => {
    it('should have scrollable content', () => {
      cy.get('.file-explorer').should('have.css', 'overflow', 'auto')
    })

    it('should have custom scrollbar styling', () => {
      cy.get('.file-explorer').should('have.css', 'scrollbar-width', 'thin')
    })
  })
}) 