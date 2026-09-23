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
  if (!products || !Array.isArray(products)) return [];
  let result = [...products];

  const currState = state || FilterState;

  // 1. Search Query (name, brand, category)
  if (currState.searchQuery) {
    const q = currState.searchQuery.toLowerCase().trim();
    if (q) {
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }
  }

  // 2. Category
  if (currState.category && currState.category !== 'All' && currState.category !== 'All Categories') {
    result = result.filter(p => p.category === currState.category);
  }

  // 3. Status
  if (currState.status && currState.status !== 'All' && currState.status !== 'All Statuses') {
    if (currState.status === 'LIVE') {
      result = result.filter(p => p.status === 'LIVE' || p.status === 'ENDING SOON');
    } else if (currState.status === 'ENDING SOON') {
      result = result.filter(p => p.status === 'ENDING SOON' || p.status === 'LIVE');
    } else {
      result = result.filter(p => p.status === currState.status);
    }
  }

  // 4. Sorting
  if (currState.sortBy) {
    result.sort((a, b) => {
      switch (currState.sortBy) {
        case 'Ending Soon':
          return (a.endTime || 0) - (b.endTime || 0);
        case 'Lowest Current Bid':
          return (a.currentBid || a.startingBid || 0) - (b.currentBid || b.startingBid || 0);
        case 'Highest Current Bid':
          return (b.currentBid || b.startingBid || 0) - (a.currentBid || a.startingBid || 0);
        case 'Lowest Market Price':
          return (a.marketPrice || 0) - (b.marketPrice || 0);
        case 'Highest Market Price':
          return (b.marketPrice || 0) - (a.marketPrice || 0);
        case 'Newest':
        default:
          return (b.startTime || b.id || 0) - (a.startTime || a.id || 0);
      }
    });
  }

  return result;
}

window.filterUtils = {
  FilterState,
  applyFilters
};

