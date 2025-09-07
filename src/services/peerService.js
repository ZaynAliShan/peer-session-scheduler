import { API_ENDPOINTS } from '../constants/api.js'

/**
 * Fetch peers data from API
 * @returns {Promise<Array>} Array of peer objects
 */
export async function fetchPeers() {
  try {
    const response = await fetch(API_ENDPOINTS.PEERS)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    throw new Error(`Failed to fetch peers: ${error.message}`)
  }
}
