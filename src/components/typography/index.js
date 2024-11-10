import { cva } from 'class-variance-authority'

export { default as Typography } from './Typography.vue'

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      p: 'text-base leading-relaxed',
    },
    color: {
      foreground: 'text-foreground',
      'primary-foreground': 'text-primary-foreground',
      'secondary-foreground': 'text-secondary-foreground',
      destructive: 'text-destructive',
      'destructive-foreground': 'text-destructive-foreground',
      muted: 'text-muted',
      'muted-foreground': 'text-muted-foreground',
      accent: 'text-accent',
      'accent-foreground': 'text-accent-foreground',
      input: 'text-input',
    },
    alignment: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'p',
    color: 'foreground',
    alignment: 'left',
  },
})
