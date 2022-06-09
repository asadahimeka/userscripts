import './style.css';

addEventListener('load', () => {
  document.arrive('div[data-cy="mailPreviewArea"]', function () {
    document.querySelector('#switchTab').parentElement.style.width = '255px';
    document.querySelector('#tagYadsListTop').parentElement.style.display = 'none';
    this.arrive('iframe', function () {
      setTimeout(() => {
        const d = this.contentWindow.document;
        const avatar = d.querySelector('img[src^="https://pbs.twimg.com/profile_images"');
        if (!avatar) return;
        const tds = d.querySelectorAll('td[background^="https://pbs.twimg.com/media"]');
        for (const item of tds) {
          item.querySelector('img')?.setAttribute('src', item.getAttribute('background').replace(':mosaic', ''));
        }
      }, 200);
    });
    document.unbindArrive('div[data-cy="mailPreviewArea"]');
  });
});
