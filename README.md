# Gif React EC2

![GitHub repo size](https://img.shields.io/github/repo-size/KeinerAstos/gif-react-ec2?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/KeinerAstos/gif-react-ec2?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/KeinerAstos/gif-react-ec2?style=flat-square)
![GitHub Actions Workflow Status](https://github.com/KeinerAstos/gif-react-ec2/actions/workflows/main.yml/badge.svg)


Aplicación React para buscar y mostrar GIFs usando la API de Giphy, desplegada en un servidor **AWS EC2** con **Nginx**.

---

## 🌐 URL de la aplicación desplegada

[http://3.14.71.201/](http://3.14.71.201/)

---

## ⚡ Tecnologías utilizadas

* **React 18** – Librería principal para la interfaz.
* **Vite 6** – Bundler y entorno de desarrollo.
* **Node.js 20** – Entorno de ejecución JavaScript.
* **Nginx** – Servidor web.
* **AWS EC2** – Hosting del proyecto.
* **Giphy API** – Fuente de los GIFs.
* **Git / GitHub** – Control de versiones.

---

## 📝 Descripción de la aplicación

Esta aplicación permite buscar GIFs mediante la API de Giphy y mostrarlos en una interfaz sencilla y rápida, desplegada en la nube usando una instancia EC2 de AWS con Nginx como servidor web.

---

## 📋 Requisitos previos

* Instancia EC2 **tipo t3.micro** (gratuita) con Ubuntu 24.04.
* Clave privada `.pem` para conectarse vía SSH.
* Grupo de seguridad configurado con:

  * Puerto **22 (SSH)** abierto a tu IP.
  * Puerto **80 (HTTP)** abierto a todo el mundo (`0.0.0.0/0`).
* Node.js, npm y git instalados en la instancia (se instalarán si no existen).

---

## 🛠 Paso a paso del despliegue

### 1️⃣ Conectarse a la instancia EC2

```bash
cd C:\ruta\donde\esta\tu\clave
ssh -i "nombre.pem" ubuntu@<IP_PUBLICA>
```

* Usuario por defecto: `ubuntu`.
* Confirmar conexión escribiendo `yes` si es la primera vez.

---

### 2️⃣ Actualizar sistema

```bash
sudo apt update
sudo apt upgrade -y
```

---

### 3️⃣ Instalar dependencias

```bash
sudo apt install nodejs npm git -y
```

Verificar versiones:

```bash
node -v
npm -v
git --version
```

---

### 4️⃣ Instalar y configurar Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

---

### 5️⃣ Clonar el proyecto

```bash
cd ~
git clone https://github.com/KeinerAstos/gif-react-ec2.git
cd gif-react-ec2
```

Si ya estaba clonado:

```bash
git pull origin main
```

---

### 6️⃣ Instalar dependencias del proyecto

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 7️⃣ Construir versión para producción

```bash
npm run build
```

* Esto genera la carpeta `dist` con los archivos estáticos.

**Problema frecuente:**

* Error `Cannot find module @rollup/rollup-linux-x64-gnu` al ejecutar `npm run build`.
  **Solución:**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 8️⃣ Copiar archivos a Nginx

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

* Ahora Nginx sirve la aplicación desde `/var/www/html`.

**Problema frecuente:**

* `dist` no existía porque `npm run build` falló previamente.
  **Solución:** Limpiar `node_modules` y `package-lock.json` y reinstalar dependencias.

---

### 9️⃣ Verificar funcionamiento

* Abrir en navegador: `http://<IP_PUBLICA>/`
* Asegurarse de que el Security Group permita el puerto 80.
* Si no carga, revisar que `sudo ufw status` muestre que está inactivo o que permita HTTP.

---

## ⚠ Problemas encontrados y soluciones

| Problema                                         | Solución                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------ |
| Conflicto de ramas al clonar repositorio antiguo | Crear un nuevo repositorio con una sola rama y volver a subir el proyecto.     |
| `npm run build` falla por `rollup-linux-x64-gnu` | Eliminar `node_modules` y `package-lock.json`, luego `npm install` nuevamente. |
| Página no visible desde otros dispositivos       | Configurar Security Group y verificar puertos abiertos en AWS y UFW.           |
| Error de permisos al instalar paquetes globales  | Usar `sudo` al instalar paquetes npm globales o ajustar permisos del sistema.  |

---
## Página no visible desde otros dispositivos SOLUCION A PROFUNDIDAD
Cuando la página no estaba visible desde otros dispositivos, el problema era que el firewall de Ubuntu (ufw) estaba inactivo o no permitía tráfico HTTP en el puerto 80. Los comandos que usamos para activarlo y permitir HTTP fueron:
```bash
# Activar UFW (firewall)
sudo ufw enable

# Permitir SSH (puerto 22) si no está permitido
sudo ufw allow 22

# Permitir tráfico HTTP (puerto 80)
sudo ufw allow 80

# Verificar el estado y las reglas activas
sudo ufw status
```
Con esto el puerto 80 quedó abierto y la página fue accesible desde cualquier navegador usando la IP pública de la instancia EC2.

## 💡 Consejos y mejores prácticas

* Siempre limpiar `node_modules` y `package-lock.json` si hay errores al instalar dependencias.
* Mantener un solo repositorio con una rama principal evita conflictos de merge.
* Configurar correctamente los Security Groups antes de desplegar.
* Usar `npm run build` para generar la versión de producción antes de servirla con Nginx.
* Probar la IP pública en múltiples dispositivos para verificar la visibilidad de la aplicación.

---

## 🔄 Actualizaciones de la aplicación

Cada vez que se realicen cambios en proyectos:

```bash
# Desde tu PC local
git add .
git commit -m "Descripción de los cambios"
git push origin main

# En EC2
ssh -i "nombre.pem" ubuntu@<IP_PUBLICA>
#ingresamos a la carpeta para ejecutar los siguientes comandos, en este caso la carpeta tiene nombre de gif-react.ec2
cd ~/gif-react-ec2
git pull origin main
rm -rf node_modules package-lock.json
npm install
npm run build
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

---


