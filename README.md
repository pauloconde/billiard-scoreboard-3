# Billiard Scoreboard PWA 🎱

Una aplicación web progresiva (PWA) moderna y rápida diseñada específicamente para llevar el marcador de partidas de billar en dispositivos móviles o tablets. La interfaz favorece la visualización clara del puntaje incluso a la distancia utilizando una división geométrica 50/50 de alto contraste.

Desarrollada por **Paulo Conde** ([pauloconde.dev](https://pauloconde.dev)).

## ✨ Características Principales

- **Diseño a Pantalla Dividida**: Diferencia claramente el lado del Jugador A (Blanco) y el Jugador B (Amarillo).
- **Control Intuitivo**: Toca cualquier número grande en pantalla para incrementar el marcador.
- **Entradas y Promedios Activos**: Seguimiento central del límite de "Entradas" y cálculo en tiempo real del promedio de puntos de los jugadores limitado a tres posiciones decimales exactas.
- **Corrección de Errores**: Botones discretos (`-`) para descontar en caso de equivocación de suma tanto en carambolas como en entradas.
- **Opción de Nombres Editables**: Simplemente toca encima de las etiquetas superiores de los jugadores para ingresar el nombre deseado.
- **100% Instalable - PWA Ready**: Funciona de forma totalmente offline mediante Service Workers y caché en Workbox. Genera e implanta su manifiesto con un script a medida.
- **Force Landscape Orientado a Móviles**: Forzado estricto vía orientative API Lock y CSS de tamaños de texto base (`-webkit-text-size-adjust`) para evitar que la configuración de accesibilidad visual del SO de un móvil descuadre la UI.

## 🛠️ Stack Tecnológico

Desarrollado bajo una arquitectura Island (Mix de estático y estado reactivo de alta velocidad):
- **Framework Principal**: [Astro](https://astro.build)
- **Componentes con Estado**: [React JS](https://react.dev)
- **Estilos Funcionales**: [Tailwind CSS v4](https://tailwindcss.com)
- **Soporte PWA**: [Vite PWA](https://vite-pwa-org.netlify.app/)
- **Procesamiento Gráfico (Iconos)**: [Sharp](https://sharp.pixelplumbing.com/)

---

## 🚀 Guía de Inicio

### Requisitos Previos
Asegúrate de contar con Node.js (v18+) instalado.

### 1. Instalación
Clona el repositorio e instala las dependencias mediante npm:
```bash
npm install
```
*(Es posible que debas añadir el flag `--legacy-peer-deps` por conflictos menores de peerDependencies entre las versiones de Astro y Vite PWA)*.

### 2. Generación de Iconos PWA
La app requiere generar los iconos de 192x192 y 512x512 para el ecosistema de la PWA. Usa el script embebido si necesitas cambiarlos:
Abre el archivo origen `public/favicon.svg` y cuando lo modifiques corre la generación empaquetada con:
```bash
npx tsx scripts/generate-manifest.ts
```

### 3. Desarrollo Local
Levanta el servidor en su ruta por defecto (generalmente `localhost:4321`):
```bash
npm run dev
```

### 4. Compilación de Producción
Crea una build optimizada sin el entorno de inyección de recarga en caliente:
```bash
npm run build
```

## 📝 Licencia / Autoría
**Versión Inicial**: 1.3.0

Esta aplicación fue creada e ideada por **Paulo Conde**. 
Puedes conocer más proyectos en [github.com/pauloconde](https://github.com/pauloconde).
