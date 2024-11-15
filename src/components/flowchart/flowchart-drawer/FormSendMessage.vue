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

/**
 * @returns {type}
 */
const getFirstMessage = (payload) => {
  if (Array.isArray(payload)) {
    return payload[0]
  }

  return payload
}

const normalizeMessage = (message) => {
  return message.text || message.attachment
}

const createMessagePayload = (message) => {
  return {
    type: 'text',
    text: message,
  }
}

const message = computed(() => {
  const payload = flowstore.selectedNode.data.payload
  return normalizeMessage(getFirstMessage(payload))
})

const formSchema = toTypedSchema(
  z.object({
    message: z.string().min(1, { message: 'Require at least 1 character' }),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    message: message.value,
  },
})

const onSubmit = form.handleSubmit((values) => {
  flowstore.updateNodeData(flowstore.selectedNode, {
    payload: createMessagePayload(values.message),
  })
})

const messageError = computed(() => {
  return form.errors.value.message
})
</script>
<template>
  <form @submit.prevent="onSubmit" class="flex-grow flex flex-col">
    <FormField v-slot="{ componentField }" name="message">
      <FormItem>
        <FormLabel>Message</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your message" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-auto" :disabled="messageError">Update Message</Button>
  </form>
</template>
