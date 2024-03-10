
const lines = ['north-south', 'east-west', 'north-west', 'north-east', 'south-east', 'south-west'];

/**
 * Initialize the navbar with links based on the current page and 'lines' array.
 *
 * @param {} 
 * @return {}
 */
window.onload = function () {
    const navbar = document.getElementById('navbar');
    const currentPage = window.location.pathname.split('/').pop().split('.').shift();
    const isLinePage = currentPage.startsWith('line');
    const navHTML = ['<li>City Loopers</li>',
        `<li><a href="${isLinePage ? './' : '../'}index.html" ${currentPage === 'index' ? 'style="font-weight: bold"' : ''}>Home</a></li>`,
        `<li><a href="${isLinePage ? './' : '../'}status.html" ${currentPage === 'status' ? 'style="font-weight: bold"' : ''}>MRT Status</a></li>`,
        '<div class="dropdown">',
        '  <button class="dropbtn">Lines 🞃</button>',
        '  <div class="dropdown-content">'];
    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        const lineName = line.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        navHTML.push(`<a href="${isLinePage ? './' : '../'}lines/${line}.html" ${line === currentPage ? 'style="font-weight: bold"' : ''}>${lineName} Line</a>`);
    }
    navHTML.push('  </div>', '</div>');
    navbar.innerHTML = navHTML.join('');
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.line-status').forEach(function(lineStatus) {
        const line = lineStatus.id.split('-')[1]+'-'+lineStatus.id.split('-')[2];
        console.log(line)
        const status = getLineStatus(line);
        lineStatus.className = 'line-status';
        lineStatus.classList.add(status);
        lineStatus.textContent = {
            'good': 'Good Service',
            'bus-replace': 'Works Alert',
            'suspended': 'Suspended'
        }[status];
    });
})

/**
 * Retrieves the status of a given transportation line.
 *
 * @param {string} line - the name of the transportation line
 * @return {string} the status of the transportation line
 */
function getLineStatus(line) {
    // In a real implementation, this would query a SQLite database or make an API request
    // For now, just return a random status
    const statuses = ['good', 'bus-replace', 'suspended'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}








