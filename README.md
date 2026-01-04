# ChatKit OpenAI - Interfaz Similar a ChatGPT

Esta aplicación web utiliza ChatKit de OpenAI para crear una interfaz de chat similar a ChatGPT, desplegada en Vercel con Next.js.

## 🚀 Características

- ✅ Interfaz de chat moderna similar a ChatGPT
- ✅ Integración completa con ChatKit de OpenAI
- ✅ Despliegue optimizado para Vercel
- ✅ Usa variables de entorno para configuración segura

## 📋 Requisitos Previos

1. **Workflow ID de OpenAI**: Necesitas crear un agente workflow usando [Agent Builder](https://platform.openai.com/docs/guides/agent-builder) de OpenAI y obtener tu `WORKFLOW_ID`.

2. **API Key de OpenAI**: Necesitas una `OPENAI_API_KEY` válida de OpenAI.

3. **Cuenta de Vercel**: Crea una cuenta gratuita en [Vercel](https://vercel.com).

## 🛠️ Instalación Local

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
Crea un archivo `.env.local` en la raíz del proyecto:
```env
OPENAI_API_KEY=tu_api_key_de_openai_aqui
WORKFLOW_ID=tu_workflow_id_aqui
```

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

5. **Abrir en el navegador**:
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción (después de build)
- `npm run lint` - Ejecuta el linter

## 🚢 Despliegue en Vercel

Vercel detecta automáticamente Next.js, así que el despliegue es muy sencillo.

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub**:
   - Crea un repositorio en GitHub
   - Sube todos los archivos del proyecto

2. **Conecta el repositorio en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configura las variables de entorno**:
   En la configuración del proyecto, antes de hacer deploy:
   - Ve a "Environment Variables"
   - Agrega las siguientes variables:
     - `OPENAI_API_KEY` = tu API key de OpenAI
     - `WORKFLOW_ID` = tu workflow ID de OpenAI
   - Asegúrate de seleccionar todos los ambientes (Production, Preview, Development)

4. **Haz deploy**:
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará tu aplicación automáticamente

### Opción 2: Despliegue con Vercel CLI

1. **Instala Vercel CLI**:
```bash
npm install -g vercel
```

2. **Inicia sesión en Vercel**:
```bash
vercel login
```

3. **Despliega el proyecto**:
```bash
vercel
```

4. **Configura las variables de entorno**:
   - Después del primer deploy, ve a tu proyecto en Vercel Dashboard
   - Settings > Environment Variables
   - Agrega:
     - `OPENAI_API_KEY` = tu API key
     - `WORKFLOW_ID` = tu workflow ID
   - Haz un nuevo deploy con: `vercel --prod`

## ⚙️ Configuración en Vercel

### Variables de Entorno Requeridas

En Vercel, ve a tu proyecto > Settings > Environment Variables y agrega:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Tu API Key de OpenAI | `sk-proj-xxxxxxxxxxxxx` |
| `WORKFLOW_ID` | ID de tu workflow de Agent Builder | `wf_68df4b13b3588190a09d19288d4610ec0df388c3983f58d1` |

**Importante**: Marca estas variables para todos los ambientes (Production, Preview, Development).

### Comandos de Build y Start en Vercel

Vercel **detecta automáticamente** que es un proyecto Next.js y configura todo automáticamente:

- **Build Command**: `next build` (se configura automáticamente)
- **Output Directory**: `.next` (se configura automáticamente)
- **Install Command**: `npm install` (se configura automáticamente)
- **Framework Preset**: Next.js (se detecta automáticamente)

**No necesitas configurar estos comandos manualmente** - Vercel los detecta y configura automáticamente.

## 🔧 Framework y Tecnologías

Este proyecto usa:
- **Next.js 14** (Framework React)
- **TypeScript** (Tipado estático)
- **ChatKit React** (@openai/chatkit-react)
- **Vercel** (Plataforma de despliegue)

**No usa Flask** - Este proyecto usa Next.js que es más adecuado para Vercel y ofrece mejor rendimiento y facilidad de despliegue.

## 📝 Estructura del Proyecto

```
.
├── app/
│   ├── api/
│   │   └── chatkit/
│   │       └── session/
│   │           └── route.ts      # API endpoint para crear sesiones
│   ├── globals.css                # Estilos globales
│   ├── layout.tsx                 # Layout principal con script de ChatKit
│   └── page.tsx                   # Página principal con componente ChatKit
├── .env.example                   # Ejemplo de variables de entorno
├── .gitignore
├── next.config.js                 # Configuración de Next.js
├── package.json
├── tsconfig.json
└── README.md
```

## 🐛 Solución de Problemas

### Error: "OPENAI_API_KEY no está configurada"
- Verifica que las variables de entorno estén configuradas en Vercel
- Asegúrate de que los nombres de las variables sean exactamente `OPENAI_API_KEY` y `WORKFLOW_ID`
- Haz un nuevo deploy después de agregar las variables

### Error: "WORKFLOW_ID no está configurada"
- Verifica que tengas un workflow creado en Agent Builder de OpenAI
- Copia el ID completo del workflow (empieza con `wf_`)
- Asegúrate de que la variable esté en Vercel

### El chat no carga
- Verifica que el script de ChatKit esté cargando (revisa la consola del navegador)
- Asegúrate de que las variables de entorno estén correctas
- Revisa los logs de Vercel para ver errores del servidor

## 📚 Recursos Adicionales

- [Documentación de ChatKit](https://platform.openai.com/docs/guides/chatkit)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Vercel](https://vercel.com/docs)
- [Agent Builder de OpenAI](https://platform.openai.com/docs/guides/agent-builder)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

---

**¡Disfruta de tu interfaz de chat con ChatKit! 🎉**

