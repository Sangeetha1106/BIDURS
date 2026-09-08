/**
 * Filtering and Sorting Logic
 */

const FilterState = {
  searchQuery: '',
  category: 'All',
  status: 'All', // 'All', 'LIVE', 'UPCOMING', 'ENDING SOON', 'ENDED'
  sortBy: 'Newest' // 'Newest', 'Ending Soon', 'Lowest Current Bid', 'Highest Current Bid', 'Lowest Market Price', 'Highest Market Price'
};

/**
 * Filter and sort products
 * @param {Array} products 
 * @param {Object} state 
 * @returns {Array} filtered and sorted products
 */
function applyFilters(products, state) {
  let result = [...products];

  // 1. Search Query (name, brand, category)
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // 2. Category
  if (state.category !== 'All') {
    result = result.filter(p => p.category === state.category);
  }

  // 3. Status
  if (state.status !== 'All') {
    if (state.status === 'LIVE') {
      result = result.filter(p => p.status === 'LIVE' || p.status === 'ENDING SOON');
    } else {
      result = result.filter(p => p.status === state.status);
    }
  }

  // 4. Sorting
  result.sort((a, b) => {
    switch (state.sortBy) {
      case 'Ending Soon':
        // Only makes sense for LIVE/ENDING SOON, but we sort globally by end time
        return a.endTime - b.endTime;
      case 'Lowest Current Bid':
        return a.currentBid - b.currentBid;
      case 'Highest Current Bid':
        return b.currentBid - a.currentBid;
      case 'Lowest Market Price':
        return a.marketPrice - b.marketPrice;
      case 'Highest Market Price':
        return b.marketPrice - a.marketPrice;
      case 'Newest':
      default:
        // Default sort (could be ID or start time)
        return b.startTime - a.startTime;
    }
  });

  return result;
}

window.filterUtils = {
  FilterState,
  applyFilters
};
