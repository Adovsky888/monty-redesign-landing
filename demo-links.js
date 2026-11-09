(function(){var C="https://adovsky888.github.io/monty-redesign-cabinet/";
function fix(a){var h=a.getAttribute("href");if(!h)return;
 if(h.indexOf("app.monty.fast")>-1){a.href=/plan=/.test(h)&&!/plan=free/.test(h)&&!/Начать бесплатно/.test(a.textContent)?C+"?buy=1":C+"?demo=login";a.removeAttribute("target");return;}
 if(h.charAt(0)==="/"&&h.charAt(1)!=="/"&&h.indexOf("/monty-redesign-landing")!==0){a.href="https://monty.fast"+h;}}
function all(){[].forEach.call(document.querySelectorAll("a[href]"),fix);}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(a)fix(a);},true);
document.addEventListener("DOMContentLoaded",function(){all();new MutationObserver(all).observe(document.body,{childList:true,subtree:true});});
})();
