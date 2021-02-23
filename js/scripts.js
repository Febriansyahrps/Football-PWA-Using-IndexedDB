const api_url = "https://api.football-data.org/v2";

function status(response) {
    if(response.status !== 200) {
        console.log(`Error : ${response.status}`)
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response)
    }
}

function json(response) {
    return response.json()
}

function error(error) {
    console.log(`Error : ${error}`)
}

function getStandings() {
    if('caches' in window){
        caches.match(`${api_url}/competitions/2015/standings`)
        .then(function(response) {
            if(response) {
                response.json()
                .then(function(data) {
                    let standingHTML = `
                        <h3 class="center">${data.competition.name} Standings</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th class="col s1 center" title="Postition">Pos</th>
                                    <th class="col s6">Club</th>
                                    <th class="col s1 center hide-on-med-and-down" >Played</th>
                                    <th class="col s1 center hide-on-med-and-down" >Win</th>
                                    <th class="col s1 center hide-on-med-and-down" >Draw</th>
                                    <th class="col s1 center hide-on-med-and-down" >Lost</th>
                                    <th class="col s1 center hide-on-med-and-down" >Points</th>
                                    <th class="col s1 center hide-on-large-only" title="Played">Pl</th>
                                    <th class="col s1 center hide-on-large-only" title="Win">W</th>
                                    <th class="col s1 center hide-on-large-only" title="Draw">D</th>
                                    <th class="col s1 center hide-on-large-only" title="Lost">L</th>
                                    <th class="col s1 center hide-on-large-only" title="Points">Pts</th>
                                </tr>
                            </thead>
                        </table> 
                    `;
                    const standing = data.standings[0].table;
                    standing.forEach(function(club) {
                        standingHTML += `
                            <table class="highlight">
                                <tbody>
                                    <tr class="valign-wrapper">
                                        <td class="col s1 center" title="Position">${club.position}</td>
                                        <td class="col s1 hide-on-med-and-down" title="Click for more Club Information">
                                            <a href="./club-info.html?id=${club.team.id}">
                                                <img src="${club.team.crestUrl}"alt="clubs logo" class="valign-wrapper" width="80%">
                                            </a>
                                        </td>
                                        <td class="col s1 hide-on-large-only hide-on-small-only" title="Click for more Club Information">
                                            <a href="./club-info.html?id=${club.team.id}">
                                                <img src="${club.team.crestUrl}"alt="clubs logo" class="valign-wrapper" width="100%">
                                            </a>
                                        </td>
                                        <td class="col s1 hide-on-med-and-up" title="Click for more Club Information">
                                            <a href="./club-info.html?id=${club.team.id}">
                                                <img src="${club.team.crestUrl}"alt="clubs logo" class="valign-wrapper" width="200%">
                                            </a>
                                        </td>
                                        <td class="col s5" title="Club">${club.team.name}</td>
                                        <td class="col s1 center" title="Played">${club.playedGames}</td>
                                        <td class="col s1 center" title="Win">${club.won}</td>
                                        <td class="col s1 center" title="Draw">${club.draw}</td>
                                        <td class="col s1 center" title="Lost">${club.lost}</td>
                                        <td class="col s1 center" title="Points">${club.points}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                    });
                    document.getElementById("standings").innerHTML = standingHTML;
                })
            }
        })
    }
    fetch(`${api_url}/competitions/2015/standings`,{
        headers: {
            "X-Auth-Token":"dc3fe065e0204b4e9296ceee718609ea",
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
        let standingHTML = `
            <h3 class="center">${data.competition.name} Standings</h3>
            <table>
                <thead>
                    <tr>
                        <th class="col s1 center" title="Postition">Pos</th>
                        <th class="col s6">Club</th>
                        <th class="col s1 center hide-on-med-and-down" >Played</th>
                        <th class="col s1 center hide-on-med-and-down" >Win</th>
                        <th class="col s1 center hide-on-med-and-down" >Draw</th>
                        <th class="col s1 center hide-on-med-and-down" >Lost</th>
                        <th class="col s1 center hide-on-med-and-down" >Points</th>
                        <th class="col s1 center hide-on-large-only" title="Played">Pl</th>
                        <th class="col s1 center hide-on-large-only" title="Win">W</th>
                        <th class="col s1 center hide-on-large-only" title="Draw">D</th>
                        <th class="col s1 center hide-on-large-only" title="Lost">L</th>
                        <th class="col s1 center hide-on-large-only" title="Points">Pts</th>
                    </tr>
                </thead>
            </table> 
        `;
        const standing = data.standings[0].table;
        standing.forEach(function(club) {
            standingHTML += `
                <table class="highlight">
                    <tbody>
                        <tr class="valign-wrapper">
                            <td class="col s1 center" title="Position">${club.position}</td>
                            <td class="col s1 hide-on-med-and-down" title="Click for more Club Information">
                                <a href="./club-info.html?id=${club.team.id}">
                                    <img src="${club.team.crestUrl}"alt="clubs logo" class="valign-wrapper" width="80%">
                                </a>
                            </td>
                            <td class="col s1 hide-on-large-only hide-on-small-only" title="Click for more Club Information">
                                <a href="./club-info.html?id=${club.team.id}">
                                    <img src="${club.team.crestUrl}"alt="clubs logo" class="valign-wrapper" width="100%">
                                </a>
                            </td>
                            <td class="col s1 hide-on-med-and-up" title="Click for more Club Information">
                                <a href="./club-info.html?id=${club.team.id}">
                                    <img src="${club.team.crestUrl}"alt="clubs logo" class="valign-wrapper" width="200%">
                                </a>
                            </td>
                            <td class="col s5" title="Club">${club.team.name}</td>
                            <td class="col s1 center" title="Played">${club.playedGames}</td>
                            <td class="col s1 center" title="Win">${club.won}</td>
                            <td class="col s1 center" title="Draw">${club.draw}</td>
                            <td class="col s1 center" title="Lost">${club.lost}</td>
                            <td class="col s1 center" title="Points">${club.points}</td>
                        </tr>
                    </tbody>
                </table>
            `;
        });
        document.getElementById("standings").innerHTML = standingHTML;
    })
    .catch(error)
}

function getMatch() {
    if('caches' in window){
        caches.match(`${api_url}/competitions/2015/matches?status=SCHEDULED&dateFrom=2020-11-27&dateTo=2020-12-13`)
        .then(function(response) {
            if(response) {
                response.json()
                .then(function(data) {
                    let matchListHTML = `
                        <h3 class="center">Upcoming Match</h3>
                    `;
                    const matchlist = data.matches;
                    matchlist.forEach(function(match) {
                        const date = match.utcDate.substring(0,10);
                        const time = match.utcDate.substring(11,16);
                        matchListHTML += `
                            <div class="col s12 m6 s6">
                                <div class="card indigo darken-4">
                                    <div class="card-content white-text">
                                        <b><p class="center">${date}</p></b>
                                        <span class="card-title center">${match.homeTeam.name}</span>
                                        <span class="card-title center">vs</span>
                                        <span class="card-title center">${match.awayTeam.name}</span>
                                        <b><p class="center">At ${time} GMT +1</p></b>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    document.getElementById("match-list").innerHTML = matchListHTML;
                })
            }
        })
    }
    fetch(`${api_url}/competitions/2015/matches?status=SCHEDULED&dateFrom=2020-11-27&dateTo=2020-12-13`,{
        headers: {
            "X-Auth-Token":"dc3fe065e0204b4e9296ceee718609ea",
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
        let matchListHTML = `
            <h3 class="center">Upcoming Match</h3>
        `;
        const matchlist = data.matches;
        matchlist.forEach(function(match) {
            const date = match.utcDate.substring(0,10);
            const time = match.utcDate.substring(11,16);
            matchListHTML += `
                <div class="col s12 m6 s6">
                    <div class="card indigo darken-4">
                        <div class="card-content white-text">
                            <b><p class="center">${date}</p></b>
                            <span class="card-title center">${match.homeTeam.name}</span>
                            <span class="card-title center">vs</span>
                            <span class="card-title center">${match.awayTeam.name}</span>
                            <b><p class="center">At ${time} GMT +1</p></b>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById("match-list").innerHTML = matchListHTML;
    })
    .catch(error)
}

function getClubInfo() {
    return new Promise(function(resolve, reject){
        let urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id")
        if('caches' in window){
            caches.match(`${api_url}/teams/${idParam}`)
            .then(function(response) {
                if(response) {
                    response.json()
                    .then(function(data) {
                        let clubInfoHTML =`
                            <h3 class="center">${data.name}</h3>
                            <div class="col s12 s6 m12 hide-on-small-only">
                                <div class="card horizontal">
                                    <div class="card-image valign-wrapper grey lighten-2">
                                        <img src="${data.crestUrl}" alt="Club Logo" class="responsive-img">
                                    </div>
                                    <div class="card-stacked"> 
                                        <div class="card-content grey lighten-2 center">
                                            <h5><b>Team Name : </b> ${data.name} </h5>
                                            <h5><b>Founded : </b> ${data.founded} </h5>
                                            <h5><b>Venue : </b> ${data.venue} </h5>
                                            <h5><b>Address : </b> ${data.address} </h5>
                                            <h5><b>Official Website : </b> <a href="${data.website}">${data.website}</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m12 hide-on-med-and-up">
                                <div class="card">
                                    <div class="card-image grey lighten-2">
                                        <img src="${data.crestUrl}" alt="Club Logo" class="responsive-img">
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content center grey lighten-2">
                                            <h6><b>Team Name : </b> ${data.name}</h6>
                                            <h6><b>Founded : </b> ${data.founded}</h6>
                                            <h6><b>Venue : </b> ${data.venue}</h6>
                                            <h6><b>Address : </b> ${data.address}</h6>
                                            <h6><b>Official Website : </b> <a href="${data.website}">${data.website}</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 class="center">${data.name} Player List</h4>
                        `;
                        data.squad.forEach(function(player) {
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
                        });
                        document.getElementById("body-content").innerHTML = clubInfoHTML;
                        resolve(data)
                    })
                }
            })
        }
        fetch(`${api_url}/teams/${idParam}`,{
            headers: {
                "X-Auth-Token":"dc3fe065e0204b4e9296ceee718609ea",
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            let clubInfoHTML =`
                <h3 class="center">${data.name}</h3>
                <div class="col s12 s6 m12 hide-on-small-only">
                    <div class="card horizontal">
                        <div class="card-image valign-wrapper grey lighten-2">
                            <img src="${data.crestUrl}" alt="Club Logo" class="responsive-img">
                        </div>
                        <div class="card-stacked"> 
                            <div class="card-content grey lighten-2 center">
                                <h5><b>Team Name : </b> ${data.name} </h5>
                                <h5><b>Founded : </b> ${data.founded} </h5>
                                <h5><b>Venue : </b> ${data.venue} </h5>
                                <h5><b>Address : </b> ${data.address} </h5>
                                <h5><b>Official Website : </b> <a href="${data.website}">${data.website}</a></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 m12 hide-on-med-and-up">
                    <div class="card">
                        <div class="card-image grey lighten-2">
                            <img src="${data.crestUrl}" alt="Club Logo" class="responsive-img">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content center grey lighten-2">
                                <h6><b>Team Name : </b> ${data.name}</h6>
                                <h6><b>Founded : </b> ${data.founded}</h6>
                                <h6><b>Venue : </b> ${data.venue}</h6>
                                <h6><b>Address : </b> ${data.address}</h6>
                                <h6><b>Official Website : </b> <a href="${data.website}">${data.website}</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="center">${data.name} Player List</h4>
            `;
            data.squad.forEach(function(player) {
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
            });
            document.getElementById("body-content").innerHTML = clubInfoHTML;
            resolve(data)
        })
    })
}