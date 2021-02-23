const dbPromised = idb.open("ligue1", 1, upgradeDb => {
    const articleObjectStore = upgradeDb.createObjectStore("club-info",{keyPath: "tla"});
    articleObjectStore.createIndex("name", "name", {unique : false});
});

function saveClubInfo(club) {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("club-info","readwrite");
        const store = tx.objectStore("club-info");
        store.put(club);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: 'The Club has been Saved'})
    })
}

function deleteClubInfo(club) {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("club-info","readwrite");
        const store = tx.objectStore("club-info");
        const item = club.tla;
        store.delete(item);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: 'The Club has been Deleted'})
    })
}

function getAll(){
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("club-info", "readonly");
            const store = tx.objectStore("club-info");
            return store.getAll()
        })
        .then(function(club) {
            resolve(club);
        })
    })
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("club-info", "readonly");
            const store = tx.objectStore("club-info");
            return store.get(id);
        })
        .then(function(club) {
            resolve(club)
        })
    })
}
