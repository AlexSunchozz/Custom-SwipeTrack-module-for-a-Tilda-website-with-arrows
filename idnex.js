document.addEventListener("DOMContentLoaded", function () {
  const blockIds = ['#rec873287023', '#rec890366707']; // ID блоков со стрелками

  blockIds.forEach(blockId => {
    const blockElement = document.querySelector(blockId);
    if (!blockElement || !blockElement.nextElementSibling) return;

    const artboard = blockElement.nextElementSibling.querySelector('.t396__artboard');
    if (!artboard) return;

    artboard.classList.add('dragscroll');

    // === Нативный drag-to-scroll ===
    let isDown = false;
    let startX;
    let scrollLeft;

    artboard.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - artboard.offsetLeft;
      scrollLeft = artboard.scrollLeft;
    });

    artboard.addEventListener('mouseleave', () => isDown = false);
    artboard.addEventListener('mouseup', () => isDown = false);
    artboard.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - artboard.offsetLeft;
      const walk = (x - startX) * 1.5;
      artboard.scrollLeft = scrollLeft - walk;
    });

    const stepElement = blockElement.nextElementSibling.querySelector('.step .tn-atom');
    const step = stepElement ? stepElement.getBoundingClientRect().width + 'px' : '300px';

    // === Стрелки ===
    const leftArrow = blockElement.querySelector('.arrow-left');
    const rightArrow = blockElement.querySelector('.arrow-right');

    if (leftArrow) {
      leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        artboard.scrollBy({ left: -parseFloat(step), behavior: 'smooth' });
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        artboard.scrollBy({ left: parseFloat(step), behavior: 'smooth' });
      });
    }
  });
});
