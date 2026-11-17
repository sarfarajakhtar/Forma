# Forma Step 2A — isolated Puck visual editor

## Scope
- Mounted real Puck core editor at `/puck-edit` (client boundary)
- Imports Puck 0.21 editor stylesheet only in test-route layout
- Reuses Step 1 component registry and static JSON blueprint
- Supports testing component selection, text/image props, drag-and-drop order and viewport controls
- Puck's **Publish** button runs local Zod validation only. No persistence, API calls, database writes, or public publishing.

## Test
`npm run build` includes Step 1 schema test suite.
Then open `/puck-edit` in a protected branch preview:
1. Edit a hero headline via Puck's text field; observe canvas update.
2. Replace an image URL via the inspector.
3. Reorder blocks using drag-and-drop.
4. Test desktop and mobile viewport selectors and confirm no clipping.
5. Click Puck Publish and check local validation result; it does not publish a live site.
6. Refresh and confirm changes are not saved.

## Security and feature limitations
This is a **demo-only editor**. Do not merge or expose a public authenticated editing service without auth, authorization, storage, revisions, asset policies, and a secure save workflow.
No AI integration, paid model calls or premium visual designs.
