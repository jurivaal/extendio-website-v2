(function(){
 const productSlugs={hairBrush:'hair-brush',miniBrush:'mini-brush',bambooCottonBuds:'bamboo-cotton-buds',hairClips:'hair-clips'};
 const productKeys=['hairBrush','miniBrush','bambooCottonBuds','hairClips'];
 const mainFiles=['Main.png','Main.jpg','Main.jpeg','Main.webp','main.png','main.jpg','main.jpeg','main.webp','MAIN.png','MAIN.jpg','MAIN.jpeg','MAIN.webp'];
 const galleryFiles=[1,2,3,4,5,6].flatMap(n=>[`${n}.png`,`${n}.jpg`,`${n}.jpeg`,`${n}.webp`]);
 const brandImages={hero:'assets/brand/brand-world.png',about:'assets/brand/about.png',materials:'assets/brand/materials.png',packaging:'assets/brand/packaging.png',brandWorld:'assets/brand/brand-world.png'};
 const signatureVisuals=[
  {className:'brand-signature__tile--brush',src:'assets/products/hair-brush/en/1.jpg',alt:'Extendio hair brush'},
  {className:'brand-signature__tile--buds',src:'assets/products/bamboo-cotton-buds/de/Main.jpeg',alt:'Extendio bamboo cotton buds'},
  {className:'brand-signature__tile--clips',src:'assets/products/hair-clips/en/02.02.jpg',alt:'Extendio hair clips'}
 ];
 const copyOverrides={
  en:{
   seo:{title:'Extendio | European everyday care from Spain',description:'Extendio is a European everyday-care brand from Alicante, Spain, presenting beauty, hygiene and hair-care essentials with a clean product identity.'},
   nav:{packaging:'Signature',europe:'Brand'},
   hero:{eyebrow:'European everyday care',lead:'Beauty, hygiene and hair-care essentials shaped by clear materials, calm packaging and a practical daily point of view.'},
   collection:{intro:'A compact selection of beauty, hygiene and hair-care accessories presented as one coherent Extendio product world.'},
   signature:{eyebrow:'Brand signature',title:'One calm product world, not a set of scattered items.',text:'Extendio feels like a coherent beauty shelf: real hair brushes, bamboo cotton buds and hair clips connected by one language of materials, packaging and everyday practicality.',items:['Recognizable real product forms','Warm natural textures','Black, ivory and soft color accents']},
   europe:{eyebrow:'From Alicante, Spain',title:'A European everyday-care brand with a clean, practical point of view.',text:'Extendio presents considered beauty, hygiene and hair-care essentials with a calm visual identity, clear materials and a product experience designed for everyday use.'},
   form:{note:'Messages are sent directly to the Extendio team by email.'},
   footer:{summary:'European everyday-care essentials with a clean product identity, based in Spain.'}
  },
  de:{
   seo:{title:'Extendio | Europäische Alltagspflege aus Spanien',description:'Extendio ist eine europäische Marke für tägliche Pflege aus Alicante, Spanien, mit Essentials für Beauty, Hygiene und Haarpflege in einer klaren Produktidentität.'},
   nav:{packaging:'Signatur',europe:'Marke'},
   hero:{eyebrow:'Europäische Alltagspflege',lead:'Beauty-, Hygiene- und Haarpflege-Essentials mit klaren Materialien, ruhiger Verpackung und einem praktischen Blick auf tägliche Routinen.'},
   collection:{intro:'Eine kompakte Auswahl an Beauty-, Hygiene- und Haarpflege-Accessoires, präsentiert als klare Extendio Produktwelt.'},
   signature:{eyebrow:'Markensignatur',title:'Eine ruhige Produktwelt statt einzelner, verstreuter Objekte.',text:'Extendio wirkt wie ein stimmiges Beauty-Regal: echte Haarbürsten, Bambus-Wattestäbchen und Haarclips, verbunden durch eine gemeinsame Sprache aus Materialien, Verpackung und täglicher Praktikabilität.',items:['Wiedererkennbare echte Produktformen','Warme natürliche Texturen','Schwarz, Elfenbein und sanfte Farbakzente']},
   europe:{eyebrow:'Aus Alicante, Spanien',title:'Eine europäische Marke für tägliche Pflege mit klarem, praktischem Blick.',text:'Extendio präsentiert durchdachte Essentials für Beauty, Hygiene und Haarpflege mit ruhiger visueller Identität, klaren Materialien und einem Produkterlebnis für den täglichen Gebrauch.'},
   form:{note:'Nachrichten werden direkt per E-Mail an das Extendio Team gesendet.'},
   footer:{summary:'Europäische Essentials für den Alltag mit klarer Produktidentität, aus Spanien.'}
  },
  es:{
   seo:{title:'Extendio | Cuidado diario europeo desde España',description:'Extendio es una marca europea de cuidado diario desde Alicante, España, con esenciales de belleza, higiene y cuidado del cabello bajo una identidad de producto limpia.'},
   nav:{packaging:'Firma',europe:'Marca'},
   hero:{eyebrow:'Cuidado diario europeo',lead:'Esenciales de belleza, higiene y cuidado del cabello con materiales claros, envase sereno y una mirada práctica para las rutinas diarias.'},
   collection:{intro:'Una selección compacta de accesorios de belleza, higiene y cuidado del cabello presentada como un universo de producto Extendio coherente.'},
   signature:{eyebrow:'Firma de marca',title:'Un universo de producto sereno, no una suma de piezas sueltas.',text:'Extendio se siente como una repisa de belleza coherente: cepillos reales, bastoncillos de bambú y pinzas para el cabello unidos por un mismo lenguaje de materiales, envase y practicidad diaria.',items:['Formas reales y reconocibles','Texturas naturales y cálidas','Acentos en negro, marfil y color suave']},
   europe:{eyebrow:'Desde Alicante, España',title:'Una marca europea de cuidado diario con una mirada limpia y práctica.',text:'Extendio presenta esenciales de belleza, higiene y cuidado del cabello con una identidad visual serena, materiales claros y una experiencia de producto pensada para el uso diario.'},
   form:{note:'Los mensajes se envían directamente al equipo de Extendio por correo electrónico.'},
   footer:{summary:'Esenciales europeos de cuidado diario con una identidad de producto limpia, desde España.'}
  },
  ru:{
   seo:{title:'Extendio | Европейский уход на каждый день из Испании',description:'Extendio — европейский бренд повседневного ухода из Аликанте, Испания: товары для красоты, гигиены и ухода за волосами с чистой продуктовой идентичностью.'},
   nav:{packaging:'Стиль',europe:'Бренд'},
   hero:{eyebrow:'Европейский уход на каждый день',lead:'Товары для красоты, гигиены и ухода за волосами с понятными материалами, спокойной упаковкой и практичным взглядом на ежедневные рутины.'},
   collection:{intro:'Компактная подборка товаров для красоты, гигиены и ухода за волосами, представленная как единый продуктовый мир Extendio.'},
   signature:{eyebrow:'Почерк бренда',title:'Единый спокойный продуктовый мир, а не набор случайных предметов.',text:'Extendio ощущается как цельная beauty-полка: реальные щётки для волос, бамбуковые ватные палочки и заколки объединены одним языком материалов, упаковки и ежедневной практичности.',items:['Узнаваемые реальные формы продуктов','Тёплые натуральные фактуры','Чёрный, айвори и мягкие цветовые акценты']},
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
 function activeCopy(){
  return copyOverrides[activeLang()]||copyOverrides.en;
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
 function injectHeaderWordmark(){
  const header=document.querySelector('.site-header');
  if(!header) return;
  if(header.querySelector('.header-wordmark')) return;
  const link=document.createElement('a');
  link.className='header-wordmark';
  link.href='#top';
  link.setAttribute('aria-label','Extendio Beauty Essentials');
  link.innerHTML="<span class='header-wordmark__symbol' aria-hidden='true'><span class='header-wordmark__leaf'></span><span class='header-wordmark__spark'></span></span><span class='header-wordmark__copy'><span class='header-wordmark__name'>Extendio</span><span class='header-wordmark__tag'>Beauty Essentials</span></span>";
  header.append(link);
 }
 function signatureVisualMarkup(){
  return signatureVisuals.map(item=>`<figure class='brand-signature__tile ${item.className}'><img src='${esc(item.src)}' alt='${esc(item.alt)}' loading='lazy'></figure>`).join('');
 }
 function renderSignatureSection(){
  const section=document.querySelector('#packaging');
  if(!section||section.dataset.signatureReady==='true') return;
  section.dataset.signatureReady='true';
  section.className='section brand-signature';
  section.innerHTML=`<div class='brand-signature__visual' aria-label='Extendio beauty essentials'>${signatureVisualMarkup()}</div><div class='brand-signature__copy'><p class='eyebrow' data-signature-key='eyebrow'></p><h2 data-signature-key='title'></h2><p class='brand-signature__text' data-signature-key='text'></p><ul class='brand-signature__list' data-signature-key='items'></ul><ul id='packagingList' class='detail-list' hidden></ul></div>`;
 }
 function applySignatureCopy(){
  const signature=activeCopy().signature||copyOverrides.en.signature;
  document.querySelectorAll('[data-signature-key]').forEach(el=>{
   const key=el.dataset.signatureKey;
   const value=signature[key];
   if(Array.isArray(value)){
    el.innerHTML=value.map(item=>`<li>${esc(item)}</li>`).join('');
   }else if(typeof value==='string'){
    el.textContent=value;
   }
  });
 }
 function hideRepeatedSections(){
  const repeated=document.querySelector('.collection-mood-intro');
  if(repeated){
   repeated.hidden=true;
   repeated.setAttribute('aria-hidden','true');
  }
 }
 function injectBrandCardStyles(){
  if(document.getElementById('extendio-brand-card-style')) return;
  const style=document.createElement('style');
  style.id='extendio-brand-card-style';
  style.textContent=`
   body{background:linear-gradient(180deg,#fbfaf6 0%,#ffffff 46%,#eef3ed 100%)}
   .site-header>.brand .brand__text{display:none}
   .header-wordmark{display:inline-flex;align-items:center;gap:.55rem;color:var(--ink);z-index:3}
   .header-wordmark__symbol{position:relative;width:34px;height:34px;border:1px solid rgba(31,77,64,.22);border-radius:999px;background:linear-gradient(135deg,#fff,#eef4ec);box-shadow:inset 0 0 0 5px rgba(255,255,255,.72)}
   .header-wordmark__leaf{position:absolute;left:8px;top:10px;width:17px;height:10px;border-radius:999px 999px 999px 2px;background:#1f4d40;transform:rotate(-28deg)}
   .header-wordmark__leaf:after{content:"";position:absolute;right:-5px;top:6px;width:14px;height:8px;border-radius:999px 999px 2px 999px;background:#d5b24c;transform:rotate(42deg)}
   .header-wordmark__spark{position:absolute;right:7px;top:6px;width:5px;height:5px;border-radius:999px;background:#5b234c;box-shadow:0 14px 0 rgba(31,77,64,.32)}
   .header-wordmark__copy{display:grid;line-height:1}
   .header-wordmark__name{font-family:Georgia,Times New Roman,serif;font-style:italic;font-weight:800;font-size:1.7rem;letter-spacing:0;color:#18211c}
   .header-wordmark__tag{margin-top:.1rem;font-size:.56rem;font-weight:900;letter-spacing:.2em;text-transform:uppercase;color:#2f6b57}
   .brand-signature{display:grid;gap:2rem;align-items:center}
   .brand-signature__visual{display:grid;grid-template-columns:1.02fr .98fr;grid-template-rows:1fr 1fr;gap:.72rem;overflow:hidden;border-radius:8px;border:1px solid var(--line);box-shadow:var(--shadow);background:linear-gradient(135deg,#f7f5ee 0%,#ffffff 48%,#e8efe8 100%);padding:.72rem}
   .brand-signature__tile{display:flex;align-items:center;justify-content:center;min-height:205px;margin:0;overflow:hidden;border:1px solid rgba(31,77,64,.12);border-radius:8px;background:#fff}
   .brand-signature__tile img{display:block;width:100%;height:100%;object-fit:contain;padding:clamp(.8rem,2vw,1.2rem)}
   .brand-signature__tile--brush{grid-row:1/3;min-height:440px;background:linear-gradient(180deg,#ffffff 0%,#f3f4ef 100%)}
   .brand-signature__tile--brush img{padding:clamp(1rem,2.4vw,1.6rem)}
   .brand-signature__tile--buds{background:#fffaf2}
   .brand-signature__tile--buds img{padding:.35rem;object-fit:cover}
   .brand-signature__tile--clips{background:#fbfbf7}
   .brand-signature__tile--clips img{padding:.25rem;object-fit:cover}
   .brand-signature__copy{max-width:650px}
   .brand-signature__text{font-size:1.08rem;line-height:1.76}
   .brand-signature__list{display:grid;gap:.65rem;margin:1.2rem 0 0;padding:0;list-style:none}
   .brand-signature__list li{position:relative;padding:.72rem .85rem .72rem 2rem;border:1px solid var(--line);border-radius:8px;background:#fff;color:#48534c}
   .brand-signature__list li:before{content:"";position:absolute;left:.85rem;top:1.2rem;width:.42rem;height:.42rem;border-radius:999px;background:#d5b24c}
   .europe{width:100%;max-width:none;margin:0;background:linear-gradient(135deg,#ffffff 0%,#f4f7f1 58%,#ebe6d7 100%);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:0}
   .europe .eyebrow,.europe h2,.europe .section-text{width:min(100% - 2rem,var(--max));margin-left:auto;margin-right:auto}
   .europe .eyebrow{margin-top:0;margin-bottom:.9rem;padding-top:clamp(3rem,6vw,5rem)}
   .europe h2{max-width:880px;font-size:clamp(2.05rem,4vw,3.45rem);line-height:1.05}
   .europe .section-text{max-width:720px;margin-top:1.2rem;padding-bottom:clamp(3.2rem,6vw,5.2rem);font-size:1.08rem;line-height:1.76}
   @media(min-width:980px){.site-header{display:grid;grid-template-columns:auto 1fr auto;grid-template-areas:"brand wordmark tools" "nav nav nav";row-gap:.35rem}.site-header>.brand{grid-area:brand}.header-wordmark{grid-area:wordmark;justify-self:center}.language-switcher{grid-area:tools;justify-self:end}.site-nav{grid-area:nav;justify-self:center;margin:0}.brand-signature{grid-template-columns:1.08fr .92fr}}
   @media(max-width:979px){.header-wordmark{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}}
   @media(max-width:720px){.header-wordmark__name{font-size:1.25rem}.header-wordmark__tag{display:none}.header-wordmark__symbol{width:28px;height:28px}.brand-signature__visual{grid-template-columns:1fr;grid-template-rows:auto}.brand-signature__tile,.brand-signature__tile--brush{grid-row:auto;min-height:230px}.brand-signature__tile--brush{min-height:320px}.europe h2{font-size:clamp(1.8rem,9vw,2.15rem);line-height:1.08}.europe .section-text{font-size:1rem;line-height:1.68}.europe .eyebrow{padding-top:3rem}}
   @media(max-width:430px){.header-wordmark__symbol{display:none}.header-wordmark__name{font-size:1.14rem}}
  `;
  document.head.append(style);
 }
 function applyCopyOverrides(){
  const copy=activeCopy();
  document.querySelectorAll('[data-i18n]').forEach(el=>{
   const value=valueAt(copy,el.dataset.i18n);
   if(typeof value==='string') el.textContent=value;
  });
  applySignatureCopy();
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
  injectHeaderWordmark();
  renderSignatureSection();
  hideRepeatedSections();
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