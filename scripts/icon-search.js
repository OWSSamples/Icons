/**
 * API de búsqueda para iconos Origon
 * Proporciona funciones para buscar, filtrar y obtener iconos del catálogo
 */

class OrigonIconSearch {
  constructor(catalogUrl = 'https://cdn.origonlabs.opendex.dev/catalog.json') {
    this.catalogUrl = catalogUrl;
    this.catalog = null;
    this.loaded = false;
  }

  async loadCatalog() {
    if (this.loaded) return this.catalog;

    try {
      const response = await fetch(this.catalogUrl);
      this.catalog = await response.json();
      this.loaded = true;
      return this.catalog;
    } catch (error) {
      console.error('Error cargando catálogo:', error);
      throw error;
    }
  }

  /**
   * Buscar iconos por término
   * @param {string} query - Término de búsqueda
   * @param {Object} options - Opciones de búsqueda
   * @returns {Array} Array de iconos que coinciden
   */
  async search(query, options = {}) {
    await this.loadCatalog();

    const {
      size = null,
      style = null,
      category = null,
      limit = 50,
      exact = false,
    } = options;

    let results = [];

    if (exact) {
      // Búsqueda exacta por nombre
      results = this.catalog.icons.filter(
        icon => icon.name.toLowerCase() === query.toLowerCase()
      );
    } else {
      // Búsqueda por términos
      const searchTerms = query
        .toLowerCase()
        .split(' ')
        .filter(term => term.length > 0);
      const matchingIndices = new Set();

      searchTerms.forEach(term => {
        if (this.catalog.searchIndex[term]) {
          this.catalog.searchIndex[term].forEach(index => {
            matchingIndices.add(index);
          });
        }
      });

      results = Array.from(matchingIndices).map(
        index => this.catalog.icons[index]
      );
    }

    // Aplicar filtros adicionales
    if (size) {
      results = results.filter(icon =>
        icon.variants.some(v => v.size === size)
      );
    }

    if (style) {
      results = results.filter(icon =>
        icon.variants.some(v => v.style === style)
      );
    }

    if (category) {
      results = results.filter(icon =>
        icon.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    return results.slice(0, limit);
  }

  /**
   * Obtener icono por nombre exacto
   * @param {string} name - Nombre del icono
   * @param {number} size - Tamaño preferido
   * @param {string} style - Estilo preferido
   * @returns {Object|null} Icono encontrado o null
   */
  async getIcon(name, size = 24, style = 'regular') {
    await this.loadCatalog();

    const icon = this.catalog.icons.find(
      i => i.name.toLowerCase() === name.toLowerCase()
    );

    if (!icon) return null;

    // Buscar variante específica
    let variant = icon.variants.find(v => v.size === size && v.style === style);

    // Si no existe, buscar la más cercana
    if (!variant) {
      variant = icon.variants.find(v => v.style === style) || icon.variants[0];
    }

    return {
      ...icon,
      selectedVariant: variant,
      url: variant.url,
    };
  }

  /**
   * Obtener todas las categorías
   * @returns {Array} Array de categorías
   */
  async getCategories() {
    await this.loadCatalog();
    return Object.keys(this.catalog.categories).sort();
  }

  /**
   * Obtener iconos por categoría
   * @param {string} category - Nombre de la categoría
   * @returns {Array} Array de iconos en la categoría
   */
  async getByCategory(category) {
    await this.loadCatalog();
    return this.catalog.icons.filter(
      icon => icon.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Obtener estadísticas del catálogo
   * @returns {Object} Estadísticas del catálogo
   */
  async getStats() {
    await this.loadCatalog();
    return {
      totalIcons: this.catalog.totalIcons,
      totalVariants: this.catalog.totalVariants,
      categories: Object.keys(this.catalog.categories).length,
      sizes: this.catalog.sizes,
      styles: this.catalog.styles,
      generatedAt: this.catalog.generatedAt,
    };
  }

  /**
   * Generar URL de icono
   * @param {string} name - Nombre del icono
   * @param {number} size - Tamaño
   * @param {string} style - Estilo
   * @returns {string} URL del icono
   */
  generateUrl(name, size = 24, style = 'regular') {
    const encodedName = encodeURIComponent(name);
    return `${this.catalog.baseUrl}/icons/${encodedName}/SVG/ic_origon_${name.toLowerCase().replace(/\s+/g, '_')}_${size}_${style}.svg`;
  }
}

// Exportar para uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OrigonIconSearch;
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
  window.OrigonIconSearch = OrigonIconSearch;
}
