# Guía para Agentes de IA

Este documento contiene información esencial que **todos los agentes de IA deben leer antes de hacer cambios** en el código del proyecto Kiosq Site.

## Antes de Empezar

Asegúrate de:

1. Leer esta guía completamente
2. Familiarizarte con los estándares del proyecto
3. Revisar `oxlint.config.ts` para entender las reglas de linting
4. Consultar `lefthook.yml` para los requisitos de commits y ramas

## Estándares de HTML

El proyecto sigue las **Frontend Guidelines** definidas en: https://github.com/bendc/frontend-guidelines

**Puntos clave:**

- **Semántica HTML5:** Usa elementos semánticos correctos (`<button>`, `<main>`, `<nav>`, `<section>`, etc.)
- **Accesibilidad:** Todos los componentes deben ser accesibles (ARIA attributes, keyboard navigation)
- **Atributos de clase/id:** Usa nombres descriptivos en kebab-case
- **Validación:** El código debe pasar la validación del estándar HTML5
- **Performance:** Minimiza el uso de atributos innecesarios
- **SEO:** Estructura correcta de headings (`<h1>`, `<h2>`, etc.)

## Tokens de CSS

Todos los estilos deben seguir los **tokens CSS definidos en `src/styles/global.css`**.

### Cómo usar los tokens:

1. **Verifica primero `global.css`** antes de crear nuevos estilos
2. **Reutiliza variables CSS** para colores, espaciado, tipografía, etc.
3. **No agregues valores hardcodeados** de colores o tamaños
4. **Mantén consistencia visual** usando los tokens del proyecto

### Estructura típica de tokens en global.css:

```css
:root {
  --color-primary: /* valor */;
  --color-secondary: /* valor */;
  --spacing-unit: /* valor */;
  --font-primary: /* valor */;
  /* ... más tokens */
}
```

## Reglas de Codificación

### Linting y Formato

- Oxlint valida automáticamente en cada commit
- Las reglas principales son:
  - `@typescript-eslint/no-unused-vars`: error
  - `no-var`: error (usa `const` o `let`)
  - `prefer-const`: error
  - `eqeqeq`: error (usa `===` en lugar de `==`)
  - `react-hooks/exhaustive-deps`: warning
  - `no-console`: warning (excepto en tests)

### Commits

**Formato requerido:** `tipo: descripción` (mínimo 10 caracteres)

**Tipos válidos:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `chore`: Tareas de mantenimiento

**Ejemplo válido:** `feat: agregar componente de modal accesible`

### Nombres de Ramas

**Formato requerido:** `tipo/descripcion-en-kebab-case`

**Ejemplo:** `feat/nuevo-boton-accesible`

**Ramas protegidas** (no necesitan seguir patrón):

- `main`
- `master`
- `develop`
- `staging`

## Estructura del Proyecto

```
Kiosq-site/
├── src/
│   ├── pages/          # Rutas de Astro
│   ├── components/     # Componentes reutilizables
│   ├── layouts/        # Layouts
│   └── styles/         # Estilos globales (incluye global.css)
├── public/             # Activos estáticos
├── prisma/             # Configuración de BD
├── oxlint.config.ts    # Configuración de linting
├── lefthook.yml        # Configuración de git hooks
└── astro.config.mjs    # Configuración de Astro
```

## Prohibido

- ❌ Valores hardcodeados de colores (usa tokens de global.css)
- ❌ Usar `var` o `any` en TypeScript (excepto en tests)
- ❌ Usar `==` en lugar de `===`
- ❌ Dejar `console.log` sin propósito (excepto en tests)
- ❌ Commits sin formato correcto
- ❌ Push en ramas con nombres inválidos
- ❌ HTML semánticamente incorrecto o inaccesible

## Buenas Prácticas

- Revisa `global.css` antes de escribir nuevos estilos
- Usa componentes reutilizables
- Escribe HTML semántico y accesible
- Mantén nombres de variables en inglés
- Comenta código no obvio
- Sigue las Frontend Guidelines
- Prueba en múltiples navegadores si es UI

## Referencias Importantes

- **Frontend Guidelines:** https://github.com/bendc/frontend-guidelines
- **Astro Documentation:** https://docs.astro.build
- **Configuración de linting:** `oxlint.config.ts`
- **Configuración de Git hooks:** `lefthook.yml`
- **Tokens CSS:** `src/styles/global.css`

---
