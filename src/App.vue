<template>
  <div id="app">
    <!-- Blue Header Bar -->
    <div class="header-bar"></div>
    
    <!-- Main Content -->
    <div class="container-fluid px-4 py-4">
      <!-- Greeting -->
      <h1 class="greeting mb-4">Hi Patrik, schedule your next practice session with a peer</h1>
      
      <!-- Filter Section -->
      <div class="filter-section mb-4">
        <h6 class="filter-label mb-3">FILTER PEERS AVAILABLE ON:</h6>
        <div class="filter-buttons">
          <button 
            v-for="day in days" 
            :key="day.value"
            :class="['btn', 'filter-btn', { 'active': selectedDays.includes(day.value) }]"
            @click="toggleDay(day.value)"
          >
            {{ day.label }}
          </button>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading peers...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error!</h4>
        <p>{{ error }}</p>
        <hr>
        <button class="btn btn-outline-danger" @click="loadPeers">Try Again</button>
      </div>

      <!-- Peer Cards -->
      <div v-else class="row g-4">
        <div 
          v-for="peer in filteredPeers" 
          :key="peer.name"
          class="col-12 col-md-6 col-lg-4 col-xl-3"
        >
          <PeerCard :peer="peer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PeerCard from './components/PeerCard.vue'
import { fetchPeers } from './services/peerService.js'
import { getPeerAvailableDays } from './utils/dateUtils.js'

export default {
  name: 'App',
  components: {
    PeerCard
  },
  data() {
    return {
      peers: [],
      selectedDays: ['ALL'],
      loading: true,
      error: null,
      days: [
        { value: 'ALL', label: 'ALL' },
        { value: 'MON', label: 'MON' },
        { value: 'TUE', label: 'TUE' },
        { value: 'WED', label: 'WED' },
        { value: 'THU', label: 'THU' },
        { value: 'FRI', label: 'FRI' },
        { value: 'SAT', label: 'SAT' },
        { value: 'SUN', label: 'SUN' }
      ]
    }
  },
  async mounted() {
    await this.loadPeers()
  },
  computed: {
    filteredPeers() {
      if (this.selectedDays.includes('ALL')) {
        return this.peers
      }
      
      return this.peers.filter(peer => {
        const peerAvailableDays = getPeerAvailableDays(peer.availability)
        return this.selectedDays.some(day => peerAvailableDays.includes(day))
      })
    }
  },
  methods: {
    async loadPeers() {
      try {
        this.loading = true
        this.error = null
        this.peers = await fetchPeers()
      } catch (error) {
        console.error('Error loading peers:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    toggleDay(day) {
      if (day === 'ALL') {
        this.selectedDays = ['ALL']
      } else {
        this.selectedDays = this.selectedDays.filter(d => d !== 'ALL')
        
        if (this.selectedDays.includes(day)) {
          this.selectedDays = this.selectedDays.filter(d => d !== day)
        } else {
          this.selectedDays.push(day)
        }
        
        if (this.selectedDays.length === 0) {
          this.selectedDays = ['ALL']
        }
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  min-height: 100vh;
}

.header-bar {
  background-color: #4A8FE4;
  height: 50px;
  width: 100%;
}

.greeting {
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  line-height: 1.2;
  margin-bottom: 24px;
}

.filter-section {
  margin-bottom: 32px;
}

.filter-label {
  font-size: 12px;
  font-weight: 600;
  color: #A9A9A9;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.filter-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  color: #4A8FE4;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.filter-btn:hover {
  background-color: #f8f9fa;
  border-color: #d0d0d0;
}

.filter-btn.active {
  background-color: #4A8FE4;
  color: #ffffff;
  border-color: #4A8FE4;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .greeting {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .filter-section {
    margin-bottom: 24px;
  }
  
  .filter-buttons {
    gap: 6px;
  }
  
  .filter-btn {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .row {
    margin-left: 0;
    margin-right: 0;
  }
  
  .col-12 {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
