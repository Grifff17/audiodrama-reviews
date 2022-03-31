document.addEventListener("DOMContentLoaded", displayAudiodramas)

//displays table of audiodramas
function displayAudiodramas(event) {
    fetch("data.json").then(response => {
        return response.json();
    }).then(data => {
        audiodramas = data["audiodramas"]

        //creates buttons for filtering
        let buttons = ""
        for (const tag of data["tags"]) {
            buttons = buttons + `<input type="button" style="background-color: gray" value="${tag}" onclick="togglefilter('${tag}')" id="tag-${tag}">`
        }
        filterbuttons = document.createElement('p')
        filterbuttons.id = "buttons"
        filterbuttons.innerHTML = buttons

        //sorts audiodramas by rating
        audiodramas.sort(function(a,b) {
            let keyA = parseInt(a["rating"])
            let keyB = parseInt(b["rating"])
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
        selectHeader.appendChild(document.createTextNode("Select"))
        selectHeader.style.width = "5%"
        let nameHeader = document.createElement('th')
        nameHeader.appendChild(document.createTextNode("Name"))
        nameHeader.style.width = "10%"
        let reviewHeader = document.createElement('th')
        reviewHeader.appendChild(document.createTextNode("Review"))
        reviewHeader.style.width = "69%"
        let ratingHeader = document.createElement('th')
        ratingHeader.appendChild(document.createTextNode("Rating"))
        ratingHeader.style.width = "6%"
        let tagsHeader = document.createElement('th')
        tagsHeader.appendChild(document.createTextNode("Tags"))
        tagsHeader.style.width = "10%"

        listHeader.appendChild(selectHeader)
        listHeader.appendChild(nameHeader)
        listHeader.appendChild(reviewHeader)
        listHeader.appendChild(ratingHeader)
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
            checkbox.id = `ad${audiodrama["id"]}`
            let selector = document.createElement("td")
            selector.appendChild(checkbox)
            let name = document.createElement('td')
            let boldname = document.createElement("b")
            boldname.appendChild(document.createTextNode(audiodrama.name))
            name.appendChild(boldname)
            let review = document.createElement('td')
            review.appendChild(document.createTextNode(`${audiodrama.name}${audiodrama.review}`))
            let rating = document.createElement('td')
            rating.appendChild(document.createTextNode(`${audiodrama.rating}/10`))
            let tags = document.createElement('td')
            tags.innerHTML = taglist
            
            listItem.appendChild(selector)
            listItem.appendChild(name)
            listItem.appendChild(review)
            listItem.appendChild(rating)
            listItem.appendChild(tags)
            audiodramasList.appendChild(listItem)
        })

        let main = document.querySelector('main')
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
        val = rows[i].getElementsByTagName("td")[1].textContent
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
        button.style.backgroundColor = "gray"
    }

}

//filters audiodramas by filters enabled
function togglefilter(tag) {
    //toggles pressed button
    activebutton = document.getElementById(`tag-${tag}`)
    if (activebutton.style.backgroundColor == "gray") {
        activebutton.style.backgroundColor = "blue"
    } else {
        activebutton.style.backgroundColor = "gray"
    }

    //gets list of active filters
    let enabledtags = []
    buttonp = document.getElementById("buttons")
    buttons = buttonp.getElementsByTagName("input")
    for (const button of buttons) {
        if (button.style.backgroundColor == "blue") {
            enabledtags.push(button.value)
        }
    }

    //hides audiodramas that do not match active filters
    let table = document.getElementById("ADtable")
    let rows = table.getElementsByTagName("tr")
    for (i = 1; i < rows.length; i++) {
        val = rows[i].getElementsByTagName("td")[4].textContent
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

//copies all selected audiodrama descriptions to clipboard with markup
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
    navigator.clipboard.writeText(copymessage)
}
