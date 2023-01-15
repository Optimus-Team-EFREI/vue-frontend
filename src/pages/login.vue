<script setup lang="ts">
const router = useRouter()

const storedUser = useUserStore()

const user = $ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const isTryingToLogin = $ref(true)

const go = () => {
  storedUser.name = user.name
  storedUser.isLoggedIn = true

  router.push('/')
}
</script>

<template>
  <div>
    <!-- Generate a login / signin form -->
    <form @submit.prevent="go">
      <div v-if="!isTryingToLogin">
        <label for="email">Email</label>
        <the-input id="email" v-model="user.email" type="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label for="username">Username</label>
        <the-input id="username" v-model="user.name" type="text" placeholder="Enter your username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <the-input id="password" v-model="user.password" type="password" placeholder="Enter your password" required />
      </div>
      <div v-if="!isTryingToLogin">
        <label id="password-confirm">Confirm Password</label>
        <the-input id="password-confirm" v-model="user.passwordConfirm" type="password" placeholder="Confirm your password" required />
      </div>
      <div>
        <button
          type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {{ isTryingToLogin ? 'Login' : 'Sign up' }}
        </button>
      </div>
      <p v-if="isTryingToLogin">
        Don't have an account? <span cursor-pointer @click="isTryingToLogin = false">Sign up</span>
      </p>
      <p v-else>
        Already have an account? <span cursor-pointer @click="isTryingToLogin = true">Login</span>
      </p>
    </form>
  </div>
</template>
