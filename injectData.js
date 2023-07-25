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
    

/*

    async function injectDataIntoTemplate(data) {
        const fullNameElement = document.getElementById("svgfullname");
        const idNumberElement = document.getElementById("svgidnumber");
        const dobElement = document.getElementById("svgdob");
        const pictureElement = document.getElementById("picture");
    
        fullNameElement.textContent = data.name + " " + data.last_name;
        idNumberElement.textContent = data.driver_license;
        dobElement.textContent = data.date_of_birth;
    
        pictureElement.setAttribute("xlink:href", data.avatar);
    
        // Get the QR code <image> element within the <g id="qrcode"> element
        const qrCodeElement = document.querySelector("#qrcode image");
    
        // Set the QR code image source
        qrCodeElement.setAttribute("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/QR_Code_Model_1_Example.svg/200px-QR_Code_Model_1_Example.svg.png");
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
        });   */
        async function injectDataIntoTemplate(data) {
            const fullNameElement = document.getElementById("svgfullname");
            const idNumberElement = document.getElementById("svgidnumber");
            const dobElement = document.getElementById("svgdob");
            const pictureElement = document.getElementById("picture");
        
            fullNameElement.textContent = data.name + " " + data.last_name;
            idNumberElement.textContent = data.driver_license;
            dobElement.textContent = data.date_of_birth;
        
            pictureElement.setAttribute("xlink:href", data.avatar);
        
            try {
                // Generate the QR code and set the image source
                const qrCodeImage = await generateQRCode(data);
                const qrCodeElement = document.querySelector("#qrcode image");
                qrCodeElement.setAttribute("xlink:href", qrCodeImage);
            } catch (error) {
                console.error("Error generating or updating QR code:", error);
            }
        }
        
        async function generateQRCode(data) {
            const response = await fetch("/generate_qr_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        
            if (!response.ok) {
                throw new Error("Failed to generate QR code. Server returned an error.");
            }
        
            const qrCodeData = await response.json();
        
            if (!qrCodeData || !qrCodeData.image_url) {
                throw new Error("Failed to generate QR code. Server response is invalid.");
            }
        
            return qrCodeData.image_url;
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
        