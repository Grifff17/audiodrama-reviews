document.addEventListener("DOMContentLoaded", displayAudiodramas)

function displayAudiodramas(event) {
    fetch("data.json").then(response => {
        return response.json();
    }).then(data => {
        audiodramas = data["audiodramas"]
        console.log(data)

        let audiodramasList = document.createElement('table')
        let listHeader = document.createElement('tr')
        listHeader.id = "tableheader"

        let nameHeader = document.createElement('th')
        nameHeader.appendChild(document.createTextNode("Name"))
        let reviewHeader = document.createElement('th')
        reviewHeader.appendChild(document.createTextNode("Review"))
        let ratingHeader = document.createElement('th')
        ratingHeader.appendChild(document.createTextNode("Rating"))
        let tagsHeader = document.createElement('th')
        tagsHeader.appendChild(document.createTextNode("Tags"))

        listHeader.appendChild(nameHeader)
        listHeader.appendChild(reviewHeader)
        listHeader.appendChild(ratingHeader)
        listHeader.appendChild(tagsHeader)
        audiodramasList.appendChild(listHeader)

        audiodramas.forEach(audiodrama => {
            let listItem = document.createElement('tr')
            listItem.id = "tableitem"
            let taglist = ""
            for (const tag of audiodrama["tags"]) {
                taglist = taglist + tag + "<br>"
            }

            let name = document.createElement('th')
            name.appendChild(document.createTextNode(audiodrama.name))
            let review = document.createElement('th')
            review.appendChild(document.createTextNode(`${audiodrama.name}${audiodrama.review}`))
            let rating = document.createElement('th')
            rating.appendChild(document.createTextNode(`${audiodrama.rating}/10`))
            let tags = document.createElement('th')
            tags.innerHTML = taglist
            
            listItem.appendChild(name)
            listItem.appendChild(review)
            listItem.appendChild(rating)
            listItem.appendChild(tags)
            audiodramasList.appendChild(listItem)
        })

        let main = document.querySelector('main')
        main.appendChild(audiodramasList)
    })
}