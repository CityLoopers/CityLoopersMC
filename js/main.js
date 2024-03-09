window.onload = function () {
    const navbar = document.getElementById('navbar')
    const currentPage = window.location.pathname.split('/').pop().split('.').shift(); // Get the name of the current page
    const isLinePage = currentPage.startsWith('line'); // Check if the page is a line page
    const lines = ['north-south', 'east-west', 'north-west', 'north-east', 'south-east', 'south-west']; // Define the available lines
    let nav = `
            <li>City Loopers</li>
            <li><a href="${isLinePage ? './' : '../'}index.html" ${currentPage === 'index' ? 'style="font-weight: bold"' : ''}>Home</a></li>
            <li><a href="${isLinePage ? './' : '../'}status.html" ${currentPage === 'status' ? 'style="font-weight: bold"' : ''}>MRT Status</a></li>
            <div class="dropdown">
                <button class="dropbtn">Lines 🞃</button>
                <div class="dropdown-content">
    `; // Start building the HTML for the navigation bar
    for (let i = 0; i < lines.length; i++) { // Iterate over each line
        const line = lines[i];
        const lineName = line.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Get the full line name
        nav += `<a href="${isLinePage ? './' : '../'}lines/${line}.html"`; // Add an 'a' element for the line, using the correct relative link
        if (!isLinePage && line === currentPage) { // If the current page is not a line page and the line is the same as the current page, make the 'a' element bold
            nav += ' style="font-weight: bold"'
        }
        nav += `>${lineName} Line</a>`; // Add the full line name to the 'a' element
    }
    nav += `
                </div>
              </div>`; // Close the 'dropdown-content' div and the 'dropdown' div
    navbar.innerHTML = nav; // Set the 'innerHTML' property of the 'navbar' element to the complete HTML for the navigation bar
}






