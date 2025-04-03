  function adjustForZoom() {
    const scale = window.devicePixelRatio || 1;
    document.documentElement.style.setProperty('--zoom-scale', scale);
  
    const splash = document.querySelector('.splash-content');
    if (splash) {
      splash.style.width = `${window.innerWidth * scale}px`;
      splash.style.height = `${window.innerHeight * scale}px`;
    }
  }
  
  window.addEventListener('resize', adjustForZoom);
  window.addEventListener('load', adjustForZoom);

  document.getElementById("enter-museum-btn").addEventListener("click", () => {
    // Ocultar pantalla de inicio
    document.getElementById("splash-screen").style.display = "none";
  
    // Cambiar la URL visible en el navegador
    history.pushState({}, "", "/pages/museum.html");
  
    // Cargar el contenido del museo dinámicamente
    fetch("/pages/museum.html")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar museum.html");
        return res.text();
      })
      .then(html => {
        document.getElementById("museum-container").innerHTML = html;
  
        // Agregar el CSS si aún no se ha cargado
        if (!document.querySelector("link[href='/assets/css/museum.css']")) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "/assets/css/museum.css";
          document.head.appendChild(link);
        }
      })
      .catch(err => {
        console.error("Error cargando museo:", err);
      });
  });

  window.addEventListener("popstate", () => {
    if (location.pathname === "/index.html" || location.pathname === "/") {
      // Volver al splash
      document.getElementById("museum-container").innerHTML = "";
      document.getElementById("splash-screen").style.display = "flex";
    }
  });
  
  
  