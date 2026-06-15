(function(){
 const productSlugs={hairBrush:'hair-brush',miniBrush:'mini-brush',bambooCottonBuds:'bamboo-cotton-buds',hairClips:'hair-clips'};
 const productKeys=['hairBrush','miniBrush','bambooCottonBuds','bambooCottonBuds','hairClips'];
 const mainFiles=['Main.png','Main.jpg','Main.jpeg','Main.webp','main.png','main.jpg','main.jpeg','main.webp','MAIN.png','MAIN.jpg','MAIN.jpeg','MAIN.webp'];
 const galleryFiles=[1,2,3,4,5,6].flatMap(n=>[`${n}.png`,`${n}.jpg`,`${n}.jpeg`,`${n}.webp`]);
 const brandImages={hero:'assets/brand/brand-world.png',about:'assets/brand/about.png',materials:'assets/brand/materials.png',packaging:'assets/brand/packaging.png',brandWorld:'assets/brand/brand-world.png'};
 const copyOverrides={
  en:{
   seo:{title:'Extendio | European everyday care from Spain',description:'Extendio is a European everyday-care brand from Alicante, Spain, presenting beauty, hygiene and hair-care essentials with a clean product identity.'},
   nav:{europe:'Brand'},
   hero:{eyebrow:'European everyday care',lead:'Beauty, hygiene and hair-care essentials shaped by clear materials, calm packaging and a practical daily point of view.'},
   collection:{intro:'A compact selection of beauty, hygiene and hair-care accessories presented as one coherent Extendio product world.'},
   europe:{eyebrow:'From Alicante, Spain',title:'A European everyday-care brand with a clean, practical point of view.',text:'Extendio presents considered beauty, hygiene and hair-care essentials with a calm visual identity, clear materials and a product experience designed for everyday use.'},
   form:{note:'Messages are sent directly to the Extendio team by email.'},
   footer:{summary:'European everyday-care essentials with a clean product identity, based in Spain.'}
  },
  de:{
   seo:{title:'Extendio | Europäische Alltagspflege aus Spanien',description:'Extendio ist eine europäische Marke für tägliche Pflege aus Alicante, Spanien, mit Essentials für Beauty, Hygiene und Haarpflege in einer klaren Produktidentität.'},
   nav:{europe:'Marke'},
   hero:{eyebrow:'Europäische Alltagspflege',lead:'Beauty-, Hygiene- und Haarpflege-Essentials mit klaren Materialien, ruhiger Verpackung und einem praktischen Blick auf tägliche Routinen.'},
   collection:{intro:'Eine kompakte Auswahl an Beauty-, Hygiene- und Haarpflege-Accessoires, präsentiert als klare Extendio Produktwelt.'},
   europe:{eyebrow:'Aus Alicante, Spanien',title:'Eine europäische Marke für tägliche Pflege mit klarem, praktischem Blick.',text:'Extendio präsentiert durchdachte Essentials für Beauty, Hygiene und Haarpflege mit ruhiger visueller Identität, klaren Materialien und einem Produkterlebnis für den täglichen Gebrauch.'},
   form:{note:'Nachrichten werden direkt per E-Mail an das Extendio Team gesendet.'},
   footer:{summary:'Europäische Essentials für den Alltag mit klarer Produktidentität, aus Spanien.'}
  },
  es:{
   seo:{title:'Extendio | Cuidado diario europeo desde España',description:'Extendio es una marca europea de cuidado diario desde Alicante, España, con esenciales de belleza, higiene y cuidado del cabello bajo una identidad de producto limpia.'},
   nav:{europe:'Marca'},
   hero:{eyebrow:'Cuidado diario europeo',lead:'Esenciales de belleza, higiene y cuidado del cabello con materiales claros, envase sereno y una mirada práctica para las rutinas diarias.'},
   collection:{intro:'Una selección compacta de accesorios de belleza, higiene y cuidado del cabello presentada como un universo de producto Extendio coherente.'},
   europe:{eyebrow:'Desde Alicante, España',title:'Una marca europea de cuidado diario con una mirada limpia y práctica.',text:'Extendio presenta esenciales de belleza, higiene y cuidado del cabello con una identidad visual serena, materiales claros y una experiencia de producto pensada para el uso diario.'},
   form:{note:'Los mensajes se envían directamente al equipo de Extendio por correo electrónico.'},
   footer:{summary:'Esenciales europeos de cuidado diario con una identidad de producto limpia, desde España.'}
  },
  ru:{
   seo:{title:'Extendio | Европейский уход на каждый день из Испании',description:'Extendio — европейский бренд повседневного ухода из Аликанте, Испания: товары для красоты, гигиены и ухода за волосами с чистой продуктовой идентичностью.'},
   nav:{europe:'Бренд'},
   hero:{eyebrow:'Европейский уход на каждый день',lead:'Товары для красоты, гигиены и ухода за волосами с понятными материалами, спокойной упаковкой и практичным взглядом на ежедневные рутины.'},
   collection:{intro:'Компактная подборка товаров для красоты, гигиены и ухода за волосами, представленная как единый продуктовый мир Extendio.'},
   europe:{eyebrow:'Из Аликанте, Испания',title:'Европейский бренд повседневного ухода с чистым и практичным взглядом.',text:'Extendio представляет продуманные товары для красоты, гигиены и ухода за волосами: спокойная визуальная идентичность, понятные материалы и ощущение продукта, созданное для ежедневного использования.'},
   form:{note:'Сообщение отправляется напрямую команде Extendio по электронной почте.'},
   footer:{summary:'Европейские товары для ежедневного ухода с чистой продуктовой идентичностью, из Испании.'}
  }
 };
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
 function valueAt(source,path){
  return path.split('.').reduce((value,key)=>value&&value[key],source);
 }
 function setMeta(selector,value){
  const meta=document.querySelector(selector);
  if(meta&&value) meta.setAttribute('content',value);
 }
 function injectBrandCardStyles(){
  if(document.getElementById('extendio-brand-card-style')) return;
  const style=document.createElement('style');
  style.id='extendio-brand-card-style';
  style.textContent=`
   body{background:linear-gradient(180deg,#fbfaf6 0%,#ffffff 46%,#eef3ed 100%)}
   .europe{width:100%;max-width:none;margin:0;background:linear-gradient(135deg,#ffffff 0%,#f4f7f1 58%,#ebe6d7 100%);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:0}
   .europe .eyebrow,.europe h2,.europe .section-text{width:min(100% - 2rem,var(--max));margin-left:auto;margin-right:auto}
   .europe .eyebrow{margin-top:0;margin-bottom:.9rem;padding-top:clamp(3rem,6vw,5rem)}
   .europe h2{max-width:880px;font-size:clamp(2.05rem,4vw,3.45rem);line-height:1.05}
   .europe .section-text{max-width:720px;margin-top:1.2rem;padding-bottom:clamp(3.2rem,6vw,5.2rem);font-size:1.08rem;line-height:1.76}
   @media(max-width:720px){.europe h2{font-size:clamp(1.8rem,9vw,2.15rem);line-height:1.08}.europe .section-text{font-size:1rem;line-height:1.68}.europe .eyebrow{padding-top:3rem}}
  `;
  document.head.append(style);
 }
 function applyCopyOverrides(){
  const lang=activeLang();
  const copy=copyOverrides[lang]||copyOverrides.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
   const value=valueAt(copy,el.dataset.i18n);
   if(typeof value==='string') el.textContent=value;
  });
  if(copy.seo){
   if(copy.seo.title) document.title=copy.seo.title;
   setMeta('meta[name="description"]',copy.seo.description);
   setMeta('meta[property="og:title"]',copy.seo.title);
   setMeta('meta[property="og:description"]',copy.seo.description);
  }
  document.querySelectorAll('.shopify,#shop').forEach(section=>{
   section.hidden=true;
   section.setAttribute('aria-hidden','true');
  });
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
  injectBrandCardStyles();
  applyCopyOverrides();
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
