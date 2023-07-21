// injectData.js
/*
function injectDataIntoTemplate(data) {
    const fullNameElement = document.getElementById("svgfullname");
    const idNumberElement = document.getElementById("svgidnumber");
    const dobElement = document.getElementById("svgdob");
    const pictureElement = document.getElementById("picture");
    const qrCodeElement = document.getElementById("qrcode");

    fullNameElement.textContent = data.name + " " + data.last_name;
    idNumberElement.textContent = data.driver_license;
    dobElement.textContent = data.date_of_birth;

    pictureElement.setAttribute("xlink:href", data.avatar);

    // Create the QR code and add it to the qrcode element
    const qrCode = new QRCode(qrCodeElement, {
        text: data.id,
        width: 180,
        height: 180,
    });
}

// Fetch the data from the data.json file
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        // Assuming there is only one result in the data.json file
        const personData = data.results[0];
        injectDataIntoTemplate(personData);
    })
    .catch((error) => {
        console.error("Error fetching or parsing JSON:", error);
    });*/


    // injectData.js
async function injectDataIntoTemplate(data) {
    const fullNameElement = document.getElementById("svgfullname");
    const idNumberElement = document.getElementById("svgidnumber");
    const dobElement = document.getElementById("svgdob");
    const pictureElement = document.getElementById("picture");
    const qrCodeElement = document.getElementById("qrcode");

    fullNameElement.textContent = data.name + " " + data.last_name;
    idNumberElement.textContent = data.driver_license;
    dobElement.textContent = data.date_of_birth;

    pictureElement.setAttribute("xlink:href", data.avatar);

    // Create the QR code and add it to the qrcode element
    const writer = new ZXing.BarcodeFormat.QR_CODE.Writer();
    let matrix = writer.encode(data.id, ZXing.BarcodeFormat.QR_CODE, 180, 180);
    let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let svgMatrix = new ZXing.BrowserSvgCodeWriter().createDomMatrix(matrix)
    svgElement.appendChild(svgMatrix);
    qrCodeElement.appendChild(svgElement);
}

// Fetch the data from the data.json file
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        // Assuming there is only one result in the data.json file
        const personData = data.results[0];
        injectDataIntoTemplate(personData);
    })
    .catch((error) => {
        console.error("Error fetching or parsing JSON:", error);
    });
