/* Blog Page — Category Filtering */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.category-tab');
  const grid = document.getElementById('blog-grid');
  const featured = document.querySelector('.blog-featured');
  const noResults = document.getElementById('no-results');

  if (!tabs.length || !grid) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;
      let visibleCount = 0;

      // Filter blog cards
      grid.querySelectorAll('.blog-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Filter featured
      if (featured) {
        if (category === 'all' || featured.dataset.category === category) {
          featured.style.display = '';
          visibleCount++;
        } else {
          featured.style.display = 'none';
        }
      }

      // Show/hide no results
      if (noResults) {
        noResults.classList.toggle('visible', visibleCount === 0);
      }
    });
  });
});
