<script setup lang="ts">
const router = useRouter()

const targets = ref<HTMLElement[]>([])

const heroes = [{
  important: 'Discuss',
  text: 'through an innovative way.',
},
{
  important: 'Collaborate',
  text: 'with others.',
},
{
  important: 'Discover',
  text: ' new perspectives.',
}]

const animation = gsap.timeline({ repeat: 1 })
const numberOfTargets = computed(() => targets.value.length)

const duration = 0.25
const pause = 3

const stagger = duration + pause
const repeatDelay = computed(() => (stagger * (numberOfTargets.value - 1)) + pause)

onMounted(() => {
  gsap.set('.intro', { autoAlpha: 1 })
  animation.from(targets.value, {
    y: '100%',
    duration,
    opacity: 0,
    stagger: {
      each: stagger,
      repeat: -1,
      repeatDelay: repeatDelay.value,
    },
  })
    .to(targets.value, {
      y: '-100%',
      duration,
      opacity: 0,
      stagger: {
        each: stagger,
        repeat: -1,
        repeatDelay: repeatDelay.value,
      },
    }, stagger)
})
</script>

<template>
  <div class="intro" h-full w-full>
    <h1>Optimus Music</h1>

    <h2 v-for="hero of heroes" ref="targets" :key="hero.important">
      <span class="important">{{ hero.important }}</span> {{ hero.text }}
    </h2>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="router.push('/login')"
    >
      Join 0 users
    </button>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #fff;
  opacity: 0;

  padding: 0 5rem;
}

.intro h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 70%;
}

.intro h2 {
  position: absolute;
  margin: 0;
  padding: 0;
  font-size: 1.3rem;
  text-align: center;
}

.important {
  font-weight: 700;
  font-size: 2rem;
}
</style>
