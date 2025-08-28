document.addEventListener('DOMContentLoaded', () => {
  // Function to render a timeline
  function renderTimeline(containerId, pageId, heading) {
    const timelineContainer = document.getElementById(containerId);
    if (!timelineContainer) return;

    // Adjust JSON path depending on folder structure
    const jsonPath = window.location.pathname.includes('/subpages/') ? '../siteData.json' : 'siteData.json';

    fetch(jsonPath)
      .then(res => {
        if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
        return res.json();
      })
      .then(data => {
        const page = data.find(p => p.id === pageId);
        if (!page || !page.timeline) {
          timelineContainer.innerHTML = '<p>No timeline data found.</p>';
          return;
        }

        let html = `<h2>${heading}</h2>`;
        page.timeline.forEach(entry => {
          html += `
            <div class="timeline-item">
              <h3>${entry.year}: ${entry.title}</h3>
              <ul>
                ${entry.details.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          `;
        });

        timelineContainer.innerHTML = html;
      })
      .catch(err => {
        console.error(`Error fetching timeline for ${pageId}:`, err);
        timelineContainer.innerHTML = `<p>Error loading timeline: ${err.message}</p>`;
      });
  }

  // Detect and render each timeline
  renderTimeline('revolution-timeline', 'revolution', 'Timeline of Internet Revolution');
  renderTimeline('innovation-timeline', 'innovation', 'Robotics Leadership Timeline');

  // Optional: Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      const navActions = document.querySelector('.nav-actions');
      if (navLinks && navActions) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navActions.style.display = navActions.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  }

  // Optional: smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });
});
