// Date utility functions
export const DAYS_OF_WEEK = {
  0: 'SUN', 1: 'MON', 2: 'TUE', 3: 'WED', 4: 'THU', 5: 'FRI', 6: 'SAT'
}

/**
 * Get available days for a peer based on their availability slots
 * A peer has availability on a certain day if it has at least 1h of time available on that day
 * @param {Array} availability - Array of availability slots with start and end times
 * @returns {Array} Array of days where peer has at least 1 hour availability
 */
export function getPeerAvailableDays(availability) {
  const dayAvailability = {
    'SUN': 0, 'MON': 0, 'TUE': 0, 'WED': 0, 'THU': 0, 'FRI': 0, 'SAT': 0
  }
  
  availability.forEach(slot => {
    const startDate = new Date(slot.start)
    const endDate = new Date(slot.end)
    
    const currentDate = new Date(startDate)
    const endOfSlot = new Date(endDate)
    
    while (currentDate < endOfSlot) {
      const dayOfWeek = DAYS_OF_WEEK[currentDate.getDay()]
      const nextDay = new Date(currentDate)
      nextDay.setDate(nextDay.getDate() + 1)
      nextDay.setHours(0, 0, 0, 0)
      
      const dayStart = new Date(Math.max(currentDate.getTime(), startDate.getTime()))
      const dayEnd = new Date(Math.min(nextDay.getTime(), endDate.getTime()))
      const hoursOnThisDay = (dayEnd - dayStart) / (1000 * 60 * 60)
      
      if (hoursOnThisDay > 0) {
        dayAvailability[dayOfWeek] += hoursOnThisDay
      }
      
      currentDate.setDate(currentDate.getDate() + 1)
      currentDate.setHours(0, 0, 0, 0)
    }
  })
  
  return Object.keys(dayAvailability).filter(day => dayAvailability[day] >= 1)
}

/**
 * Get formatted available days text for display
 * @param {Array} availability - Array of availability slots
 * @returns {String} Formatted string like "Mon, Tue, Wed"
 */
export function getAvailableDaysText(availability) {
  const availableDays = getPeerAvailableDays(availability)
  const dayMap = {
    'SUN': 'Sun', 'MON': 'Mon', 'TUE': 'Tue', 'WED': 'Wed', 
    'THU': 'Thu', 'FRI': 'Fri', 'SAT': 'Sat'
  }
  
  return availableDays.map(day => dayMap[day]).join(', ')
}
