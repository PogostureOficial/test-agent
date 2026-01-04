# 📤 Instrucciones para Subir el Proyecto a GitHub

## Opción 1: Con GitHub CLI (Automático - Recomendado)

Si tienes GitHub CLI instalado, ejecuta estos comandos en PowerShell:

```powershell
# 1. Inicializar git
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit inicial
git commit -m "Initial commit: ChatKit OpenAI app"

# 4. Crear repositorio en GitHub y subir (preguntará si quieres crear el repo)
gh repo create AGENT-TEST --public --source=. --remote=origin --push
```

Si no tienes GitHub CLI, sigue la **Opción 2**.

---

## Opción 2: Manual (Sin GitHub CLI)

### Paso 1: Inicializar Git y hacer commit

Ejecuta estos comandos en PowerShell en la carpeta del proyecto:

```powershell
# Inicializar repositorio git
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: ChatKit OpenAI app"
```

### Paso 2: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Nombra tu repositorio (ej: `AGENT-TEST` o `chatkit-openai-app`)
5. **NO marques** "Initialize this repository with a README" (ya tenemos archivos)
6. Haz clic en **"Create repository"**

### Paso 3: Conectar y subir

GitHub te mostrará comandos. Ejecuta estos (reemplaza `TU_USUARIO` y `NOMBRE_REPO`):

```powershell
# Conectar con el repositorio remoto (reemplaza TU_USUARIO y NOMBRE_REPO)
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git

# Cambiar la rama principal a main (si es necesario)
git branch -M main

# Subir todos los archivos
git push -u origin main
```

**Ejemplo real:**
```powershell
git remote add origin https://github.com/juanperez/AGENT-TEST.git
git branch -M main
git push -u origin main
```

---

## ⚠️ Si te pide autenticación

Si te pide usuario y contraseña, usa un **Personal Access Token** en lugar de tu contraseña:

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Selecciona permisos: `repo` (acceso completo a repositorios)
4. Copia el token generado
5. Cuando pida contraseña, pega el token en su lugar

---

## ✅ Verificar que funcionó

Después de subir, ve a tu repositorio en GitHub y deberías ver todos los archivos allí.

