
const lines = ['north-south', 'east-west', 'north-west', 'north-east', 'south-east', 'south-west'];

function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const isLinesDirectory = window.location.pathname.includes('/lines/');

    const navLinks = [
        { text: 'Home', href: 'index.html' },
        { text: 'MRT Status', href: 'status.html' },
        { text: 'Apply', href: 'apply.html' },
        { text: 'Map', href: 'http://194.153.216.151:25729/', external: true },
    ];

    let navHTML = '';
    navLinks.forEach(link => {
        const isActive = currentPage === link.href.replace('.html', '');
        const path = isLinesDirectory && !link.external ? '../' : './';
        navHTML += `
            <a href="${link.external ? '' : path}${link.href}"
               class="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300 ${isActive ? 'text-blue-500 border-b-4 border-blue-500' : ''}"
               ${link.external ? 'target="_blank"' : ''}>
               ${link.text}
            </a>
        `;
    });

    // Lines Dropdown
    navHTML += `
        <div class="relative group">
            <button class="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">
                Lines <i class="fas fa-chevron-down fa-xs"></i>
            </button>
            <div class="absolute hidden bg-white shadow-lg rounded-md mt-2 py-2 w-48 group-hover:block">
    `;
    lines.forEach(line => {
        const lineName = line.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const isActive = currentPage === line;
        const path = isLinesDirectory ? '' : './lines/';
        navHTML += `<a href="${path}${line}.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white ${isActive ? 'font-bold' : ''}">${lineName} Line</a>`;
    });
    navHTML += `</div></div>`;

    navbar.innerHTML = navHTML;
}

const footer = document.querySelector('footer');
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();

    // Line status updates
    document.querySelectorAll('.line-status').forEach(function(lineStatus) {
        const line = lineStatus.id.split('-')[2] + '-' + lineStatus.id.split('-')[3];
        const status = getLineStatus(line);

        let statusText = '';
        let iconClass = '';
        let textClass = '';

        switch(status) {
            case 'good':
                statusText = 'Good Service';
                iconClass = 'fas fa-check-circle text-green-500';
                textClass = 'text-green-500';
                break;
            case 'bus-replace':
                statusText = 'Works Alert';
                iconClass = 'fas fa-exclamation-triangle text-yellow-500';
                textClass = 'text-yellow-500';
                break;
            case 'suspended':
                statusText = 'Suspended';
                iconClass = 'fas fa-times-circle text-red-500';
                textClass = 'text-red-500';
                break;
        }

        lineStatus.innerHTML = `<i class="${iconClass} mr-2"></i><span class="${textClass}">${statusText}</span>`;
    });

    // Add station elements on line pages
    const linePage = document.getElementById('line-page');
    if (linePage) {
        const line = linePage.dataset.line;
        if (line) {
            addStationElements(line);
        }
    }

    if (footer) {
        footer.innerHTML = `
            <div class="max-w-6xl mx-auto px-4 py-6 text-center text-white">
                <p>&copy; 2024 City Loopers. All Rights Reserved.</p>
            </div>
        `;
    }
});

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


function addStationElements(line) {
    const linePage = document.getElementById('line-page');
    if (!linePage) {
        console.error('Could not find element with id \'line-page\'');
        return;
    }
    const currentPage = window.location.pathname.split('/').pop().split('.').shift();
    const stationsPromise = getStationsForLine(line);
    if (!stationsPromise) {
        console.error(`Could not get promise for stations for line '${line}'`);
        return;
    }
    stationsPromise.then(stations => {
        if (!stations) {
            console.error(`Could not find stations for line '${line}'`);
            return;
        }
        const currentLineStations = stations.stations.filter(station => station.line === currentPage);
        for (const station of currentLineStations) {
            const stationElement = createStationElement(stations, station);
            linePage.appendChild(stationElement);
        }
    }).catch(error => {
        console.error(`Error retrieving stations for line '${line}': ${error}`);
    });
}

function getStationsForLine(line) {
    const isLinesDirectory = window.location.pathname.includes('/lines/');
    const path = isLinesDirectory ? './stations/' : './lines/stations/';
    const stationsUrl = `${path}${line}.json`;

    return fetch(stationsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

function createStationElement(stations, station) {
    const stationElement = document.createElement('div');
    stationElement.className = 'box';
    const stationCodes = station.code.split(',');
    for (const code of stationCodes) {
        const stationCodeDiv = createStationCodeDiv(stations, code);
        stationElement.appendChild(stationCodeDiv);
    }
    const nameHeader = createNameHeader(station);
    stationElement.appendChild(nameHeader);
    const descriptionParagraph = createDescriptionParagraph(station);
    stationElement.appendChild(descriptionParagraph);
    return stationElement;
}

function createStationCodeDiv(stations, code) {
    const stationCodeDiv = document.createElement('div');
    stationCodeDiv.className = `station ${stations.color}`;
    const stationCodeHeader = document.createElement('h1');
    stationCodeHeader.textContent = code.trim();
    stationCodeDiv.appendChild(stationCodeHeader);
    return stationCodeDiv;
}

function createNameHeader(station) {
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = station.name;
    return nameHeader;
}

function createDescriptionParagraph(station) {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = station.description;
    return descriptionParagraph;
}


