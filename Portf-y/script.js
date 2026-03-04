function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  const mailto = `mailto:yusuf612844@gmail.com?subject=${encodeURIComponent('Portfolyö İletişim: ' + name)}&body=${encodeURIComponent(`Ad Soyad: ${name}\nE-posta: ${email}\n\n${message}`)}`;
  window.location.href = mailto;
  return false;
}

document.addEventListener('DOMContentLoaded', function onReady() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('project-modal-title');
  const descEl = document.getElementById('project-modal-desc');
  const mediaContainer = document.getElementById('project-modal-media');
  const video = document.getElementById('project-modal-video');
  const videoSource = document.getElementById('project-modal-video-source');

  function openModalFromCard(card) {
    const title = card.getAttribute('data-title') || 'Proje';
    const desc = card.getAttribute('data-desc') || '';
    const src = card.getAttribute('data-video') || '';
    const yt = card.getAttribute('data-yt') || '';
    const image = card.getAttribute('data-image') || '';
    const poster = card.getAttribute('data-poster') || '';

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    // Reset media container
    mediaContainer.innerHTML = '';

    if (yt) {
      const autoplayParams = 'autoplay=1&mute=1&rel=0&modestbranding=1';
      const iframe = document.createElement('iframe');
      iframe.className = 'modal-iframe';
      iframe.width = '560';
      iframe.height = '315';
      iframe.src = yt.includes('?') ? yt + '&' + autoplayParams : yt + '?' + autoplayParams;
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      mediaContainer.appendChild(iframe);
    } else if (image) {
      const img = document.createElement('img');
      img.className = 'modal-image';
      img.src = image;
      img.alt = title || 'Proje görseli';
      mediaContainer.appendChild(img);
    } else {
      const videoEl = video.cloneNode(true);
      if (poster) videoEl.setAttribute('poster', poster); else videoEl.removeAttribute('poster');
      if (src) {
        const sourceEl = videoEl.querySelector('source');
        sourceEl.setAttribute('src', src);
        videoEl.load();
        // Try autoplay muted
        videoEl.muted = true;
        videoEl.autoplay = true;
        videoEl.play().catch(function(){});
      }
      mediaContainer.appendChild(videoEl);
    }

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (!video.paused) video.pause();
  }

  document.querySelectorAll('.inspect-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      const card = this.closest('.card');
      if (card) openModalFromCard(card);
    });
  });

  // Remove auto-open behavior: videos only play after clicking "İncele"

  modal?.addEventListener('click', function(e){
    const target = e.target;
    if (target && target.hasAttribute('data-close-modal')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
});


