import { FORBIDDEN_KEYS } from "./utils";

class ScopeWatchModel {

	constructor() {
		this.replaceNativeFunctions
	}

	replaceNativeFunctions() {
		window.clearScreen = function(code) {
			const container1 = document.getElementById("container1");
			if (!container1) {
			  throw new Error("<div id=container1> is missing from index.html");
			}
		  
			if (window.animateEnabled && window.animationProperty && !window.isIosApp && !document.getElementById('container2')) {
			  const container2 = document.createElement("div");
			  container2.id = "container2";
			  container2.classList.add('container');
			  document.body.classList.add('frozen');
			  container2.style.opacity = 0;
		  
			  const pageYOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			  const extraScroll = window.isMobile && window.isWeb && window.isAndroid && !/Chrome/.test(navigator.userAgent) ? 1 : 0;
			  container1.style.transform = `translateY(-${pageYOffset + extraScroll}px)`;
			  container1.style.webkitTransform = `translateY(-${pageYOffset + extraScroll}px)`;
			  window.scrollTo(0, extraScroll);

			  [...container1.children].forEach(el => container2.appendChild(el))

			  Array.from(container1.querySelectorAll('input,button,a,textarea,label')).forEach(element => {
				element.setAttribute("tabindex", "-1");
				element.removeAttribute("accesskey");
			  });
		  
			  document.body.insertBefore(container2, container1);
			  document.getElementById("main").innerHTML = "";
			  const text = document.createElement("div");
			  text.id = "text";
			  document.getElementById("main").appendChild(text);
			  if (window.isChromeApp) {
				window.fixChromeLinks();
			  }
			} else {
			  document.getElementById("main").innerHTML = "";
			  const text = document.createElement("div");
			  text.id = "text";
			  document.getElementById("main").appendChild(text);
			  window.scrollTo(0, 1);
			}
		  
			const useAjax = isWeb && !window.noAjax;
			if (useAjax) {
			  window.doneLoading();
			  window.safeCall(null, code);
			} else {
			  if (!window.initStore()) {
				alert("Your browser has disabled cookies; this game requires cookies to work properly. Please re-enable cookies and refresh this page to continue.");
			  }
			  window.startLoading();
			  const form = document.createElement("form");
			  const axn = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
			  form.action = axn;
			  form.method = "POST";
			  document.getElementById("main").appendChild(form);
			  form.submit();
			}
		  }		  
	}
}

