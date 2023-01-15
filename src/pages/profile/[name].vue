<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const posts = $ref([
  {
    id: uuid(),
    author: 'marguier',
    likes: 10000,
    shares: 1000,
    snippetUrl: '',
  },
  {
    id: uuid(),
    author: 'luckyzer',
    likes: 10000,
    shares: 1000,
    snippetUrl: '',
  },
  {
    id: uuid(),
    author: 'whodisguy',
    likes: 10000,
    shares: 1000,
    snippetUrl: '',
  },
])
</script>

<template>
  <div>
    <p>
      Hi, {{ props.name }}
    </p>

    <div v-for="post in posts" :key="post.id" p="1.2rem">
      <div flex items-center>
        <p>
          <router-link cursor-pointer fw-700 :to="`/profile/${post.author}`">
            {{ post.author }}
          </router-link> posted a snippet.
        </p>
        <span flex-grow />
        <div flex items-center>
          <p>
            {{ post.likes }}
          </p>
          <div class="i-ph-heart-fill text-red-500" />
        </div>
        <p>
          {{ post.shares }}
        </p>
      </div>
    </div>

    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
