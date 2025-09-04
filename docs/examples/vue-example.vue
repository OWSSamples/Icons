<template>
  <div class="origon-icon" :class="className">
    <img
      v-if="!loading && !error"
      :src="iconUrl"
      :alt="alt || name"
      :width="size"
      :height="size"
      v-bind="$attrs"
    />
    <div
      v-else-if="loading"
      class="origon-icon-loading"
      :style="{ width: size + 'px', height: size + 'px' }"
    ></div>
    <div
      v-else
      class="origon-icon-error"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      ❌
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrigonIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 24,
    },
    style: {
      type: String,
      default: 'regular',
      validator: value =>
        [
          'regular',
          'filled',
          'light',
          'color',
          'regular_ltr',
          'regular_rtl',
          'filled_ltr',
          'filled_rtl',
        ].includes(value),
    },
    className: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      iconUrl: '',
      loading: true,
      error: null,
    };
  },
  computed: {
    computedIconUrl() {
      if (!this.name) return '';

      const baseUrl = 'https://cdn.origonlabs.opendex.dev';
      const encodedName = encodeURIComponent(this.name);
      const fileName = `ic_origon_${this.name.toLowerCase().replace(/\s+/g, '_')}_${this.size}_${this.style}.svg`;
      return `${baseUrl}/icons/${encodedName}/SVG/${fileName}`;
    },
  },
  watch: {
    name: {
      immediate: true,
      handler() {
        this.loadIcon();
      },
    },
    size() {
      this.loadIcon();
    },
    style() {
      this.loadIcon();
    },
  },
  methods: {
    async loadIcon() {
      if (!this.name) {
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        // Verificar si el icono existe
        const response = await fetch(this.computedIconUrl, { method: 'HEAD' });
        if (response.ok) {
          this.iconUrl = this.computedIconUrl;
        } else {
          throw new Error(`Icono no encontrado: ${this.name}`);
        }
      } catch (error) {
        this.error = error;
        console.error('Error cargando icono:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.origon-icon {
  display: inline-block;
}

.origon-icon-loading {
  background: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}

.origon-icon-error {
  background: #ffebee;
  border: 1px solid #f44336;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f44336;
  font-size: 12px;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
