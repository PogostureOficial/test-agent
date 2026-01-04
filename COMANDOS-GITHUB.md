# 🚀 Comandos para Subir a GitHub

Ya está todo listo. Solo necesitas crear el repositorio en GitHub y luego ejecutar estos comandos:

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com y inicia sesión
2. Haz clic en el **"+"** en la esquina superior derecha → **"New repository"**
3. Nombre del repositorio: `AGENT-TEST` (o el que prefieras)
4. **Deja todo en blanco** (NO marques README, .gitignore, ni license - ya los tenemos)
5. Haz clic en **"Create repository"**

## Paso 2: Ejecutar estos comandos

Después de crear el repo, GitHub te mostrará una URL. Copia la URL HTTPS (parece: `https://github.com/TU_USUARIO/AGENT-TEST.git`)

Luego ejecuta estos comandos (reemplaza la URL con la tuya):

```powershell
git remote add origin https://github.com/TU_USUARIO/AGENT-TEST.git
git branch -M main
git push -u origin main
```

**Ejemplo:**
Si tu usuario es `juanperez` y tu repo es `AGENT-TEST`, sería:
```powershell
git remote add origin https://github.com/juanperez/AGENT-TEST.git
git branch -M main
git push -u origin main
```

## ⚠️ Si pide autenticación

Si te pide usuario y contraseña:
- **Usuario**: Tu nombre de usuario de GitHub
- **Contraseña**: NO uses tu contraseña, usa un **Personal Access Token**

### Crear Personal Access Token:

1. Ve a: https://github.com/settings/tokens
2. Click en **"Generate new token (classic)"**
3. Nombre: `AGENT-TEST` (cualquier nombre)
4. Selecciona: ✅ **repo** (todos los permisos de repositorio)
5. Click en **"Generate token"**
6. **COPIA EL TOKEN** (solo se muestra una vez)
7. Cuando pida contraseña, pega este token

## ✅ Listo!

Después de `git push`, ve a tu repositorio en GitHub y verás todos tus archivos allí.

