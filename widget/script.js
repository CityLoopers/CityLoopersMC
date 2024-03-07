//based on a pen by @robinselmer
var url = "https://api.minetools.eu/ping/cityloopers.com/25565";

$.getJSON(url, function(r) {
    if(r.error){
        $('#rest').html('Server Offline');
        return false;
    }

    let status = "1,2,3";
    let pl = '';
    if(r.players.sample.length > 0 ){
        pl = '';

    }

    // Display only players list
    $('#rest').html(`<b>Players Online:</b> ${r.players.online}${pl} \n ${r.description}`);
});
