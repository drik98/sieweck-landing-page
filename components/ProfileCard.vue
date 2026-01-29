<template>
  <div class="card">
    <img :src="image" :alt="imageAlt" class="avatar" />
    <div class="name">{{ name }}</div>
    <div v-if="role" class="role">{{ role }}</div>
    <div class="links">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ link.label }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  role?: string;
  image: string;
  imageAlt: string;
  links: Array<{ label: string; href: string }>;
}>();
</script>

<style scoped>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 260px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.role {
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 1rem;
}

.links a {
  margin: 0 0.5rem;
  text-decoration: none;
  color: #0077cc;
  font-size: 0.95rem;
}
</style>
