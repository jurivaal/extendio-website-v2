(function(){
 const visuals={
  hero:'assets/brand/hero-products-v3.svg',
  mood:'assets/brand/routine-products-v3.svg',
  colors:'assets/brand/color-products-v3.svg',
  signature:'assets/brand/brand-signature-v3.svg'
 };

 function injectStyles(){
  if(document.getElementById('extendio-product-visuals')) return;
  const style=document.createElement('style');
  style.id='extendio-product-visuals';
  style.textContent=`
   .brand-product-board{position:relative;overflow:hidden;border-radius:8px;background:#fff;box-shadow:0 24px 54px rgba(31,45,39,.13)}
   .brand-product-board:before,.brand-product-board:after{display:none}
   .brand-product-board img{display:block;width:100%;height:100%;min-height:100%;object-fit:cover}
   .brand-signature__poster{grid-column:1/-1;margin:0;overflow:hidden;border-radius:8px;background:#fff}
   .brand-signature__poster img{display:block;width:100%;height:100%;object-fit:cover}
   @media(min-width:980px){.brand-signature__poster{min-height:520px}}
  `;
  document.head.append(style);
 }

 function setBoard(el,src){
  if(!el||el.dataset.productVisualsReady===src) return;
  el.dataset.productVisualsReady=src;
  el.classList.remove('brand-collage','brand-collage--hero','brand-collage--mood','brand-collage--colors','has-fallback-image');
  el.classList.add('brand-product-board','has-image');
  el.style.removeProperty('--brand-image');
  el.innerHTML=`<img src="${src}" alt="Extendio product presentation" loading="lazy">`;
 }

 function renderBoards(){
  setBoard(document.querySelector('.brand-visual--hero'),visuals.hero);
  setBoard(document.querySelector('.brand-visual--mood'),visuals.mood);
  setBoard(document.querySelector('.brand-visual--colors'),visuals.colors);
 }

 function updateSignature(){
  const visual=document.querySelector('.brand-signature__visual');
  if(!visual||visual.dataset.productVisualsReady===visuals.signature) return;
  visual.dataset.productVisualsReady=visuals.signature;
  visual.innerHTML=`<figure class="brand-signature__poster"><img src="${visuals.signature}" alt="Extendio product range" loading="lazy"></figure>`;
 }

 function run(){
  injectStyles();
  renderBoards();
  updateSignature();
 }

 [0,160,500,1100,2300,4200].forEach(delay=>window.setTimeout(run,delay));
 document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>[80,520,1200,2400,4300].forEach(delay=>window.setTimeout(run,delay))));
})();
