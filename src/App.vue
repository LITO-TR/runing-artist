<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        // { label: "Home", to: "/offers" },
        { label: "Home", to: "/challenges" },
        { label: "Challenges", to: "/business/challenges" },
      ],
    };
  },
};
</script>

<template>
  <pv-toast />
  <header>
    <pv-toolbar class="bg-primary">
      <template #start>
        <h3>RUNNING ARTIST</h3>
      </template>
      <template #end>
        <div class="flex-column">
          <router-link
            v-for="item in items"
            :to="item.to"
            custom
            v-slot="{ navigate, href }"
            :key="item.label"
          >
            <pv-button
              class="p-button-text text-white"
              :href="href"
              @click="navigate"
              >{{ item.label }}</pv-button
            >
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </header>
  <pv-sidebar v-model:visible="drawer"></pv-sidebar>
  <RouterView />
</template>
