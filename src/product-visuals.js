(function(){
 const brush='assets/products/hair-brush/en/Main.jpg';
 const brushSet='assets/products/hair-brush/en/7 2.jpg';
 const clips='assets/products/hair-clips/en/02.01.jpg';
 const buds='assets/products/bamboo-cotton-buds/en/Main.jpeg';
 const collages={
  hero:[['buds',buds,'Extendio bamboo cotton buds'],['clips',clips,'Extendio hair clips'],['brush',brush,'Extendio hair brush']],
  mood:[['brush',brushSet,'Extendio hair brushes'],['buds',buds,'Extendio bamboo cotton buds'],['clips',clips,'Extendio hair clips']],
  colors:[['clips',clips,'Extendio hair clips'],['brush',brush,'Extendio hair brush']]
 };
 function injectStyles(){
  if(document.getElementById('extendio-product-visuals')) return;
  const style=document.createElement('style');
  style.id='extendio-product-visuals';
  style.textContent=`
   .brand-collage{background:linear-gradient(135deg,#fbfaf4 0%,#fff 46%,#edf3ea 100%);isolation:isolate}
   .brand-collage:before,.brand-collage:after{display:none}
   .brand-collage__surface{position:absolute;inset:0;overflow:hidden;background:linear-gradient(135deg,#fbfaf4 0%,#fff 50%,#eef4ed 100%)}
   .brand-collage__surface:before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,rgba(31,77,64,.09),transparent 34%,rgba(213,178,76,.08) 72%,transparent)}
   .brand-collage__surface:after{content:"";position:absolute;left:-12%;right:-12%;bottom:-30%;height:48%;background:linear-gradient(180deg,rgba(255,255,255,.15),rgba(224,234,222,.9));transform:rotate(-4deg)}
   .brand-collage__item{position:absolute;z-index:1;display:flex;align-items:center;justify-content:center;margin:0;overflow:hidden;border:1px solid rgba(31,77,64,.16);border-radius:8px;background:#fff;box-shadow:0 22px 48px rgba(31,45,39,.14);transform:rotate(var(--rotate,0deg))}
   .brand-collage__item img{display:block;width:100%;height:100%;object-fit:contain;padding:clamp(.55rem,1.7vw,1rem)}
   .brand-collage--hero .brand-collage__item--buds{left:6%;bottom:7%;width:34%;height:42%;--rotate:-2deg}
   .brand-collage--hero .brand-collage__item--clips{left:35%;bottom:14%;width:28%;height:31%;--rotate:5deg}
   .brand-collage--hero .brand-collage__item--brush{right:7%;bottom:6%;width:28%;height:79%;--rotate:2deg}
   .brand-collage--mood .brand-collage__item--brush{right:5%;bottom:8%;width:42%;height:52%;--rotate:-4deg}
   .brand-collage--mood .brand-collage__item--buds{left:7%;bottom:8%;width:34%;height:40%;--rotate:2deg}
   .brand-collage--mood .brand-collage__item--clips{left:22%;top:12%;width:38%;height:33%;--rotate:-5deg}
   .brand-collage--colors .brand-collage__item--clips{left:7%;top:13%;width:50%;height:55%;--rotate:-5deg}
   .brand-collage--colors .brand-collage__item--brush{right:8%;bottom:8%;width:31%;height:78%;--rotate:4deg}
  `;
  document.head.append(style);
 }
 function keyFor(el){
  if(el.classList.contains('brand-visual--hero')) return 'hero';
  if(el.classList.contains('brand-visual--mood')) return 'mood';
  if(el.classList.contains('brand-visual--colors')) return 'colors';
  return '';
 }
 function renderCollages(){
  document.querySelectorAll('.brand-visual--hero,.brand-visual--mood,.brand-visual--colors').forEach(el=>{
   const key=keyFor(el);
   if(!key||el.dataset.productVisualsReady===key) return;
   el.dataset.productVisualsReady=key;
   el.classList.add('brand-collage',`brand-collage--${key}`);
   el.classList.remove('has-image','has-fallback-image');
   el.style.removeProperty('--brand-image');
   el.innerHTML=`<div class="brand-collage__surface">${collages[key].map(([type,src,alt])=>`<figure class="brand-collage__item brand-collage__item--${type}"><img src="${src}" alt="${alt}" loading="lazy"></figure>`).join('')}</div>`;
  });
 }
 function updateSignature(){
  const map={brush,buds,clips};
  Object.entries(map).forEach(([key,src])=>{
   document.querySelectorAll(`.brand-signature__tile--${key} img`).forEach(img=>{
    if(img.getAttribute('src')!==src) img.setAttribute('src',src);
   });
  });
 }
 function run(){
  injectStyles();
  renderCollages();
  updateSignature();
 }
 [0,160,500,1100,2300,4200].forEach(delay=>window.setTimeout(run,delay));
 document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>[80,520,1200,2400,4300].forEach(delay=>window.setTimeout(run,delay))));
})();