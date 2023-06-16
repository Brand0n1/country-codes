// Get the country code json file
window.onload = fetch('./country-codes.json')
    // Validate the json code
    .then((response) => response.json())
    // Run the logic for the json code
    .then((json) => getRow(json));


function getRow(json) {
    // Get the country code table element
    var countryCodeTable = document.getElementById('country-code-table');
    // Get all the keys in the json file
    var keys = Object.keys(json);

    // Loop through all of the keys in the json array
    for (var i = 0; i < keys.length; i++) {
        // Get the current key (the country)
        var country = keys[i];
        // Get all the data for the country
        var countryData = json[country];


        // Get the country's code
        var countryCode = countryData["Country Code"];
        // Get the country's iso code
        var isoCode = countryData["ISO Code"];
        // Get the country's icon
        var icon = countryData["Icon"];

        // Create a new empty row
        var row = countryCodeTable.insertRow(-1);
        // Create the cells to hold the data
        var countryIcon = row.insertCell(0);
        var countryCell = row.insertCell(1);
        var countryCodeCell = row.insertCell(2);
        var countryISO = row.insertCell(3);

        // Check if this number is even
        if (i % 2 == 0) {
            // Change the background color to be darker
            row.style.backgroundColor = "#868686";
        }

        // Add the data to the proper cells
        countryIcon.innerHTML = icon;
        countryCell.innerHTML = country;
        countryCodeCell.innerHTML = countryCode;
        countryISO.innerHTML = isoCode;

        // Add the proper classes to each cell
        countryIcon.className = "icon";
        countryCell.className = "text";
        countryCodeCell.className = "text";
        countryISO.className = "text";

        // Add an event listener to each cell
        countryIcon.addEventListener("mouseup", copyCell);
        countryIcon.addEventListener("mouseover", cellHover);
        countryIcon.addEventListener("mouseleave", cellLeave);

        countryCell.addEventListener("mouseup", copyCell);
        countryCell.addEventListener("mouseover", cellHover);
        countryCell.addEventListener("mouseleave", cellLeave);

        countryCodeCell.addEventListener("mouseup", copyCell);
        countryCodeCell.addEventListener("mouseover", cellHover);
        countryCodeCell.addEventListener("mouseleave", cellLeave);

        countryISO.addEventListener("mouseup", copyCell);
        countryISO.addEventListener("mouseover", cellHover);
        countryISO.addEventListener("mouseleave", cellLeave);
    }
    // Get the original color for the cell
    var originalColor = "#868686";

    async function copyCell(e) {
        // Get the cell that was clicked on
        var cell = e.target;
        // Get the text that is going to be copied
        var copy = cell.innerHTML
        // Check if the website is secure
        if (window.isSecureContext) {
            // Copy the text to the users clip board
            await navigator.clipboard.writeText(copy.value);
        } else {
            // Create a new text area
            const textarea = document.createElement('textarea');
            // Set the textarea to contain the text that is wanted to be copied
            textarea.value = copy;
            // Move the textarea outside the viewport to make it invisible
            textarea.style.position = 'absolute';
            textarea.style.left = '-99999999px';

            // Add the text area to the page
            document.body.prepend(textarea);

            // highlight the content of the textarea element
            textarea.select();

            try {
                // Attempt to copy the text
                document.execCommand('copy');
            } catch (err) {
                // Catch any errors and throw it to console
                console.log(err);
            } finally {
                // Remove that pesky text area
                textarea.remove();
            }
        }
        console.log(cell.className);
        // Check if the element is an icon
        if (cell.className == 'icon') {
            // Change the font size to be normal with the other font
            cell.style.fontSize = getComputedStyle(document.documentElement)
                .getPropertyValue('--font-size');
            // Change the cell text to be "copied"
            cell.innerHTML = "Copied";
            // Change the text back after ~2 seconds
            setTimeout(() => {
                // Change the text back to normal
                cell.innerHTML = copy;
                // Change the font back to normal
                cell.style.fontSize = getComputedStyle(document.documentElement)
                    .getPropertyValue('--icon-size');
            }, 1000);
            // Nothing left to do, return
            return;
        }
        // Change the cell text to be "copied"
        cell.innerHTML = "Copied";
        // Change the text back after ~2 seconds
        setTimeout(() => {
            // Change the text back to normal
            cell.innerHTML = copy;
        }, 1000);
    }
    function cellHover(e) {
        // Get the cell that was clicked on
        var cell = e.target;
        // Get the original color for the cell
        originalColor = cell.style.backgroundColor;
        // Change the background color of the cell
        cell.style.backgroundColor = "#4d4d4d";
    }
    function cellLeave(e) {
        // Get the cell that was clicked on
        var cell = e.target;
        // Change the background color of the cell
        cell.style.backgroundColor = originalColor;
    }

}