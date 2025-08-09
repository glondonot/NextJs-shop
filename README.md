# NextJs-shop

Una aplicación de tipo tienda desarrollada con Next.js que incluye gestión de productos, carrito de compras y optimización por presupuesto.

URL de la aplicación en Vercel: [NextJs TechStore](https://next-js-shop-ki2zs6duf-gabriels-projects-a6af1bab.vercel.app)

## Instrucciones para Instalar y Ejecutar

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (normalmente viene incluido con Node.js)

### Instalación

1. **Clona y abre el repositorio**:
   ```bash
   cd NextJs-shop
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

### Ejecución

#### Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

#### Modo Producción
```bash
npm run build
npm start
```

## Descripción de la Solución

### Funcionalidades Principales

#### 1. **Catálogo de Productos**
- Visualización de productos con imágenes y precios
- Interfaz responsive con grid de productos
- Botón de cantidad y "Agregar al carrito" para cada producto

#### 2. **Carrito de Compras**
- Gestión completa del carrito con persistencia en cookies
- Incremento/decremento de cantidades
- Eliminación de productos
- Cálculo automático del total
- Opción de optimización del carrito basada en presupuesto

#### 3. **Optimización por Presupuesto**
- Algoritmo inteligente que encuentra la mejor combinación de productos
- Utiliza programación dinámica (algoritmo de la mochila)
- Maximiza el valor obtenido dentro del presupuesto especificado
- Considera las cantidades existentes en el carrito

### Arquitectura Técnica

#### Stack Tecnológico
- **Framework:** Next.js 15.4.6 con App Router
- **Frontend:** React 19.1.0
- **Styling:** Tailwind CSS 4
- **TypeScript:** Para tipado estático
- **Estado:** Manejo local con hooks de React y persistencia en cookies

#### Estructura del Proyecto

```
NextJs-shop/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── cart/          # Endpoints del carrito
│   │   ├── optimize/      # Endpoint de optimización
│   │   └── products/      # Endpoints de productos
│   ├── budget/            # Página de optimización por presupuesto
│   ├── cart/              # Página del carrito
│   └── page.tsx           # Página principal (catálogo)
├── components/            # Componentes React reutilizables
├── data/                  # Datos estáticos (productos)
├── utils/                 # Utilidades y helpers
│   ├── cookies.ts         # Manejo de cookies (server-side)
│   ├── clientCookies.ts   # Manejo de cookies (client-side)
│   └── findBestCombination.ts # Algoritmo de optimización
└── public/                # Archivos estáticos
```

#### Características Técnicas Destacadas

1. **Algoritmo de Optimización Avanzado**
   - Implementación del problema de la mochila (knapsack problem)
   - Encuentra la combinación óptima de productos dentro del presupuesto

2. **Persistencia de Estado**
   - Uso de cookies para mantener el carrito entre sesiones
   - Implementación tanto server-side como client-side
   - Manejo de hidratación correcta en Next.js

3. **API REST**
   - Endpoints organizados para productos, carrito y optimización
   - Manejo adecuado de métodos HTTP (GET, POST, DELETE)
   - Validación de datos y manejo de errores

4. **Componentes Modulares**
   - Separación clara entre lógica de negocio y presentación
   - Componentes reutilizables y bien tipados
   - Patrón de composición para mayor flexibilidad

5. **UX/UI Responsivo**
   - Diseño adaptable a diferentes dispositivos
   - Navegación intuitiva entre secciones
   - Notificaciones para feedback visual para acciones del usuario

### Flujo de Usuario

1. **Exploración:** El usuario navega por el catálogo de productos
2. **Selección:** Agrega cantidad de productos de interés al carrito
3. **Gestión:** Modifica cantidades en el carrito según necesidades
4. **Optimización:** Utiliza la función de presupuesto para maximizar valor
5. **Revisión:** Revisa la selección final optimizada

### Decisiones Técnicas

- **Next.js App Router:** Para aprovechar las últimas características y mejor rendimiento
- **TypeScript:** Para mayor robustez y mejor experiencia de desarrollo
- **Tailwind CSS:** Para un desarrollo rápido de UI con utilidades CSS
- **Programación Dinámica:** Para resolver eficientemente el problema de optimización
- **Cookies:** Para persistencia simple sin necesidad de base de datos

Esta solución demuestra competencias en desarrollo full-stack, algoritmos de optimización, manejo de estado, y diseño de interfaces de usuario modernas.
