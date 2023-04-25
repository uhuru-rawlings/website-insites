const getWebsiteURL = () => {
    let target = document.getElementById("website_url");

    if(target.value.trim() === ""){
        document.getElementById("errors").innerHTML = "<div class='alert alert-danger'>Website URL cannot be null, please provide the URL.</div>"
        return false;
    }else{
        localStorage.setItem("websiteURL", target.value.trim());
    }
}