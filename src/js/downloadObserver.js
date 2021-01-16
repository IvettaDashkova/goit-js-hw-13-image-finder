function downloadObserver() {
  const images = document.querySelectorAll('.gallery img');
  const options = {
    rootMargin: '100px',
  };
  const ioImages = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.sourceprew;
        image.src = src;
        observer.unobserve(image);
      }
    });
  }, options);

  images.forEach(image => ioImages.observe(image));
}
export default downloadObserver;
