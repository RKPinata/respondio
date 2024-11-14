<script setup>
import { watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import { useFlowStore } from '@/stores'
import { capitalizeFirstLetter } from '@/lib/utils'
import FormLabel from '@/components/ui/form/FormLabel.vue'

const flowstore = useFlowStore()

const dateTimeData = flowstore.selectedNode.data

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function formatTimeStringToObject(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number)
  return {
    hours,
    minutes,
    seconds: 0,
  }
}

const normalizeAllTimeRange = (times) => {
  return times.reduce((acc, time) => {
    const startTimeObject = formatTimeStringToObject(time.startTime)
    const endTimeObject = formatTimeStringToObject(time.endTime)

    acc[time.day] = [startTimeObject, endTimeObject]
    return acc
  }, {})
}

const TimeSchema = z.object({
  hours: z.number().min(0).max(23),
  minutes: z.number().min(0).max(59),
  seconds: z.number().min(0).max(59).optional(),
})

const TimeRangeSchema = toTypedSchema(
  z.object({
    allTimeRange: z.object(
      days.reduce((acc, day) => {
        acc[day] = z.array(TimeSchema).refine((val) => val.length === 2, {
          message: 'Please select both start and end times.',
        })
        return acc
      }, {}),
    ),
  }),
)

const initialAllTimeRange = normalizeAllTimeRange(dateTimeData.times)

console.log('Initial all time range:', initialAllTimeRange)

// Form setup with Vee-Validate and Zod schema
const form = useForm({
  validationSchema: TimeRangeSchema,
  initialValues: { allTimeRange: initialAllTimeRange },
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Selected time range:', values.allTimeRange)
})

const { value: allTimeRange, errors } = useField('allTimeRange')

watch(
  [allTimeRange, errors],
  ([newTimeRange, newErrors]) => {
    console.log('Time changed:', newTimeRange)
    console.log('Errors:', newErrors)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <form @submit="onSubmit" class="flex-grow flex flex-col">
    <div v-for="day in days" :key="day" class="mb-4">
      <FormLabel>{{ capitalizeFirstLetter(day) }}</FormLabel>
      <VueDatePicker
        v-model="allTimeRange[day]"
        :time-picker="true"
        :range="true"
        placeholder="Select open hours"
        :id="day"
      />
    </div>
    <Button type="submit" class="mt-auto">Update Message</Button>
  </form>
</template>
