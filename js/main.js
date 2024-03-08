window.onload = function () {
    const navbar = document.getElementById('navbar')
    navbar.innerHTML = `
            <li>City Loopers</li>
            <li><a href="../index.html">Home</a></li>
            <li><a href="../status.html"><b>MRT Status</b></a></li>
            <div class="dropdown">
                <button class="dropbtn">Lines 🞃</button>
                <div class="dropdown-content">
                  <a href="./lines/nsl.html">North South Line</a>
                  <a href="./lines/ewl.html">East West Line</a>
                  <a href="./lines/nwl.html">North West Line</a>
                  <a href="./lines/nel.html">North East Line</a>
                  <a href="./lines/sel.html">South East Line</a>
                  <a href="./lines/swl.html">South West Line</a>
                </div>
              </div>`;
}