<script>
import { computed, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarAdmin',
  props: {
    currentAdmin: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const adminName = ref('')
    watchEffect(async () => {
      try {
        const adminData = await props.currentAdmin
        adminName.value = adminData.userName
        console.log(' username:', adminName.value)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'administrateur:", error)
      }
    })

    const authStore = useAuthStore()
    const router = useRouter()
    const isLAdmin = computed(() => authStore.state.isAdmin)
    const isLoggedIn = computed(() => authStore.state.isLoggedIn)

    const logout = () => {
      authStore.state.isLoggedIn = false
      router.push('/login')

      sessionStorage.removeItem('jwtToken')
      sessionStorage.removeItem('isAdmin')
    }

    return {
      isLoggedIn,
      adminName,
      isLAdmin,
      logout
    }
  }
})
</script>
<template>
  
  <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row custom-navbar-width">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/dashboard"
        >
        
        <h2 class="text-primary">Admin Dashboard</h2></router-link>
      <a class="navbar-brand brand-logo-mini" href="../../index.html"
        ><img src="/src/assets/admin/images/logo-mini.svg" alt="logo"
      /></a>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-stretch">
    
      
      <div class="search-field d-none d-xl-block">
        <form class="d-flex align-items-center h-100" action="#">
          <div class="input-group">
            <div class="input-group-prepend bg-transparent">
              <i class="input-group-text border-0 mdi mdi-magnify"></i>
            </div>
            <input
              type="text"
              class="form-control bg-transparent border-0"
              placeholder="Search "
            />
          </div>
        </form>
      </div>
      <ul class="navbar-nav navbar-nav-right">
       
       
     
        <li class="nav-item nav-profile dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="profileDropdown"
            href="#"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="nav-profile-img">
              <img src="/src/assets/admin/images/faces/face28.png" alt="image" />
            </div>
            <div class="nav-profile-text">
              <p class="mb-1 text-black">{{adminName}}</p>
            </div>
          </a>
          <div
            class="dropdown-menu navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm"
            aria-labelledby="profileDropdown"
            data-x-placement="bottom-end"
          >
            <div class="p-3 text-center bg-primary">
              <img
                class="img-avatar img-avatar48 img-avatar-thumb"
                src="/src/assets/admin/images/faces/face28.png"
                alt=""
              />
            </div>
            <div class="p-2">
              <h5 class="dropdown-header text-uppercase pl-2 text-dark">User Options</h5>
              <router-link
                class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                to="/jobs-admin"
              >
                <span>Job listing</span>
                <span class="p-0">
                  <i class="mdi mdi-animation menu-icon"></i>
                </span>
              </router-link>
              <router-link
                class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                to="/createJob"
              >
                <span>Create new offer</span>
                <span class="p-0">
                  <i class="mdi mdi-border-color"></i>
                </span>
              </router-link>
              <router-link
                class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                to="/candidate-list"
              >
                <span>Candidates</span>
                <span class="p-0">
                  <i class="mdi mdi-account-multiple"></i>
                </span>
              </router-link>
              <router-link
                class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                to="/profile-admin"
              >
                <span>Profile</span>
                <i class="mdi mdi-face"></i>
              </router-link>
              <div role="separator" class="dropdown-divider"></div>
              <h5 class="dropdown-header text-uppercase pl-2 text-dark mt-2">Actions</h5>
              
              <a
                class="dropdown-item py-1 d-flex align-items-center justify-content-between"
                @click="logout"
              >
                <span>Log Out</span>
                <i class="mdi mdi-logout ml-1"></i>
              </a>
            </div>
          </div>
        </li>
        
      </ul>
   <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
    </div>
  </nav>
</template>
<style scoped>
@import '@/assets/admin/css/style.css';
@import '@/assets/admin/vendors/mdi/css/materialdesignicons.min.css';
@import '@/assets/admin/vendors/flag-icon-css/css/flag-icon.min.css';
@import '@/assets/admin/vendors/css/vendor.bundle.base.css';

@import '@/assets/admin/vendors/font-awesome/css/font-awesome.min.css';
@import '@/assets/admin/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css';
.custom-navbar-width {
  max-width: 1200px; /* Définissez la largeur maximale souhaitée */
  margin: 0 auto; /* Centrez la navbar horizontalement */
}
</style>
