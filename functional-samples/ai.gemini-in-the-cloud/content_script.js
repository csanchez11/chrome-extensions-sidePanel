  // content script (injected into the page)
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autofill") {
      const dataMap = {
        // Replace with your actual data mapping
        "First Name": "Christopher",
        "Last Name": "Sanchez",
        "Email": "chrissanchez89@gmail.com",
        "LinkedIn Profile": "",
        
        // ... more data mappings
      };
      for (const label in dataMap){
        const element = document.querySelector(`input[aria-label="${label}"]`);
        if (element) {
          element.value = dataMap[label];
          element.blur(); // this sets the value for green house job boards
        }
      }
      sendResponse({ success: true, message: "AutoFill complete" });
    }
  });