(function () {
  'use strict';

  var EMAIL = 'basapathitarunkumar9686@gmail.com';

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var progress = document.getElementById('progress');
  var totop = document.querySelector('.totop');
  var photo = document.getElementById('photo');
  var photoImg = document.getElementById('photoImg');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- no photo yet: fall back to the placeholder illustration ---- */
  if (photoImg) {
    var usePlaceholder = function () {
      if (photoImg.dataset.fallback) return;
      photoImg.dataset.fallback = '1';
      photoImg.src = 'assets/profile.svg';
    };
    photoImg.addEventListener('error', usePlaceholder);
    if (photoImg.complete && photoImg.naturalWidth === 0) usePlaceholder();
  }

  /* ---- mobile drawer ---- */
  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('open');
    nav.classList.toggle('nav--open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  drawer.addEventListener('click', function (e) {
    if (e.target.tagName !== 'A') return;
    drawer.classList.remove('open');
    nav.classList.remove('nav--open');
    burger.setAttribute('aria-expanded', 'false');
  });

  /* ---- seamless marquee: duplicate the track so -50% loops cleanly ---- */
  var track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;

  /* ---- scroll: sticky nav, progress bar, back-to-top ---- */
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('nav--stuck', y > 40);
    totop.classList.toggle('show', y > window.innerHeight);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- reveal on enter ---- */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px' });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    revealIO.observe(el);
  });

  /* ---- count-up numbers ---- */
  function countTo(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || '';
    var started = null;
    var dur = 1300;

    function step(now) {
      if (started === null) started = now;
      var p = Math.min((now - started) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      countTo(entry.target);
      countIO.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    countIO.observe(el);
  });

  /* ---- hero: typed role line ---- */
  var typed = document.getElementById('typed');
  var ROLES = [
    'building real-time voice agents',
    'orchestrating multi-agent workflows',
    'tuning RAG that returns the right doc',
    'writing guardrails agents cannot talk past',
    'shipping MCP tooling my team actually uses'
  ];

  if (typed) {
    if (reduced) {
      typed.textContent = ROLES[0];
    } else {
      var ri = 0, ci = 0, deleting = false;

      (function type() {
        var word = ROLES[ri];
        ci += deleting ? -1 : 1;
        typed.textContent = word.slice(0, ci);

        var wait = deleting ? 28 : 55;
        if (!deleting && ci === word.length) {
          deleting = true;
          wait = 1800;
        } else if (deleting && ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length;
          wait = 350;
        }
        setTimeout(type, wait);
      })();
    }
  }

  /* ---- hero: drifting node network behind the name ---- */
  var canvas = document.getElementById('net');
  if (canvas && !reduced) {
    var ctx = canvas.getContext('2d');
    var nodes = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;

    function sizeCanvas() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.min(Math.round((w * h) / 24000), 70);
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var d = Math.hypot(dx, dy);
          if (d > 130) continue;
          ctx.strokeStyle = 'rgba(13,13,13,' + (0.16 * (1 - d / 130)).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(13,13,13,.28)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    sizeCanvas();
    requestAnimationFrame(frame);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sizeCanvas, 200);
    });
  }

  /* ---- hero parallax: name drifts up, photo tilts back to level ---- */
  var heroName = document.getElementById('heroName');
  if (!reduced && heroName) {
    window.addEventListener('scroll', function () {
      var p = Math.min(window.scrollY / window.innerHeight, 1);
      heroName.style.transform = 'translateY(' + (-p * 60) + 'px)';
      heroName.style.opacity = String(1 - p * 0.6);
      photo.style.transform = 'rotate(' + (-4 + p * 4) + 'deg) translateY(' + (-p * 20) + 'px)';
    }, { passive: true });
  }

  /* ---- contact form: Web3Forms, posted with fetch so the page never navigates away ---- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var submitBtn = document.getElementById('formSubmit');
  var keyField = document.getElementById('accessKey');
  var KEY_UNSET = !keyField || !keyField.value || keyField.value.indexOf('YOUR_') === 0;

  function setNote(text, state) {
    note.textContent = text;
    note.className = 'form__note' + (state ? ' form__note--' + state : '');
  }

  function mailtoFallback(data) {
    var subject = encodeURIComponent(data.get('subject') || 'Portfolio enquiry');
    var body = encodeURIComponent(
      'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\n\n' + data.get('message')
    );
    window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
    setNote('Opening your mail app — add a Web3Forms access key in index.html to receive messages here instead.', 'warn');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = new FormData(form);

    // honeypot tripped: pretend it worked, send nothing
    if (data.get('botcheck')) {
      setNote('Thanks — your message is on its way.', 'ok');
      form.reset();
      return;
    }

    if (KEY_UNSET) {
      mailtoFallback(data);
      return;
    }

    var payload = {};
    data.forEach(function (value, key) { payload[key] = value; });
    payload.subject = payload.subject || ('Portfolio enquiry from ' + payload.name);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    setNote('', null);

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (body) { return { ok: res.ok, body: body }; });
      })
      .then(function (result) {
        if (result.ok && result.body.success) {
          form.reset();
          setNote('Thanks — message sent. I usually reply within a day.', 'ok');
        } else {
          setNote(
            (result.body && result.body.message ? result.body.message + ' ' : '') +
            'Could not send — email me directly at ' + EMAIL + '.',
            'err'
          );
        }
      })
      .catch(function () {
        setNote('Network error — email me directly at ' + EMAIL + '.', 'err');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Me Message';
      });
  });

  /* ---- footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
