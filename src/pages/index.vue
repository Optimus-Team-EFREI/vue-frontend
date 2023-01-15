<script setup lang="ts">
const router = useRouter()
const user = useUserStore()

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

interface Post {
  id: string
  author: string
  likes: string[]
  shares: string[]
  snippetUrl: string
}

const posts = $ref<Post[]>([
  {
    id: uuid(),
    author: 'trio',
    likes: Array.from({ length: randomInt(0, 100000) }),
    shares: Array.from({ length: randomInt(0, 100000) }),
    snippetUrl: '',
  },
  {
    id: uuid(),
    author: 'marguier',
    likes: [],
    shares: [],
    snippetUrl: '',
  },
  {
    id: uuid(),
    author: 'luckyzer',
    likes: Array.from({ length: randomInt(0, 100000) }),
    shares: Array.from({ length: randomInt(0, 100000) }),
    snippetUrl: '',
  },
  {
    id: uuid(),
    author: 'whodisguy',
    likes: Array.from({ length: randomInt(0, 100000) }),
    shares: Array.from({ length: randomInt(0, 100000) }),
    snippetUrl: '',
  },
])

const modals = $ref<Record<string, { likes: boolean; shares: boolean }>>(posts.reduce((acc, post) => ({
  ...acc,
  [post.id]: {
    likes: false,
    shares: false,
  },
}), {}))

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num).toLocaleLowerCase()
}

const handleLikesClick = (post: Post) => {
  if (post.likes.includes(user.name))
    post.likes = post.likes.filter(name => name !== user.name)
  else
    post.likes.push(user.name)
}

const handleSharesClick = (post: Post) => {
  if (post.shares.includes(user.name))
    post.shares = post.shares.filter(name => name !== user.name)
  else
    post.shares.push(user.name)
}
</script>

<template>
  <the-hero v-if="!user.isLoggedIn" />

  <div v-else p-xl>
    <div flex w-full items-center justify-between mb-xl>
      Hello {{ user.name }} !
      <button
        btn
        text-sm
        @click="router.push(`/profile/${user.name}`)"
      >
        Profile
      </button>
      <button icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>
    </div>

    <div flex flex-col gap="1.4rem">
      <div v-for="post in posts.filter((p) => p.author !== user.name)" :key="post.id" flex flex-col p="1.1rem" bg-cool-gray-900 text-white border="transparent dark:transparent" b-rd="0.8rem" gap="1rem">
        <div flex w-full h="80px" bg-white b-rd="0.5rem" />
        <div flex w-full items-center gap-sm>
          <p>
            <router-link cursor-pointer fw-700 text-amber-200 :to="`/profile/${post.author}`">
              {{ post.author }}
            </router-link> posted a snippet.
          </p>
          <span flex-grow />
          <div flex items-center gap="5px">
            <span i-ph-heart-fill text-rose-700 cursor-pointer @click="handleLikesClick(post)" />
            <p cursor-pointer @click="modals[post.id].likes = true">
              {{ formatNumber(post.likes.length) }}
            </p>
          </div>
          <div flex items-center gap="5px">
            <span i-ph-share-fill text-emerald-300 cursor-pointer @click="handleSharesClick(post)" />
            <p cursor-pointer @click="modals[post.id].shares = true">
              {{ formatNumber(post.shares.length) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
