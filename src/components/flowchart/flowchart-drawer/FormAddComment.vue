<script setup>
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useFlowStore } from '@/stores'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const flowstore = useFlowStore()

const comment = computed(() => flowstore.selectedNode.data.comment)

const formSchema = toTypedSchema(
  z.object({
    comment: z.string().min(1, { message: 'Require at least 1 character' }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    comment: comment.value,
  },
})

const onSubmit = form.handleSubmit((values) => {
  flowstore.updateNodeData(flowstore.selectedNode, {
    comment: values.comment,
  })
})

const commentError = computed(() => {
  return form.errors.value.comment
})
</script>
<template>
  <form @submit.prevent="onSubmit" class="flex-grow flex flex-col">
    <FormField v-slot="{ componentField }" name="comment">
      <FormItem>
        <FormLabel>Comment</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your comment" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-auto" :disabled="commentError">Update Comment</Button>
  </form>
</template>
