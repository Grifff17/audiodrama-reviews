document.addEventListener("DOMContentLoaded", displayAudiodramas)

function displayAudiodramas(event) {
    fetch("data.json").then(response => {
        return response.json();
    }).then(data => {
        audiodramas = data["audiodramas"]
        console.log(data)

        let audiodramasList = document.createElement('table')
        let listHeader = document.createElement('tr')

        let nameHeader = document.createElement('th')
        nameHeader.appendChild(document.createTextNode("Name"))
        let ratingHeader = document.createElement('th')
        ratingHeader.appendChild(document.createTextNode("Rating"))

        listHeader.appendChild(nameHeader)
        listHeader.appendChild(ratingHeader)
        audiodramasList.appendChild(listHeader)

        audiodramas.forEach(audiodrama => {
            let listItem = document.createElement('tr')

            let name = document.createElement('th')
            name.appendChild(document.createTextNode(audiodrama.name))
            let rating = document.createElement('th')
            rating.appendChild(document.createTextNode(`${audiodrama.rating}/10`))
            
            listItem.appendChild(name)
            listItem.appendChild(rating)
            audiodramasList.appendChild(listItem)
        })

        let main = document.querySelector('main')
        main.appendChild(audiodramasList)
    })
}