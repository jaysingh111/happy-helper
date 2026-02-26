(function () {
  'use strict';

  var Z = 2147483647;
  var LOGO_URL = '/logo-BAwvdGpg.png';

  function byId(id) { return document.getElementById(id); }

  function createButton() {
    var btn = document.createElement('button');
    btn.id = 'happy-helper-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open assistant');
    btn.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:' + Z +
      ';width:3.5rem;height:3.5rem;border-radius:50%;overflow:hidden;border:2px solid hsl(214.3,31.8%,91.4%);' +
      'background:hsl(0,0%,100%);box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);' +
      'cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .15s ease;';
    btn.onmouseover = function () { btn.style.transform = 'scale(1.05)'; };
    btn.onmouseout = function () { btn.style.transform = 'scale(1)'; };
    btn.onfocus = function () { btn.style.outline = 'none'; btn.style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px hsl(222.2,84%,4.9%)'; };
    btn.onblur = function () { btn.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)'; };

    var img = document.createElement('img');
    img.src = LOGO_URL;
    img.alt = 'Assistant';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    btn.appendChild(img);
    return btn;
  }

  function createModal(openModal) {
    var overlay = document.createElement('div');
    overlay.id = 'happy-helper-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:' + Z + ';background:rgba(0,0,0,.8);' +
      'display:none;align-items:center;justify-content:center;padding:1rem;';
    overlay.onclick = function (e) { if (e.target === overlay) openModal(false); };

    var modal = document.createElement('div');
    modal.id = 'happy-helper-modal';
    modal.style.cssText = 'background:hsl(0,0%,100%);color:hsl(222.2,84%,4.9%);border:1px solid hsl(214.3,31.8%,91.4%);' +
      'border-radius:.5rem;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);max-width:28rem;width:100%;padding:1.5rem;position:relative;';
    modal.onclick = function (e) { e.stopPropagation(); };

    var title = document.createElement('h2');
    title.textContent = 'Assistant';
    title.style.cssText = 'margin:0 0 1rem;font-size:1.125rem;font-weight:600;line-height:1.2;';

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'hh-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = 'position:absolute;top:1rem;right:1rem;width:2rem;height:2rem;border:none;background:transparent;' +
      'border-radius:.5rem;cursor:pointer;opacity:.7;font-size:1.25rem;line-height:1;padding:0;';
    closeBtn.onclick = function () { openModal(false); };

    var buttons = document.createElement('div');
    buttons.className = 'hh-buttons';
    buttons.style.cssText = 'display:flex;flex-direction:column;gap:.75rem;min-height:180px;justify-content:center;';

    var btnStyle = 'width:100%;padding:.5rem 1rem;text-align:left;font-size:1rem;color:hsl(222.2,84%,4.9%);' +
      'background:hsl(0,0%,100%);border:1px solid hsl(214.3,31.8%,91.4%);border-radius:.5rem;cursor:pointer;';
    var labels = ['Virtual try-on', 'Size recommendation', 'Outfit builder'];
    labels.forEach(function (label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hh-btn';
      b.style.cssText = btnStyle;
      b.textContent = label;
      b.onclick = function () { openModal(false); };
      buttons.appendChild(b);
    });

    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    return overlay;
  }

  function run() {
    var open = false;
    function openModal(value) {
      open = value !== undefined ? value : !open;
      overlay.style.display = open ? 'flex' : 'none';
    }

    var overlay = createModal(openModal);
    var btn = createButton();
    btn.onclick = function () { openModal(true); };

    document.body.appendChild(overlay);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
