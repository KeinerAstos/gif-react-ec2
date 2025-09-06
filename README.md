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
el pull lo que hace es descargar las nuevas actualizaciones que fueron cargadas en el repostiorio con el fin de realizar un consolidado del proyecto 

---

### 6️⃣ Instalar dependencias del proyecto

```bash
rm -rf node_modules package-lock.json
npm install
```
Eliminamos el archivo packege-lock.json con el fin de volver a cargarlo en el siguiente paso y que no cause ningun error si se quiere correr el original

---

### 7️⃣ Construir versión para producción

```bash
npm run build
```

* Esto genera la carpeta `dist` con los archivos estáticos.

**Problema frecuente:**

Cuando intentamos compilar el proyecto, aparecía este error:
```
Error: Cannot find module '@rollup/rollup-linux-x64-gnu'
Require stack:
- ...
```

📌 Causa:
Este problema ocurre porque la instalación de dependencias queda corrupta o incompleta. Suele pasar con paquetes que dependen de binarios específicos según el sistema operativo, como rollup.

✅ Solución

Reinstalar las dependencias desde cero:
```
rm -rf node_modules package-lock.json
npm install
```

👉 Esto fuerza a npm a reconstruir todas las dependencias correctamente y resuelve el error.

---

### 8️⃣ Copiar archivos a Nginx

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

* Ahora Nginx sirve la aplicación desde `/var/www/html`.

### Problema frecuente: Carpeta dist no generada
En algunos casos, al ejecutar comandos relacionados con la carpeta de distribución (dist), aparecía el error de que dist no existía.

📌 Causa:
Esto sucede porque el comando npm run build había fallado previamente debido a problemas con dependencias o configuración, por lo tanto nunca se generó la carpeta dist.

✅ Solución

Limpiar dependencias y archivos bloqueados:
```
rm -rf node_modules package-lock.json
```

Reinstalar dependencias:
```
npm install
```

Volver a ejecutar el build:
```
npm run build
```

👉 Esto garantiza que la carpeta dist se genere correctamente.
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
## Automatización con GitHub Actions

---
## 🛠 Configuración de pruebas

### 1. Creación del archivo de test

Se creó un archivo de prueba `src/test-app.test.jsx` para el componente principal `GifExpertApp`:

```jsx
import { render, screen } from '@testing-library/react';
import { GifExpertApp } from './GifExpertApp';

test('renders without crashing', () => {
  render(<GifExpertApp />);
});

test('contains expected text', () => {
  render(<GifExpertApp />);
  const element = screen.getByText(/welcome/i); // Ajusta al texto real de tu componente
  expect(element).toBeInTheDocument();
});
```
Recordar que es importante que el archivo quede como (.test.jsx) ya que es importante al momento de ejecutar el commit en github actions ya que busca un archivo .test

### 2. Configuración de Jest
Modificar el archivo jest.config.js ->> jest.config.cjs con la misma información

Se crea jest.config.cjs en la raíz del proyecto:
```
module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: false
};
```


Se crearon mocks para archivos estáticos:

__mocks__/styleMock.js:
```

module.exports = {};

```

__mocks__/fileMock.js:
```

module.exports = "test-file-stub";
```


Y el archivo jest.setup.js quedó así:
```

import "whatwg-fetch";
```


🔹 Esto permite que Jest ignore CSS y assets como imágenes y fuentes, evitando errores en los tests.

### 3. Configuración de Babel

Debido a que el proyecto está en ES Modules ("type": "module" en package.json), se renombró la configuración de Babel a CommonJS:
- Modificar el archivo babel.config.js -> babel.config.cjs
Archivo babel.config.cjs:
```

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```


⚠️ Esto solucionó error:
ReferenceError: module is not defined in ES module scope

### 4. Configuración de GitHub Actions

Archivo .github/workflows/main.yml:
```

name: Run Tests

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests with Jest
        run: npm test -- --watchAll=false

```

🔹 Este workflow ejecuta automáticamente los tests cada vez que hay un push o pull request en main.

### 5. Errores encontrados y soluciones

### Error: Errores al importar CSS/FontAwesome en Jest
Cuando corríamos los tests, aparecía un error parecido a este:
```
FAIL src/app.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    /node_modules/@fortawesome/fontawesome-free/css/all.min.css:6
    .fa,.fa-brands,.fa-classic { ... }
    ^

    SyntaxError: Unexpected token '.'

    > 1 | import "@fortawesome/fontawesome-free/css/all.min.css";
        | ^

```
📌 Causa:
Jest no interpreta archivos .css, .scss, imágenes, fuentes ni otros assets estáticos. Al encontrarse con un import "@fortawesome/fontawesome-free/css/all.min.css";, lo toma como JavaScript y falla.

✅ Solución

Creamos mocks para que Jest “ignore” donde se nombran en el PASO NUMERO 2

### Errores en Git al hacer push
```
git pull
error: You have not concluded your merge (MERGE_HEAD exists).
hint: Please, commit your changes before merging.
fatal: Exiting because of unfinished merge.

```
la solución es hacer un pull integrando las actulizaciones montadas en el github a nuestro local para poder hacer un push con todo integrado
```
git add .
git commit -m "fix: concluir merge con actualizaciones del repo"
git pull origin main
```

### 6. OBSERVAR 

Observamos que el Badge aparece en estado Passing ya que todo quedó correcto