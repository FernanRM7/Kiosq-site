# Kiosq Site

Sitio web del proyecto Kiosq construido con Astro.

## 🚀 Inicio Rápido

### Clonar el repositorio

```sh
git clone <repository-url>
cd Kiosq-site
```

> **Nota:** Al clonar el repositorio, lefthook configurará automáticamente los hooks de Git. Deberías ver el mensaje: `sync hooks: ✔️ (pre-push, pre-commit, commit-msg)`

### Instalar dependencias

```sh
npm install
```

Después de instalar, lefthook sincronizará los hooks automáticamente. Verifica que veas el mensaje de confirmación.

## 📦 Comandos

| Comando         | Acción                                            |
| :-------------- | :------------------------------------------------ |
| `npm install`   | Instala dependencias                              |
| `npm dev`       | Inicia servidor de desarrollo en `localhost:4321` |
| `npm build`     | Construye el sitio para producción en `./dist/`   |
| `npm preview`   | Previsualiza la build localmente                  |
| `npm astro ...` | Ejecuta comandos CLI de Astro                     |

## 🔧 Configuración

### Lefthook

Los commits y push están validados automáticamente mediante lefthook.

Lefthook está configurado para ejecutar validaciones automáticas en los siguientes hooks:

| Hook         | Acción                                                    |
| :----------- | :-------------------------------------------------------- |
| `pre-commit` | Ejecuta `npx ultracite fix` en archivos JS, TS, CSS, JSON |
| `commit-msg` | Valida el formato del mensaje (feat/fix/chore + 10 chars) |
| `pre-push`   | Valida que el nombre de la rama siga el patrón esperado   |

**Formatos esperados:**

- **Commits:** `tipo: descripción` (mínimo 10 caracteres)
  - Tipos válidos: `feat`, `fix`, `chore`
  - Ejemplo: `feat: agregar nuevo componente de validación`

- **Ramas:** `tipo/descripcion-en-kebab-case`
  - Ejemplo: `feat/nuevo-componente-boton`
  - Ramas protegidas: `main`, `master`, `develop`, `staging`

## 👨‍💻 Para Agentes de IA

**Importante:** Lee el archivo [`agent.md`](./agent.md) antes de realizar cambios en el código. Contiene guías esenciales sobre estándares de codificación y buenas prácticas del proyecto.
