/* Pipeline Packaging · corporate website prototype
   Activate live form submissions later by adding an endpoint to FORM_ENDPOINT.
   Do not publish real contact details until supplied/approved.
*/
(() => {
  'use strict';
  const FORM_ENDPOINT = ''; // e.g. your verified Formspree endpoint. Blank = transparent preview mode.
  const header = document.getElementById('site-header');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 15);
  window.addEventListener('scroll', onScroll, { passive:true }); onScroll();
  function setMenu(open) {
    if (!menu || !nav) return;
    menu.classList.toggle('open',open); nav.classList.toggle('open',open);
    menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  }
  menu?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e=>{if(e.key === 'Escape'){setMenu(false);closeModal();}});
  document.addEventListener('click',e=>{if(nav?.classList.contains('open') && !header.contains(e.target))setMenu(false);});
  document.getElementById('year').textContent = new Date().getFullYear();

  // Content stays visible immediately; no scroll animation can hide page sections.

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  filters.forEach(button=>button.addEventListener('click',()=>{
    const active=button.dataset.filter;
    filters.forEach(el=>{const isActive = el===button; el.classList.toggle('active',isActive);el.setAttribute('aria-pressed',String(isActive));});
    let count=0;
    cards.forEach(card=>{const show=active==='all'||card.dataset.category===active; card.hidden=!show;if(show)count++;});
    const status=document.getElementById('filter-status'); if(status)status.textContent=`Showing ${count} packaging ${count===1?'category':'categories'}.`;
  }));

  const form = document.getElementById('quote-form');
  const modal = document.getElementById('quote-modal');
  const preview = document.getElementById('quote-preview');
  const feedback = document.getElementById('form-feedback');
  let previousFocus = null;
  let quoteText='';
  function closeModal(){if(modal&&!modal.hidden){modal.hidden=true;document.body.style.overflow='';previousFocus?.focus();}}
  function showModal(){if(!modal)return;previousFocus=document.activeElement;modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.modal-close')?.focus();}
  modal?.querySelector('.modal-close')?.addEventListener('click',closeModal);
  document.getElementById('close-modal')?.addEventListener('click',closeModal);
  modal?.addEventListener('click',event=>{if(event.target===modal)closeModal();});
  document.getElementById('copy-quote')?.addEventListener('click',async e=>{
    const btn=e.currentTarget;
    try {
      await navigator.clipboard.writeText(quoteText);
      btn.textContent='Copied!';setTimeout(()=>btn.textContent='Copy inquiry',1900);
    } catch {
      if(preview){const sel=window.getSelection(),range=document.createRange();range.selectNodeContents(preview);sel.removeAllRanges();sel.addRange(range);}
      btn.textContent='Select and copy the text';
    }
  });
  const params = new URLSearchParams(location.search);
  const interest = params.get('interest');
  const interestField=document.getElementById('interest');
  if(interest && interestField){
    const values=Array.from(interestField.options).map(o=>o.value);
    const match=values.find(v=>v.toLowerCase()===interest.toLowerCase()) || values.find(v=>v.toLowerCase().includes(interest.toLowerCase()));
    interestField.value=match||'Other';
  }
  form?.querySelectorAll('input, select, textarea').forEach(x=>x.addEventListener('input',()=>x.removeAttribute('aria-invalid')));
  form?.addEventListener('submit',async e=>{
    e.preventDefault(); if(feedback)feedback.hidden=true;
    if(form.elements.website.value) return; // basic anti-spam field
    const required=Array.from(form.querySelectorAll('[required]'));
    const invalid=required.find(field=>!field.value.trim() || (field.type==='email'&&!field.validity.valid) || (field.getAttribute('minlength')&&field.value.trim().length<Number(field.getAttribute('minlength'))));
    if(invalid){invalid.setAttribute('aria-invalid','true');invalid.focus();if(feedback){feedback.textContent='Please complete all required fields with valid information.';feedback.hidden=false;}return;}
    const fields=Object.fromEntries(new FormData(form).entries());
    const keys=[['Name','name'],['Company','company'],['Email','email'],['Phone','phone'],['Product interest','interest'],['Estimated quantity','quantity'],['Project details','message']];
    quoteText='PIPELINE PACKAGING — INQUIRY PREVIEW\n\n'+keys.filter(([,key])=>fields[key]).map(([label,key])=>`${label}: ${fields[key]}`).join('\n')+'\n\nNote: This preview has not been sent.';
    if(FORM_ENDPOINT){
      const submit=form.querySelector('[type=submit]');submit.disabled=true;const original=submit.innerHTML;submit.textContent='Sending…';
      try {
        const result=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        if(!result.ok)throw Error('Submission failed');
        form.reset(); if(feedback){feedback.textContent='Thanks — your inquiry has been sent.';feedback.style.color='#148553';feedback.hidden=false;}
      }catch{if(feedback){feedback.textContent='Your inquiry could not be sent. Please try again later.';feedback.hidden=false;}}
      finally{submit.innerHTML=original;submit.disabled=false;}
    }else{preview.textContent=quoteText;showModal();}
  });
})();
