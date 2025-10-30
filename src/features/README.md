# 🏗️ Feature Architecture Guide

> Simple guidelines for organizing feature modules with clear boundaries

## 📁 Structure

### Page Features
```
pages/
└── (page-name)/
    ├── state/           # Page-specific state
    ├── hooks/          # Custom hooks
    ├── model/          # Data models & types
    ├── lib/            # Utilities
    ├── ui/             # Components
    │   └── page.tsx    # Main page component
    └── index.ts        # Public exports only
```

### Global Features
```
src/features/(feature-name)
├── api/            # API layer
├── state/          # Global state
├── hooks/          # Shared hooks
├── model/          # Shared models
├── lib/            # Shared utilities
├── ui/             # Shared components
└── import.ts       # External imports
```

## 🔒 Access Rules

### ✅ Allowed
- External → Feature via `index.ts` only
- Feature internal → Same feature (direct imports)
- Page features → Global features via `index.ts`

### ❌ Not Allowed
- External → Internal modules (no deep imports)
- Feature A → Feature B (creates coupling)
- Circular dependencies between features

## 🚫 Dependency Flow

```
External Apps → Page Features → Global Features → External Libraries
```

**Example:**
- ✅ `notifications` can use `auth`
- ❌ `auth` cannot use `notifications`

## 💡 Key Points

1. **Single Entry Point**: Only use `index.ts` for external access
2. **No Circular Dependencies**: Features should have clear hierarchy
3. **Clear Boundaries**: Each feature is self-contained
4. **Top-level Sharing**: Global features are shared, page features are isolated

---

> Keep it simple: External modules → `index.ts` → Internal modules
