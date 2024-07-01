document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.getElementById('search_input') as HTMLInputElement | null;

    if (!inputBusqueda) {
        console.error('No se encontró el elemento con id "search_input".');
        return;
    }

    // Obtener todos los nombres y IDs de los elementos .search_product_name
    const productos: { name: string, id: string }[] = Array.from(document.querySelectorAll('.search_product_name'))
        .map(elemento => {
            const nombre = elemento.querySelector('.search_name')?.textContent?.trim() || '';
            const id = elemento.querySelector('.search_id')?.textContent?.trim() || '';
            return { name: nombre, id: id };
        })
        .filter(producto => producto.name !== '' && producto.id !== ''); // Filtrar objetos con valores vacíos


    

        function getArticlesWithIds(idsBuscados: string[]): HTMLElement[] {
            const elementos: HTMLElement[] = Array.from(document.querySelectorAll('article.search_product_content'));

            const searchContent = document.getElementById('all_search_products');
        
            // Si la lista de IDs buscados está vacía, ocultar todos los elementos
            if (idsBuscados.length === 0) {
                elementos.forEach(elemento => {
                    elemento.style.display = 'none';
                });
                if(searchContent){
                    searchContent.style.pointerEvents='none'
                }
                
                return [];
            }
        
            let count = 0;
        
            elementos.forEach(elemento => {
                const idProductoElemento = elemento.querySelector('.search_product_name .search_id');
                if (idProductoElemento) {
                    const idProducto = idProductoElemento.textContent?.trim();
                    if (idProducto && idsBuscados.includes(idProducto) && count < 3) {
                        // Mostrar el elemento <article> si el ID está en los IDs buscados y no hemos mostrado más de 4
                        elemento.style.display = 'flex';
                        count++;
                    } else {
                        // Ocultar el elemento <article> si el ID no está en los IDs buscados o ya hemos mostrado 4
                        elemento.style.display = 'none';
                    }
                }
                if(searchContent){
                    searchContent.style.pointerEvents='auto'
                }
            });
        
            // Filtrar y devolver solo los elementos <article> visibles
            const elementosVisibles = elementos.filter(elemento => elemento.style.display !== 'none');
            return elementosVisibles;
        }

    function searchIdsByPattern(nombreBuscado: string): string[] {
        // Buscar los productos que coincidan con el patrón del nombre buscado
        const productosCoincidentes = productos.filter(producto => {
            // Verificar si el nombre del producto comienza con el nombre buscado
            return producto.name.toLowerCase().startsWith(nombreBuscado.toLowerCase());
        });
    
        // Extraer los ids de los productos coincidentes
        const idsCoincidentes = productosCoincidentes.map(producto => producto.id);
    
        return idsCoincidentes;
    }
    
    // Función para manejar el autocompletado
    function autocompletar(input: HTMLInputElement, productos: { name: string, id: string }[]) {
        input.addEventListener('input', () => {
            const valorInput = input.value.toLowerCase();
    
            // Si el input está vacío, no hacer nada y retornar
            if (valorInput === '') {
                getArticlesWithIds([]); // Ocultar todos los elementos si el input está vacío
                return;
            }
    
            // Crear un nuevo datalist
            const datalist = document.createElement('datalist');
            datalist.id = 'product_list';
    
            // Filtrar productos que coincidan con la entrada del usuario
            const opcionesFiltradas = productos.filter(producto =>
                producto.name.toLowerCase().includes(valorInput)
            );
            // Crear opciones para el datalist
            const productsId: string[] = opcionesFiltradas.map(objeto => objeto.id);
            // Llamar a getArticlesWithIds solo si hay productos filtrados
            if (productsId.length > 0) {
                getArticlesWithIds(productsId);
            } else {
                getArticlesWithIds([]); // Ocultar todos los elementos si no hay productos filtrados
            } 
        });
    }
    
    // Verificar si el inputBusqueda no es null antes de llamar a la función
    if (inputBusqueda) {
        autocompletar(inputBusqueda, productos);
    }
    
})    
