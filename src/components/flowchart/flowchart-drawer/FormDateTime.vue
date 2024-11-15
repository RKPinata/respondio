<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useFlowStore } from '@/stores'
import { capitalizeFirstLetter, formatSchedule } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { timezones } from '@/constants'

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
    selectedTimezone: z.string().min(1),
  }),
)

const initialAllTimeRange = normalizeAllTimeRange(dateTimeData.times)
const initialSelectedTimezone = dateTimeData.timezone

const form = useForm({
  validationSchema: TimeRangeSchema,
  initialValues: { allTimeRange: initialAllTimeRange, selectedTimezone: initialSelectedTimezone },
})

const onSubmit = form.handleSubmit((values) => {
  // format it for storing to flowstore node
  flowstore.updateNodeData(flowstore.selectedNode, {
    times: formatSchedule(values.allTimeRange),
    timezone: values.selectedTimezone,
  })
})

const { value: allTimeRange, errors: timeErrors } = useField('allTimeRange', { deep: true })
const { value: selectedTimezone } = useField('selectedTimezone')

const hasError = computed(() => timeErrors.value.length > 0)
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex-grow flex flex-col">
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

    <Select v-model="selectedTimezone">
      <SelectTrigger class="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <template v-for="(group, groupIndex) in timezones" :key="groupIndex">
          <SelectGroup>
            <SelectLabel>{{ group.label }}</SelectLabel>
            <SelectItem
              v-for="(option, optionIndex) in group.options"
              :key="optionIndex"
              :value="option.value"
            >
              {{ option.display }}
            </SelectItem>
          </SelectGroup>
        </template>
      </SelectContent>
    </Select>
    <Typography variant="body2" class="text-destructive" v-if="hasError">
      You have to select both start and end times for each day.
    </Typography>

    <Button type="submit" class="mt-auto">Update Business Hours</Button>
  </form>
</template>
