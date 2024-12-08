async function save()
{
    sessionStorage.setItem("selectValueMain", document.getElementById("Color").value)
    let checkboxValues = ""
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    for(i=0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
        {
            checkboxValues+='1'
        }
        else
        {
            checkboxValues+='0'
        }
    }
    sessionStorage.setItem("CheckboxValues", checkboxValues)
}
  
async function set()
{
    const selectValue = sessionStorage.getItem("selectValueMain")
    if(selectValue) {

        document.getElementById("Color").value = selectValue
    }
    const checkboxValues = sessionStorage.getItem("CheckboxValues")
    if(checkboxValues)
    {
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        for(i=0; i < checkboxes.length; i++)
        {
            if(checkboxValues[i] == 1)
            {
                document.getElementById(checkboxes[i].id).checked = true
            }
        }
    }
}

async function getCat()
{
    let catUrl = "https://cataas.com/cat/"
    if(document.getElementById("Color").value != "any")
    {
        catUrl += `${document.getElementById("Color").value},`
    }
    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    for(i=0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
        {
            catUrl += `${checkboxes[i].value},`
        }
    }
    catUrl = catUrl.slice(0, -1);
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

