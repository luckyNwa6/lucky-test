import { useRouter } from 'vue-router'
import { useTagsViewStore } from '@/store/modules/tagsView.js'
export default function useExitLogin() {
  const $router = useRouter()

  const tagsViewStore = useTagsViewStore()
  const exitLogin = () => {
    $router.push({ path: '/login' })
    tagsViewStore.delAllViews()
  }

  return {
    exitLogin,
  }
}
