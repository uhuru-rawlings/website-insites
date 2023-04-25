const setPageInsites = async () => {
    const url = localStorage.getItem("websiteURL");

    if(url){
        const API_KEY = "AIzaSyCQBP6nmcrgxTou0uax1SYzQRQnDwC2kF0";
        const api_endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}&category=performance&category=accessibility&category=seo&category=pwa&category=best-practices`;
    
        // Send the API request
        document.getElementById("full_page_loader").style.display = "flex";
        
        const response = await fetch(api_endpoint);
        
        // Parse the response JSON and extract the relevant data
        const response_json = await response.json();
    
        const performance = parseFloat(response_json.lighthouseResult.categories.performance.score) * 100;
        const accessibility = parseFloat(response_json.lighthouseResult.categories.accessibility.score) * 100;
        const bestpractices = parseFloat(response_json.lighthouseResult.categories["best-practices"].score) * 100;
        const seo = parseFloat(response_json.lighthouseResult.categories.seo.score) * 100;
        const pwa = parseFloat(response_json.lighthouseResult.categories.pwa.score) * 100;
    
        const fullPageScreenshot = response_json.lighthouseResult.fullPageScreenshot.screenshot.data;

        document.getElementById("performance").innerText = performance;
        document.getElementById("accessibility").innerText = accessibility;
        document.getElementById("seo").innerText = seo;
        document.getElementById("bestpractices").innerText = bestpractices;
        document.getElementById("pwa").innerText = pwa;

        document.getElementById("performance_progressbar").setAttribute("value", performance);
        document.getElementById("accessibility_progressbar").setAttribute("value", accessibility);
        document.getElementById("seo_progressbar").setAttribute("value", seo);
        document.getElementById("bestpractices_progressbar").setAttribute("value", bestpractices);
        document.getElementById("pwa_progressbar").setAttribute("value", pwa);
        document.getElementById("page_url").innerText = url;
        document.getElementById("images_url").src = fullPageScreenshot

        document.getElementById("performance_circle").innerText = performance+"%";
        document.getElementById("accessibility_circle").innerText = accessibility+"%";
        document.getElementById("seo_circle").innerText = seo+"%";
        document.getElementById("bestpractices_circle").innerText = bestpractices+"%";
        document.getElementById("pwa_circle").innerText = pwa+"%";
        
        let circle1 = document.getElementById("performance_circle_border");
        let circle2 = document.getElementById("accessibility_circle_border");
        let circle3 = document.getElementById("seo_circle_border");
        let circle4 = document.getElementById("bestpractices_circle_border");
        let circle5 = document.getElementById("pwa_circle_border");

        let r_arry = [performance,accessibility,seo,bestpractices,pwa]; // results
        let c_arry = [circle1,circle2,circle3,circle4,circle5]; // targets
        for(let i = 0; i < c_arry.length; i++){
            if(r_arry[i] >= 80){
                c_arry[i].setAttribute("style","border: 5px solid #28A745 !important;");
            }else if(r_arry[i] >= 50){
                c_arry[i].setAttribute("style","border: 5px solid #FFC517 !important;");
                '<div class="circle" style="">'
            }else{
                c_arry[i].setAttribute("style","border: 5px solid #DF4857 !important;");
            }
        }

        document.getElementById("full_page_loader").style.display = "none";
    }else{
        // location.replace("index.html");
        // alert("not here");
        window.location.href = "index.html"
    }
}

window.onload = setPageInsites();