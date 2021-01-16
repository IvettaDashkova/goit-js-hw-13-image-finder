

function contentObserver(addContent) {
  const targetObserver = document.querySelector(
    '.gallery .photo-card:last-child',
  );
  const ioContent = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addContent();
        observer.unobserve(targetObserver);
      }
    });
  });
  ioContent.observe(targetObserver);
}
export default contentObserver;
