document.addEventListener("DOMContentLoaded", () => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status !== 200) return;
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                document.querySelectorAll(".sidenav a , .topnav a ").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page)
                    });
                });
            }
        }
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page)
    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4){
                const content = document.querySelector("#body-content");
                if(page === "home") {
                    getStandings();
                }else if(page === "match") {
                    getMatch();
                }else if(page === "saved") {
                    getSavedClub();
                }
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>"
                } else {
                    content.innerHTML = "<p> ups.. Halaman tidak ditemukan</p>"
                }
            }
        }
        xhttp.open("GET", `pages/${page}.html`, true)
        xhttp.send()
    }
})