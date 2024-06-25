# Documentación del Proyecto

## Índice

1.  [Introducción](#introducci%C3%B3n)
2.  [Estructura del Proyecto](#estructura-del-proyecto)
    -   [Carpeta `api`](#carpeta-api)
    -   [Carpeta `components`](#carpeta-components)
    -   [Carpeta `layouts`](#carpeta-layouts)
    -   [Carpeta `pages`](#carpeta-pages)
    -   [Carpeta `utils`](#carpeta-utils)
3.  [Instalación](#instalaci%C3%B3n)
4.  [Uso](#uso)
5.  [Contribuciones](#contribuciones)
6.  [Licencia](#licencia)

## Introducción

Este proyecto es una página web de práctica que utiliza TypeScript, Astro y Axios para interactuar con la API de FakeStore. La estructura del proyecto está organizada en varias carpetas, cada una con un propósito específico para facilitar el desarrollo y mantenimiento del código.

## Estructura del Proyecto

### Carpeta `api`

-   **`api.ts`**: Conexión con Axios a FakeStore API.
-   **`productsService.ts`**: Consume la API y crea nuevas constantes o funciones para la funcionalidad de la página.
-   **`types.ts`**: Exporta los tipos de datos que se usarán.

### Carpeta `components`

#### Icons

-   **`icons`**: Carpeta de iconos.

#### Subcomponentes

-   **`Login.astro`**: Estructura HTML y CSS de la parte de login y llama a `login.ts` para cargar los datos de los usuarios de la API.
-   **`QuantityButton.astro`**: Contador de elementos en el carrito de compras.
-   **`QuantityButtonPage.astro`**: Contador de elementos en los productos (se puede simplificar con `QuantityButton`).
-   **`Swiper.astro`**: Slide de la página del producto.
-   **`SwiperCategory.astro`**: Slide de recomendados que quita el elemento de la página y deja los elementos que comparten la categoría.
-   **`Cart.astro`**: Adaptable a los estilos CSS, para adjuntar elementos en el carrito.
-   **`CartButton.astro`**: Botón de la barra de navegación del carrito.
-   **`Footer.astro`**: Footer de la página principal.
-   **`LoginButton.astro`**: Botón de login de la barra de navegación.
-   **`Mobile.astro`**: Botón que aparece en la versión móvil.
-   **`MobileCategory.astro`**: Botón dropdown de categoría dentro de la versión móvil, con un script para cerrar cuando se hace clic fuera.
-   **`MobileLogin.astro`**: Login portado a la versión móvil.
-   **`MobileUser.astro`**: Usuario móvil con la lógica de `userButton.ts`.
-   **`NavBar.astro`**: Barra de navegación de toda la página con scripts para cerrar botones con clics externos y cargar botones según el estado de login.
-   **`PageProduct.astro`**: Página del producto que incluye el slider y sus características, contiene `carts.ts` con la lógica CRUD del carrito.
-   **`SearchButton.astro`**: Botón de búsqueda con la lógica de `search.ts`.
-   **`SearchContent.astro`**: Contenido de búsqueda con los templates de los productos buscados.
-   **`SearchProduct.astro`**: Template del producto buscado para luego imprimir en `SearchContent`.
-   **`UserButton.astro`**: Botón de usuario que muestra nombre y correo, con la lógica de `userButton.ts`.

### Carpeta `layouts`

-   **`Layout.astro`**: Layout de toda la página.

### Carpeta `pages`

-   **`category` y `categories`**: Páginas de categorías.
-   **`404.astro`**: Página de error 404.
-   **`index.astro`**: Página principal.
-   **`info.astro`**: Página de información.
-   **`user.astro`**: Página de usuario.

### Carpeta `utils`

-   **`capitalizeFirstLetter.ts`**: Pone en mayúscula la primera letra.
-   **`carts.ts`**: Lógica CRUD del carrito.
-   **`cartSave.ts`**: Lógica CRUD del carrito.
-   **`getcookies.ts`**: Accede a `localStorage`.
-   **`login.ts`**: Lógica de login.
-   **`loginverification.ts`**: Verifica si hay valores de login o token en `localStorage`.
-   **`search.ts`**: Lógica del buscador.
-   **`updateCart.ts`**: Actualiza el carrito.
-   **`userButton.ts`**: Brinda las características del usuario.

## Instalación

1.  Clona el repositorio:
    
    sh
    
    Copiar código
    
    `git clone <URL-del-repositorio>` 
    
2.  Instala las dependencias:
    
    sh
    
    Copiar código
    
    `npm install` 
    

## Uso

1.  Inicia el servidor de desarrollo:
    
    sh
    
    Copiar código
    
    `npm run dev` 
    
2.  Abre tu navegador y navega a `http://localhost:3000`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos:

1.  Haz un fork del repositorio.
2.  Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`).
3.  Haz commit de tus cambios (`git commit -m 'Agrega nueva característica'`).
4.  Sube tu rama (`git push origin feature/nueva-caracteristica`).
5.  Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

----------

Esta documentación en Markdown proporciona una estructura clara y organizada para que otros desarrolladores puedan entender y contribuir a tu proyecto fácilmente.
