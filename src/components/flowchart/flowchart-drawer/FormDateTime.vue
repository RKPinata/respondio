<script setup>
import { watchEffect } from 'vue'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'

const TimeRangeSchema = toTypedSchema(
  z.object({
    timeRange: z
      .array(
        z.object({
          hours: z.number().min(0).max(23),
          minutes: z.number().min(0).max(59),
          seconds: z.number().min(0).max(59),
        }),
      )
      .length(2, { message: 'Please select both start and end times.' }),
  }),
)

// Form setup with Vee-Validate and Zod schema
const form = useForm({
  validationSchema: TimeRangeSchema,
  initialValues: {
    timeRange: [],
  },
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Selected time range:', values.timeRange)
})

const { value: timeRange } = useField('timeRange')

watchEffect(() => {
  console.log('Time changed:', form.values.timeRange)
})
</script>

<template>
  <form @submit="onSubmit" class="flex-grow flex flex-col">
    <VueDatePicker
      v-model="timeRange"
      :time-picker="true"
      :range="true"
      placeholder="Select Time"
    />
    <Button type="submit" class="mt-auto">Update Message</Button>
  </form>
</template>
