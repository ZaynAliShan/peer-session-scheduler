<template>
  <div class="peer-card">
    <!-- Profile Header -->
    <div class="profile-header d-flex align-items-center mb-3">
      <div class="profile-image me-3">
        <img 
          v-if="peer.image" 
          :src="peer.image" 
          :alt="peer.name"
          class="profile-img"
        >
        <div v-else class="profile-initials">
          {{ getInitials(peer.name) }}
        </div>
      </div>
      <div class="profile-info">
        <h5 class="peer-name mb-1">{{ peer.name }}</h5>
        <p class="login-status mb-0">{{ peer.last_login }}</p>
      </div>
    </div>
    
    <!-- About Me Section -->
    <div class="about-section mb-3">
      <h6 class="about-title mb-2">ABOUT ME</h6>
      <p class="about-text">{{ peer.about_me }}</p>
    </div>
    
    <!-- Details Section -->
    <div class="details-section">
      <!-- Availability -->
      <div class="detail-item d-flex align-items-center mb-2">
        <div class="detail-icon me-2">
          <img src="/Icons/Availability.svg" alt="Availability" class="icon-svg">
        </div>
        <span class="detail-text">Available on {{ getAvailableDaysText() }}</span>
      </div>
      
      <!-- Targeting -->
      <div class="detail-item d-flex align-items-center mb-2">
        <div class="detail-icon me-2">
          <img src="/Icons/Targeting.svg" alt="Targeting" class="icon-svg">
        </div>
        <span class="detail-text">Targeting {{ getCompaniesText() }}</span>
      </div>
      
      <!-- Sessions Booked -->
      <div class="detail-item d-flex align-items-center mb-2">
        <div class="detail-icon me-2">
          <img src="/Icons/Sessions.svg" alt="Sessions" class="icon-svg">
        </div>
        <span class="detail-text">{{ peer.sessions }} sessions booked</span>
      </div>
      
      <!-- Years of Experience -->
      <div class="detail-item d-flex align-items-center mb-2">
        <div class="detail-icon me-2">
          <img src="/Icons/Experience.svg" alt="Experience" class="icon-svg">
        </div>
        <span class="detail-text">{{ peer.years_of_experience }} years of experience</span>
      </div>
      
      <!-- Location -->
      <div class="detail-item d-flex align-items-center">
        <div class="detail-icon me-2">
          <img src="/Icons/Location.svg" alt="Location" class="icon-svg">
        </div>
        <span class="detail-text">{{ peer.location }}</span>
      </div>
    </div>
    
    <!-- Book Me Button -->
    <div class="book-section">
      <hr class="book-divider">
      <div class="book-btn">BOOK ME</div>
    </div>
  </div>
</template>

<script>
import { getAvailableDaysText } from '../utils/dateUtils.js'

export default {
  name: 'PeerCard',
  props: {
    peer: {
      type: Object,
      required: true
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('')
    },
    getAvailableDaysText() {
      return getAvailableDaysText(this.peer.availability)
    },
    getCompaniesText() {
      return this.peer.companies.join(', ')
    }
  }
}
</script>

<style scoped>
.peer-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
}

.profile-header {
  margin-bottom: 16px;
}

.profile-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-initials {
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #A9A9A9;
}

.peer-name {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
}

.login-status {
  font-size: 12px;
  color: #666666;
  margin-bottom: 0;
}

.about-section {
  margin-bottom: 16px;
}

.about-title {
  font-size: 12px;
  font-weight: 700;
  color: #A9A9A9;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.about-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
  margin-bottom: 0;
}

.details-section {
  flex-grow: 1;
}

.detail-item {
  margin-bottom: 8px;
}

.detail-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 16px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(66%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0.66) contrast(0.66);
  opacity: 0.66;
}

.detail-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
}



.book-divider {
  border: none;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0 10px 0;
}

.book-btn {
  color: #4A8FE4;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.book-btn:hover {
  color: #3a7bc4;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .peer-card {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .profile-image {
    width: 40px;
    height: 40px;
  }
  
  .profile-initials {
    font-size: 14px;
  }
  
  .peer-name {
    font-size: 15px;
  }
  
  .about-text,
  .detail-text {
    font-size: 13px;
  }
  
  .book-btn {
    padding: 6px 0;
    font-size: 13px;
  }
}
</style>
