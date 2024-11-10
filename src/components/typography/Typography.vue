<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive } from 'radix-vue'
import { typographyVariants } from '.'

const props = defineProps({
  variant: { type: String },
  color: { type: String },
  alignment: { type: String },
  class: { type: [String, Object, Array], default: '' },
  asChild: { type: Boolean, default: false },
  as: { type: String, default: null },
})

const computedAs = computed(() => props.as || props.variant || 'p')
</script>

<template>
  <Primitive
    :as="computedAs"
    :as-child="asChild"
    :class="cn(typographyVariants({ variant, color, alignment }), props.class)"
  >
    <slot />
  </Primitive>
</template>
