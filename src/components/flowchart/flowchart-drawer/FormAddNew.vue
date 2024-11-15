<script setup>
import Button from '@/components/ui/button/Button.vue'
import { useFlowStore } from '@/stores'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { computed, watch } from 'vue'

const flowstore = useFlowStore()

const typeOptions = [
  { value: 'sendMessage', display: 'Send Message' },
  { value: 'dateTime', display: 'Business Hours' },
  { value: 'addComment', display: 'Add Comment' },
]

const formSchema = z.object({
  type: z.string().nullable(),
  name: z.string().min(1, 'Name is required'),
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    type: null,
    name: '',
  },
})

const { value: type, errors: typeErrors } = useField('type')
const { value: name, errors: nameErrors } = useField('name')

const onSubmit = form.handleSubmit((values) => {
  flowstore.handleCreateNewNode({
    type: values.type,
    name: values.name,
  })
})

const canSubmit = computed(() => {
  return form.meta.value.valid
})
</script>
<template>
  <form @submit.prevent="onSubmit" class="flex-grow flex flex-col">
    <FormField v-slot="{ componentField }" name="type">
      <FormItem>
        <FormLabel>Type</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="option in typeOptions" :key="option.value" :value="option.value">
                {{ option.display }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter a name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-auto" :disabled="!canSubmit">Update Comment</Button>
  </form>
</template>
