
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
        `<li><a href="${isLinePage ? './' : '../'}apply.html" ${currentPage === 'apply' ? 'style="font-weight: bold"' : ''}>Apply</a></li>`,
        `<li><a href="http://194.153.216.151:25729/"}>Map</a></li>`,
        '<div class="dropdown">',
        '  <button class="dropbtn">Lines 🞃</button>',
        '  <div class="dropdown-content">'];
    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        const lineName = line.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        addStationElements(line)
        navHTML.push(`<a href="${isLinePage ? './' : '../'}lines/${line}.html" ${line === currentPage ? 'style="font-weight: bold"' : ''}>${lineName} Line</a>`);
    }
    navHTML.push('  </div>', '</div>');
    navbar.innerHTML = navHTML.join('');
}

const footer = document.querySelector('footer');
if (!footer) {
  const newFooter = document.createElement('footer');
  document.body.appendChild(newFooter);
  footer = newFooter;
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
    footer.innerHTML = `
    <div class="grid-container ">
        <div class="box">

        </div>
        <div class="box">
            <p>
                © 2024 City Loopers
            </p>
        </div>
        <div class="box">

        </div>
      
    </div>
`;

},

)

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
    const stationsUrl = `../lines/stations/${line}.json`;
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

