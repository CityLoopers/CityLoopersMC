//based on a pen by @robinselmer
const url = "https://api.minetools.eu/ping/cityloopers.com/25565";

/**
 * Updates the status of the Minecraft server with data from the API
 * @param {Object} data The data from the API
 */
function updateServerStatus(data) {
    // The number of players online
    let online = data.players.online;
    // The server's description
    let description = data.description;
    // The new status of the server
    let status = online > 0 ?
        // If there are players online, show their number and the description
        `<b>Players Online:</b> ${online}${description ? ` ${description}` : ''}` :
        // If there are no players online, show the server as being offline
        'Server Offline';
    // Update the UI with the new status
    $('#rest').html(status);
}


/**
 * Fetches the status of the Minecraft server from the API and updates the UI
 */
function getServerStatus() {
    // Make an AJAX request to the server status API
    $.getJSON(url)
        // If the request is successful, update the UI with the new status
        .then(updateServerStatus)
        // If the request fails, update the UI to show the server as offline
        .fail(function() {
            updateServerStatus({
                players: {
                    online: 0
                }
            });
        });
}
getServerStatus();


