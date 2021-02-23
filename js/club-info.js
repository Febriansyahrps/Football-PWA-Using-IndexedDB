document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search)
    const isFromSaved = urlParams.get("saved")
    const idParam = urlParams.get("id");
    const btnSave = document.getElementById("save");
    const btnDelete = document.getElementById("delete");
    
    if(isFromSaved){
        getSavedClubInfo()
        btnSave.style.display= 'none';
        btnDelete.onclick = function() {
            getById(idParam).then(function(club) {
                deleteClubInfo(club)
            });
        }
    } else {
        btnDelete.style.display= 'none';
        const item = getClubInfo();
        btnSave.onclick = function() {
            item.then(function(club) {
                saveClubInfo(club);
            });
        }
        getClubInfo();
    }
})