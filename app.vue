<template>
  <header>
    <h1>Willkommen bei Sieweck.de</h1>
  </header>

  <main>
    <div class="profiles">
      <ProfileCard
        v-for="profile in profiles"
        :key="profile.name"
        :name="profile.name"
        :role="profile.role"
        :image="profile.image"
        :image-alt="profile.imageAlt"
        :links="profile.links"
      />
    </div>
  </main>

  <footer>&copy; {{ currentYear }} Sieweck.de</footer>
</template>

<script setup lang="ts">
import hendrikImg from "~/assets/img/hendrik.jpeg";
import joergImg from "~/assets/img/joerg.jpeg";
import annaImg from "~/assets/img/anna.jpeg";

const currentYear = new Date().getFullYear();

const profiles = [
  {
    name: "Hendrik Sieweck",
    role: "Softwareentwickler",
    image: hendrikImg,
    imageAlt: "Hendrik Sieweck",
    links: [
      { label: "Website", href: "https://hendrik.sieweck.de" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/hendriksieweck" },
    ],
  },
  {
    name: "Dr. Jörg Sieweck",
    role: "Research Analyst",
    image: joergImg,
    imageAlt: "Jörg Sieweck",
    links: [
      { label: "Website", href: "https://joerg.sieweck.de" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/j%C3%B6rg-sieweck-dr-570a4b5/",
      },
    ],
  },
  {
    name: "Anna Sieweck",
    role: "Engineering Consultant",
    image: annaImg,
    imageAlt: "Anna Sieweck",
    links: [
      { label: "Website", href: "https://anna.sieweck.de" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/anna-sieweck-b03120188/",
      },
    ],
  },
];
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

header {
  text-align: center;
  margin-top: clamp(8rem, 2.5vh, 3rem);
  margin-bottom: clamp(1.5rem, 4vh, 3.5rem);
}

main {
  flex-grow: 1;
  display: flex;
  justify-self: center;
  align-items: center;
} 

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.profiles {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

footer {
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #aaa;
}

@media (max-width: 640px) {
  header {
    margin-top: clamp(2rem, 6vh, 4rem);
  }
}
</style>
