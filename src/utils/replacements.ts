export function clearScreen(code) {
    var text = document.getElementById("text");
    var container1 = document.getElementById("container1");
    if (!container1) throw new Error("<div id=container1> is missing from index.html");

    if (window.animateEnabled && window.animationProperty && !window.isIosApp && !document.getElementById('container2')) {
      var container2 = document.createElement("div");
      container2.setAttribute("id", "container2");
      container2.classList.add('container');
      document.body.classList.add('frozen');
      container2.style.opacity = 0;


      // get the vertical scroll position as pageYOffset
      // translate up by pageYOffset pixels, then scroll to the top
      // now we're scrolled up, but the viewport *looks* like it has retained its scroll position
      var pageYOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var extraScroll = 0;
      if (window.isMobile && window.isWeb && window.isAndroid && !/Chrome/.test(navigator.userAgent)) {
        extraScroll = 1; // try to hide url bar
      }
      pageYOffset -= extraScroll;
      var zoomFactor = window.zoomFactor || document.body.style.zoom;
      if (zoomFactor) pageYOffset /= parseFloat(zoomFactor);
      container1.style.transform = "translateY(-"+pageYOffset+ "px)";
      container1.style.webkitTransform = "translateY(-"+pageYOffset+ "px)";
      window.scrollTo(0,extraScroll);

        [...container1.children].forEach(i => container2.appendChild(i));
      [].forEach.call(container1.querySelectorAll('input,button,a,textarea,label'), function(element) {
        element.setAttribute("tabindex", "-1");
        element.removeAttribute("accesskey");
      });

      document.body.insertBefore(container2, container1);
      main = document.getElementById("main");
      main.innerHTML = "";
      text = document.createElement("div");
      text.setAttribute("id", "text");
      main.appendChild(text);
      if (window.isChromeApp) fixChromeLinks();
    } else {
      main = document.getElementById("main");
      main.innerHTML = "";
      text = document.createElement("div");
      text.setAttribute("id", "text");
      main.appendChild(text);

      window.scrollTo(0,1);
    }


    var useAjax = true;
    if (isWeb && window.noAjax) {
      useAjax = false;
    }

    if (useAjax) {
      doneLoading();
      safeCall(null, code);
    } else {
      if (!initStore()) alert("Your browser has disabled cookies; this game requires cookies to work properly.  Please re-enable cookies and refresh this page to continue.");
      startLoading();
      var form = window.document.createElement("form");
      var axn = window.location.protocol + "//" + window.location.host + window.location.pathname;
      form.setAttribute("action", axn);
      form.setAttribute("method", "POST");
      main.appendChild(form);
      form.submit();
    }
}