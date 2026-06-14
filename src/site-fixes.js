(function(){
 const productSlugs={hairBrush:'hair-brush',miniBrush:'mini-brush',bambooCottonBuds:'bamboo-cotton-buds',hairClips:'hair-clips'};
 const productKeys=['hairBrush','miniBrush','bambooCottonBuds','hairClips'];
 const mainFiles=['Main.png','Main.jpg','Main.jpeg','Main.webp','main.png','main.jpg','main.jpeg','main.webp','MAIN.png','MAIN.jpg','MAIN.jpeg','MAIN.webp'];
 const galleryFiles=[1,2,3,4,5,6].flatMap(n=>[`${n}.png`,`${n}.jpg`,`${n}.jpeg`,`${n}.webp`]);
 const brandImages={hero:'assets/brand/brand-world.png',about:'assets/brand/about.png',materials:'assets/brand/materials.png',packaging:'assets/brand/packaging.png',brandWorld:'assets/brand/brand-world.png'};
 const cache=new Map();
 const manifestPromise=fetch('assets/products/manifest.json').then(r=>r.ok?r.json():{}).catch(()=>({}));
 const esc=value=>String(value).replace(/&/g,'&amp;').replaceAll(String.fromCharCode(34),'&quot;').replace(/</g,'&lt;');
 let scheduled=false;

 function activeLang(){
  return document.documentElement.lang||localStorage.getItem('extendioLang')||'en';
 }
 function langOrder(){
  return [activeLang(),'en','de','es','ru'].filter((lang,index,self)=>self.indexOf(lang)===index);
 }
 function productPath(slug,lang,file){
  return `assets/products/${slug}/${lang}/${file}`;
 }
 function productRootPath(slug,file){
  return `assets/products/${slug}/${file}`;
 }
 function imageUrl(src){
  return new URL(src,document.baseURI).href;
 }
 function testImage(src){
  if(cache.has(src)) return cache.get(src);
  const promise=new Promise(resolve=>{
   const img=new Image();
   img.onload=()=>resolve(src);
   img.onerror=()=>resolve(null);
   img.src=src;
  });
  cache.set(src,promise);
  return promise;
 }
 function filesForLang(manifest,slug,lang){
  const listed=(manifest[slug]&&manifest[slug][lang])||[];
  return [...mainFiles,...listed,...galleryFiles].filter((file,index,self)=>self.indexOf(file)===index);
 }
 async function firstExisting(slug,lang,file){
  for(const src of [productPath(slug,lang,file),productRootPath(slug,file)]){
   const ok=await testImage(src);
   if(ok) return ok;
  }
  return null;
 }
 async function resolveImages(slug){
  const manifest=await manifestPromise;
  const loaded=[];
  for(const lang of langOrder()){
   for(const file of filesForLang(manifest,slug,lang)){
    const ok=await firstExisting(slug,lang,file);
    if(ok&&!loaded.includes(ok)) loaded.push(ok);
    if(loaded.length>=4) return loaded;
   }
  }
  return loaded;
 }
 function renderMedia(card,images){
  const media=card.querySelector('.product-media');
  if(!media||!images.length) return;
  const title=card.querySelector('h3')?.textContent||'Extendio product';
  const signature=images.join('|');
  if(media.dataset.extendioSignature===signature) return;
  media.dataset.extendioSignature=signature;
  const thumbs=images.slice(1,4).map((src,index)=>`<img src='${esc(src)}' alt='${esc(title)} ${index+2}' loading='lazy'>`).join('');
  media.classList.add('has-image');
  media.innerHTML=`<img class='product-media__main' src='${esc(images[0])}' alt='${esc(title)}' loading='lazy'>${thumbs?`<div class='product-gallery'>${thumbs}</div>`:''}`;
  media.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.remove()));
 }
 async function fixProducts(){
  const cards=[...document.querySelectorAll('.product-card')];
  cards.forEach(card=>{
   const primary=card.querySelector('.product-actions .button--primary');
   if(primary) primary.hidden=true;
  });
  await Promise.all(cards.map(async (card,index)=>{
   const slug=productSlugs[productKeys[index]];
   if(!slug) return;
   renderMedia(card,await resolveImages(slug));
  }));
 }
 async function fixBrandVisuals(){
  await Promise.all([...document.querySelectorAll('[data-brand-key]')].map(async el=>{
   const src=brandImages[el.dataset.brandKey]||el.dataset.fallbackImage;
   if(!src) return;
   const ok=await testImage(src);
   if(!ok) return;
   el.classList.add('has-image');
   el.classList.remove('has-fallback-image');
   el.style.setProperty('--brand-image',`url('${imageUrl(ok)}')`);
  }));
 }
 function runFixes(){
  scheduled=false;
  fixBrandVisuals();
  fixProducts();
 }
 function scheduleFixes(){
  if(scheduled) return;
  scheduled=true;
  [0,120,450,1000,2200,4000].forEach(delay=>window.setTimeout(runFixes,delay));
 }
 document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',scheduleFixes));
 const list=document.querySelector('#productsList');
 if(list){
  new MutationObserver(scheduleFixes).observe(list,{childList:true,subtree:true});
 }
 scheduleFixes();
})();
