<script setup>
import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { useFlowStore } from '@/stores'
import { Button } from '@/components/ui/button'
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
    <Button type="submit" class="mt-auto" :disabled="!canSubmit">Create New Node</Button>
  </form>
</template>
