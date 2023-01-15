import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const savedName = ref('')
  const isLoggedIn = ref(false)

  function setNewName(name: string) {
    savedName.value = name
  }

  return {
    setNewName,
    savedName,
    isLoggedIn,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
