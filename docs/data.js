let tags = {
    scifi: "sci-fi",
    fantasy: "fantasy",
    supernatural: "supernatural",
    comedy: "comedy",
    musical: "musical",
    queer: "queer",
    romance: "romance",
    complete: "complete"
}

let audiodramas = [
    {
        id: 1,
        name: "The Strange Case of Starship Iris",
        rating: "10",
        review: " is a sci-fi audiodrama about the crew of a smuggler ship travelling around the universe on the run from the evil human government, trying to solve the mystery of what happened to Starship Iris. It's similar to the TV show Firefly, and one of my all-time favorite audiodramas. It has a very good cast of (almost all queer) characters, which is one of its main strengths. It's also very funny at times, though the plot is serious.",
        tags: [tags[scifi], tags[queer], tags[romance]]
    },

    {
        id: 2,
        name: "Wolf 359",
        rating: "9",
        review: " is a sci-fi audiodrama centered on the crew of a space station all alone in deep space, searching for signals from extra-terrestrial life. It starts out like more of a sci-fi sitcom, but around episode 11, the plot becomes very good, so don't give up after the first few episodes. Wolf 359 is a well-liked, classic audiodrama, and I would recommend it to anyone new to the medium.",
        tags: [tags[scifi], tags[complete]]
    }
]

module.exports = { tags, audiodramas }
