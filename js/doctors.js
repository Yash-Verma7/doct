/* Doctors Page — Search & Filter */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('doctor-search');
  const deptFilter = document.getElementById('dept-filter');
  const grid = document.getElementById('doctors-grid');
  const noResults = document.getElementById('no-results');

  if (!searchInput || !grid) return;

  function filterDoctors() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const deptValue = deptFilter.value;
    const cards = grid.querySelectorAll('.doctor-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const dept = card.dataset.dept;
      const matchesSearch = name.includes(searchTerm);
      const matchesDept = deptValue === 'all' || dept === deptValue;

      if (matchesSearch && matchesDept) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.classList.toggle('visible', visibleCount === 0);
    }
  }

  searchInput.addEventListener('input', filterDoctors);
  deptFilter.addEventListener('change', filterDoctors);
});
