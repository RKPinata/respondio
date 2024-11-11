<script setup></script>
<template>
  <div
    :class="{
      'overflow-hidden transition-all duration-300 ease-in-out': true,
      'w-0': !isOpen,
      'w-[500px]': isOpen,
    }"
  >
    <p>Drawer</p>
  </div>
</template>
