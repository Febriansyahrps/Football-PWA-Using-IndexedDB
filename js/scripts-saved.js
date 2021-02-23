function getSavedClub() {
    getAll().then(function(clubs) {
        let clubInfoHtml = `<h3 class="center">Saved Club</h3>`;
        clubs.forEach(function(club) {
            clubInfoHtml +=`
                <div class="col s12 m12 l12 ">
                    <div class="col s12 m1 l1 hide-on-small-only"></div>
                    <a class="" href="./club-info.html?id=${club.tla}&saved=true">
                        <div class="col s12 m10 l10">
                            <div class="card horizontal grey lighten-4 waves-effect">
                                <div class="card-image">
                                    <img class="responsive-img" src="${club.crestUrl}" alt="club logo">
                                </div>
                                <div class="card-content valign-wrapper" style="color: black;">
                                    <h4 class="hide-on-small-only">${club.name}</h4>
                                    <h5 class="hide-on-med-and-up">${club.name}</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            document.getElementById("club-saved").innerHTML = clubInfoHtml; 
        })
    })
}

function getSavedClubInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    getById(idParam).then(function(club){
        let clubInfoHTML =`
            <h3 class="center">${club.name}</h3>
            <div class="col s12 s6 m12 hide-on-small-only">
                <div class="card horizontal">
                    <div class="card-image valign-wrapper grey lighten-2">
                        <img src="${club.crestUrl}" alt="Club Logo" class="responsive-img">
                    </div>
                    <div class="card-stacked"> 
                        <div class="card-content grey lighten-2 center">
                            <h5><b>Team Name : </b> ${club.name} </h5>
                            <h5><b>Founded : </b> ${club.founded} </h5>
                            <h5><b>Venue : </b> ${club.venue} </h5>
                            <h5><b>Address : </b> ${club.address} </h5>
                            <h5><b>Official Website : </b> <a href="${club.website}">${club.website}</a></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s12 m12 hide-on-med-and-up">
                <div class="card">
                    <div class="card-image grey lighten-2">
                        <img src="${club.crestUrl}" alt="Club Logo" class="responsive-img">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content center grey lighten-2">
                            <h6><b>Team Name : </b> ${club.name}</h6>
                            <h6><b>Founded : </b> ${club.founded}</h6>
                            <h6><b>Venue : </b> ${club.venue}</h6>
                            <h6><b>Address : </b> ${club.address}</h6>
                            <h6><b>Official Website : </b> <a href="${club.website}">${club.website}</a></h6>
                        </div>
                    </div>
                </div>
            </div>
            <h4 class="center">${club.name} Player List</h4>
        `;
        club.squad.forEach(function(player) {
            clubInfoHTML += `
                <div class="col s12 m6 l6">
                    <div class="card grey lighten-4">
                        <div class="card-content center">
                            <b><p>${player.position}</p></b>
                            <h5>${player.name}</h5>
                            <p>${player.nationality}</p>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("body-content").innerHTML = clubInfoHTML;
        })
    })   
}