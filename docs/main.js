document.addEventListener("DOMContentLoaded", displayAudiodramas)

buttonClickedColor = getComputedStyle(document.documentElement,null).getPropertyValue('--button-clicked-color');
buttonReleasedColor = getComputedStyle(document.documentElement,null).getPropertyValue('--secondary-background-color');

//displays table of audiodramas
function displayAudiodramas(event) {
    fetch("data.json").then(response => {
        return response.json();
    }).then(data => {
        audiodramas = data["audiodramas"]

        //creates buttons for filtering
        let buttons = ""
        for (const tag of data["tags"]) {
            buttons = buttons + `<input type="button" style="background-color: ${buttonReleasedColor}" value="${tag}" onclick="togglefilter('${tag}')" id="tag-${tag}">&nbsp;`
        }
        filterbuttons = document.createElement('p')
        filterbuttons.id = "buttons"
        filterbuttons.innerHTML = buttons

        //sorts audiodramas by rating
        audiodramas.sort(function(a,b) {
            let keyA = parseFloat(a["rating"])
            let keyB = parseFloat(b["rating"])
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
        })

        //creates table and header of table
        let audiodramasList = document.createElement('table')
        audiodramasList.id = "ADtable"

        let listHeader = document.createElement('tr')
        listHeader.id = "tableheader"

        let selectHeader = document.createElement('th')
        selectHeader.appendChild(document.createTextNode(" "))
        selectHeader.style.width = "30px"
        selectHeader.id = "checkboxcell"

        let imageHeader = document.createElement('th')
        imageHeader.appendChild(document.createTextNode("Logo"))
        imageHeader.style.width = "120px"

        let reviewHeader = document.createElement('th')
        reviewHeader.appendChild(document.createTextNode("Review"))
        reviewHeader.style.width = "auto"

        let tagsHeader = document.createElement('th')
        tagsHeader.appendChild(document.createTextNode("Tags"))
        tagsHeader.style.width = "120px"

        listHeader.appendChild(selectHeader)
        listHeader.appendChild(imageHeader)
        listHeader.appendChild(reviewHeader)
        listHeader.appendChild(tagsHeader)
        audiodramasList.appendChild(listHeader)

        //adds audiodramas to table
        audiodramas.forEach(audiodrama => {
            let listItem = document.createElement('tr')
            listItem.id = "tableitem"
            let taglist = ""
            for (const tag of audiodrama["tags"]) {
                taglist = taglist + tag + "<br>"
            }

            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.name = "test"
            checkbox.value = "test"
            let selector = document.createElement("td")
            selector.id = "checkboxcell"
            selector.appendChild(checkbox)

            let image = document.createElement('td')
            let pic = document.createElement('img')
            pic.src = `images/${audiodrama.id}.webp`
            pic.height = "145"
            pic.width = "145"
            image.appendChild(pic)

            let review = document.createElement('td')
            review.appendChild(document.createTextNode(`${audiodrama.name} ${audiodrama.review}`))

            let tags = document.createElement('td')
            tags.innerHTML = taglist
            
            listItem.appendChild(selector)
            listItem.appendChild(image)
            listItem.appendChild(review)
            listItem.appendChild(tags)
            audiodramasList.appendChild(listItem)
        })

        let main = document.getElementById("main")
        main.appendChild(filterbuttons)
        main.appendChild(audiodramasList)
    })
}

//searches for audiodramas by name
function namesearchADs() {
    let input = document.getElementById("namesearch")
    let table = document.getElementById("ADtable")
    let rows = table.getElementsByTagName("tr")
    let search = input.value.toUpperCase()

    //hides items not matching search
    for (i = 1; i < rows.length; i++) {
        val = rows[i].getElementsByTagName("td")[2].textContent
        if (val.toUpperCase().includes(search)) {
            rows[i].style.display = ""
        } else {
            rows[i].style.display = "none"
        }
    }
    //unchecks filter buttons
    buttonp = document.getElementById("buttons")
    buttons = buttonp.getElementsByTagName("input")
    for (const button of buttons) {
        button.style.backgroundColor = buttonReleasedColor
    }

}

//filters audiodramas by filters enabled
function togglefilter(tag) {
    //toggles pressed button
    activebutton = document.getElementById(`tag-${tag}`)
    if (activebutton.style.backgroundColor == buttonReleasedColor) {
        activebutton.style.backgroundColor = buttonClickedColor
    } else {
        activebutton.style.backgroundColor = buttonReleasedColor
    }

    //gets list of active filters
    let enabledtags = []
    buttonp = document.getElementById("buttons")
    buttons = buttonp.getElementsByTagName("input")
    for (const button of buttons) {
        if (button.style.backgroundColor == buttonClickedColor) {
            enabledtags.push(button.value)
        }
    }

    //hides audiodramas that do not match active filters
    let table = document.getElementById("ADtable")
    let rows = table.getElementsByTagName("tr")
    for (i = 1; i < rows.length; i++) {
        val = rows[i].getElementsByTagName("td")[3].textContent
        let valid = true
        for (const tag of enabledtags) {
            if (!val.includes(tag)) {
                valid = false
            }
        }
        if (valid) {
            rows[i].style.display = ""
        } else {
            rows[i].style.display = "none"
        }
    }

    //clears text search box
    document.getElementById("namesearch").value = ""
}

//copies all selected audiodrama descriptions to clipboard
function copyselected() {
    let table = document.getElementById("ADtable")
    let rows = table.getElementsByTagName("tr")

    copymessage = ""
    for (i = 1; i < rows.length; i++) {
        val = rows[i].querySelector("input").checked
        if (val) {
            copymessage = copymessage + rows[i].getElementsByTagName("td")[2].textContent + "\n\n"
        }
    }
    copymessage = copymessage + "For more recommendations, check out https://grifff17.github.io/audiodrama-reviews/"
    navigator.clipboard.writeText(copymessage)
}
