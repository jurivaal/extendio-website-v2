(function(){
 const visuals={
  hero:'assets/brand/hero-products-v3.svg',
  mood:'assets/brand/routine-products-v3.svg'
 };
 const products={
  brush:'assets/products/hair-brush/en/Main.jpg',
  buds:'assets/products/bamboo-cotton-buds/en/Main.jpeg',
  clips:'assets/products/hair-clips/en/02.01.jpg'
 };

 function injectStyles(){
  if(document.getElementById('extendio-product-visuals')) return;
  const style=document.createElement('style');
  style.id='extendio-product-visuals';
  style.textContent=`
   .brand-product-board{position:relative;overflow:hidden;border-radius:8px;background:#fff;box-shadow:0 24px 54px rgba(31,45,39,.13)}
   .brand-product-board:before,.brand-product-board:after{display:none}
   .brand-product-board img{display:block;width:100%;height:100%;min-height:100%;object-fit:cover}
   .brand-product-board--colors{background:linear-gradient(135deg,#fbf7ef 0%,#fffef9 48%,#eaf1e7 100%)}
   .product-color-board{position:absolute;inset:0;display:grid;grid-template-columns:1.04fr .82fr;gap:clamp(.8rem,2vw,1.2rem);padding:clamp(1rem,3vw,1.55rem)}
   .product-color-board:before{content:"";position:absolute;left:-18%;right:-18%;bottom:-34%;height:54%;background:linear-gradient(180deg,rgba(255,255,255,.2),rgba(230,236,226,.9));transform:rotate(-5deg)}
   .product-color-board__tile{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;margin:0;overflow:hidden;border:1px solid rgba(31,77,64,.12);border-radius:8px;background:#fff;box-shadow:0 18px 42px rgba(31,45,39,.12)}
   .product-color-board__tile img{width:100%;height:100%;object-fit:contain;padding:clamp(.45rem,1.6vw,.95rem)}
   .product-color-board__tile--clips{min-height:72%;align-self:center;transform:rotate(-2.5deg)}
   .product-color-board__tile--brush{height:100%;transform:rotate(2deg)}
   .product-color-board__swatches{position:absolute;z-index:2;left:clamp(1rem,3vw,1.6rem);bottom:clamp(1rem,3vw,1.6rem);display:flex;gap:.55rem}
   .product-color-board__swatches span{width:22px;height:22px;border-radius:999px;border:2px solid rgba(255,255,255,.88);box-shadow:0 8px 18px rgba(31,45,39,.16)}
   .brand-signature__visual--direct{display:block}
   .brand-signature-direct{display:grid;grid-template-columns:1.02fr .98fr;grid-template-rows:1fr 1fr;gap:.72rem;width:100%;min-height:520px}
   .brand-signature-direct__tile{display:flex;align-items:center;justify-content:center;margin:0;overflow:hidden;border:1px solid rgba(31,77,64,.12);border-radius:8px;background:#fff}
   .brand-signature-direct__tile img{display:block;width:100%;height:100%;object-fit:contain;padding:clamp(.55rem,1.7vw,1rem)}
   .brand-signature-direct__tile--brush{grid-row:1/3;background:linear-gradient(180deg,#ffffff 0%,#f3f4ef 100%)}
   .brand-signature-direct__tile--buds{background:#fffaf2}
   .brand-signature-direct__tile--buds img,.brand-signature-direct__tile--clips img{object-fit:cover;padding:.25rem}
   .brand-signature-direct__tile--clips{background:#fbfbf7}
   @media(max-width:720px){.product-color-board{grid-template-columns:1fr}.product-color-board__tile--brush{display:none}.product-color-board__tile--clips{min-height:100%;transform:none}.brand-signature-direct{grid-template-columns:1fr;grid-template-rows:auto;min-height:0}.brand-signature-direct__tile,.brand-signature-direct__tile--brush{grid-row:auto;min-height:230px}.brand-signature-direct__tile--brush{min-height:330px}}
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
 function colorBoardMarkup(){
  return `<div class="product-color-board">
   <figure class="product-color-board__tile product-color-board__tile--clips"><img src="${products.clips}" alt="Extendio hair clips" loading="lazy"></figure>
   <figure class="product-color-board__tile product-color-board__tile--brush"><img src="${products.brush}" alt="Extendio hair brush" loading="lazy"></figure>
   <div class="product-color-board__swatches" aria-hidden="true"><span style="background:#d9c6ea"></span><span style="background:#f09a83"></span><span style="background:#f2e7d6"></span><span style="background:#1b1719"></span></div>
  </div>`;
 }
 function setColorBoard(){
  const el=document.querySelector('.brand-visual--colors');
  if(!el||el.dataset.productVisualsReady==='direct-colors') return;
  el.dataset.productVisualsReady='direct-colors';
  el.classList.remove('brand-collage','brand-collage--colors','has-fallback-image');
  el.classList.add('brand-product-board','brand-product-board--colors','has-image');
  el.style.removeProperty('--brand-image');
  el.innerHTML=colorBoardMarkup();
 }

 function renderBoards(){
  setBoard(document.querySelector('.brand-visual--hero'),visuals.hero);
  setBoard(document.querySelector('.brand-visual--mood'),visuals.mood);
  setColorBoard();
 }

 function updateSignature(){
  const visual=document.querySelector('.brand-signature__visual');
  if(!visual||visual.dataset.productVisualsReady==='direct-signature') return;
  visual.dataset.productVisualsReady='direct-signature';
  visual.classList.add('brand-signature__visual--direct');
  visual.innerHTML=`<div class="brand-signature-direct">
   <figure class="brand-signature-direct__tile brand-signature-direct__tile--brush"><img src="${products.brush}" alt="Extendio hair brush" loading="lazy"></figure>
   <figure class="brand-signature-direct__tile brand-signature-direct__tile--buds"><img src="${products.buds}" alt="Extendio bamboo cotton buds" loading="lazy"></figure>
   <figure class="brand-signature-direct__tile brand-signature-direct__tile--clips"><img src="${products.clips}" alt="Extendio hair clips" loading="lazy"></figure>
  </div>`;
 }

 function run(){
  injectStyles();
  renderBoards();
  updateSignature();
 }

 [0,160,500,1100,2300,4200].forEach(delay=>window.setTimeout(run,delay));
 document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>[80,520,1200,2400,4300].forEach(delay=>window.setTimeout(run,delay))));
})();
