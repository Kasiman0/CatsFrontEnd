async function save()
{
    sessionStorage.setItem("text", document.getElementById("text").value)
    sessionStorage.setItem("selectValueGifs", document.getElementById("filter").value)
}
  
async function set()
{
    const textValue = sessionStorage.getItem("text")
    if(textValue) {

        document.getElementById("text").value = textValue
    }
    const selectValue = sessionStorage.getItem("selectValueGifs")
    if(selectValue) {

        document.getElementById("filter").value = selectValue
    }
}

async function getCat()
{
    let catUrl = "https://cataas.com/cat/gif"
    if(document.getElementById("text").value)
    {
        catUrl += `/says/${document.getElementById("text").value}`
    }
    if(document.getElementById("filter").value != "no")
    {
        catUrl += `?filter=${document.getElementById("filter").value}`
    }
    if(catUrl.search("says") != -1)
    {
        if (catUrl.search("filter") != -1)
        {
            catUrl += "&fontColor=orange"
        }
        else
        {
            catUrl += "?fontColor=orange"
        }
    }
    await loadPic(catUrl)
    save()
}

async function loadPic(catUrl) {
    document.getElementById("card").style.opacity = 0
    try
    {
        let response = await fetch(catUrl)
        if(response.status != 200) {throw new Error("No cat found response")}
        const imageBlob = await response.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob);

        document.getElementById("catPic").src = imageObjectURL
        document.getElementById("cardText").innerHTML = "Here's your cat!"
    }
    catch(err)
    {
        document.getElementById("catPic").src = "../Img/catError.jpg"
        console.log(err)
        document.getElementById("cardText").innerHTML = "Sorry, cat not found :("
    }
    document.getElementById("card").style.opacity = 1
}

async function loadPopup()
{
    document.getElementById("overlay").style.display = "block"
    document.getElementById("popup").style.display = "block"
}

async function closePopup()
{
    document.getElementById("overlay").style.display = "none"
    document.getElementById("popup").style.display = "none"
}

set()