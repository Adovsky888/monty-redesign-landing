/* Monty legal docs: table of contents, active section, reading progress. */
(function () {
  var article = document.querySelector('.prose');
  var bar = document.querySelector('.bar');
  var prog = document.querySelector('.prog');
  var toc = document.querySelector('.toc');

  function slug(text, i) {
    var s = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
    return s ? s.slice(0, 40) : 's' + i;
  }

  var links = [];
  if (article && toc) {
    var nav = toc.querySelector('nav');
    var heads = article.querySelectorAll('h2');
    heads.forEach(function (h, i) {
      if (!h.id) h.id = slug(h.textContent, i);
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      nav.appendChild(a);
      links.push({ a: a, h: h });
    });
    if (!heads.length) toc.remove();
    // The list is a sidebar on wide screens and a collapsed accordion on narrow ones.
    var wide = window.matchMedia('(min-width:1080px)');
    var sync = function () { toc.open = wide.matches; };
    sync();
    wide.addEventListener('change', sync);
  }

  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY;
    if (bar) bar.classList.toggle('stuck', y > 8);
    if (prog && article) {
      var box = article.getBoundingClientRect();
      var total = box.height - window.innerHeight;
      var done = total > 0 ? (-box.top) / total : (box.top < 0 ? 1 : 0);
      prog.style.width = Math.max(0, Math.min(1, done)) * 100 + '%';
    }
    if (links.length) {
      var line = 120, active = links[0];
      for (var i = 0; i < links.length; i++) {
        if (links[i].h.getBoundingClientRect().top <= line) active = links[i]; else break;
      }
      links.forEach(function (l) { l.a.classList.toggle('on', l === active); });
      if (window.matchMedia('(min-width:1080px)').matches) {
        var nv = toc.querySelector('nav');
        var top = active.a.offsetTop - nv.clientHeight / 2 + active.a.clientHeight / 2;
        if (nv.scrollHeight > nv.clientHeight) nv.scrollTop = top;
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();
})();
