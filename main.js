/* main.js - calculator + basic cookie consent gate for ads */
document.addEventListener('DOMContentLoaded', function(){
  const lmpInput = document.getElementById('lmp');
  const resultDiv = document.getElementById('result');
  const calcBtn = document.getElementById('calcBtn');

  if(calcBtn){
    calcBtn.addEventListener('click', function(e){
      const lmp = lmpInput.value;
      if(!lmp){ alert('Please select your LMP date.'); return; }
      const date = new Date(lmp);
      date.setDate(date.getDate() + 280);
      resultDiv.style.display = 'block';
      resultDiv.innerHTML = '<h3>Estimated Due Date:</h3><strong>'+ date.toDateString() +'</strong>';
    });
  }

  // Cookie consent simple: store 'adsense_consent' = 'yes'/'no'
  const consentKey = 'adsense_consent';
  const consent = localStorage.getItem(consentKey);
  const consentBar = document.getElementById('cookie-consent-bar');
  if(!consent && consentBar) consentBar.style.display = 'flex';

  window.giveConsent = function(yes){
    localStorage.setItem(consentKey, yes ? 'yes' : 'no');
    if(consentBar) consentBar.style.display = 'none';
    if(yes){
      // load AdSense script dynamically
      const s = document.createElement('script');
      s.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXX'); // replace with your publisher ID
      s.async = true;
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      document.head.appendChild(s);
    }
  };
});
