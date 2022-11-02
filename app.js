
    //  Dino constructor
    class Dino {
        constructor(species, weight, height, diet, where, when, fact) {
            this.species = species
            this.weight = weight
            this.height = height
            this.diet = diet
            this.where = where
            this.when = when
            this.fact = fact
        }
        
        // Compare methods
        compareDiet(human) {
            return (this.diet == human.diet.toLowerCase() ? "You both have the same diet" :
                                              `and you are a ${human.diet}`)
        }

        compareWeight(human) {
            if (this.weight == human.weight) {
                return "You both weight the same"
                }
            return (this.weight > human.weight ? "Heavier than your weight" : 
                                                 "Lighter than your weight")
        }

        compareHeight(human) {
            if (this.height == human.feet) {
                return "You both have the same height"
                }
            return (this.height > human.feet ? "Taller than you" : "Shorter than you")
        }
    }

    //  Human object
    class Human {
        constructor(name, feet, inches, weight, diet) {
            this.name = name
            this.feet = feet
            this.inches = inches
            this.weight = weight
            this.diet = diet
        }
    }
    
    //  Get Dino data
    (function getDinoData() { 
        let dinosArray = []
        fetch("dino.json").then((response) => response.json()).then((data) => {
        dinosArray.push(data.Dinos)
        dinosArray.map(dinos => dinos.map(dino => {
            let newDino = new Dino(
                dino.species, 
                dino.weight, 
                dino.height,
                dino.diet,
                dino.where,
                dino.when,
                dino.fact
                )
            tilesArray.push(newDino)
        }))
    })})()
    
    // Get Human data from form
    function getHumanData() {
        const name = document.getElementById("name").value
        const feet = document.getElementById("feet").value
        const inches = document.getElementById("inches").value
        const weight = document.getElementById("weight").value
        const diet = document.getElementById("diet").value

        // Form validation
        if (!name || !feet || !inches || !weight || !diet) {
            alert("Please fill the empty fields")
        } else {
            const newHuman = new Human(name, feet, inches, weight, diet)
            tilesArray.splice(4, 0, newHuman)
            renderTiles()
            removeForm()
        } 
    }

    // Generate Tiles for each Dino in Array
    const tilesArray = []

    // Add tiles to DOM
    function renderTiles() {
        let grid = document.getElementById("grid")
        tilesArray.forEach(obj => {
            let div = document.createElement("div")
            if (Object.hasOwn(obj, 'name')) {
                    div.innerHTML = `<h3>${obj.name}</h3>
                                    <img src="images/human.png">`
                } else {
                    div.innerHTML = `<h3>${obj.species}</h3>
                                    <img src="images/${obj.species}.png">
                                    <p>${obj.fact}</p>`
                                    div.style.cursor = "pointer"
                                    showInfo(div, obj)
                }
                div.classList.add("grid-item")
                grid.appendChild(div)
            })
    }

    // Random facts
    function randomFact(dino, humanObj) {
        if (dino.species == "Pigeon") {
            return "All birds are dinosaurs."
        }
        let random = Math.floor(Math.random() * 3)
        if (random == 0) {
            return `${dino.species} lived in ${dino.where} since ${dino.when}`
        } else if (random == 1) {
                return `${dino.species} enjoys a ${dino.diet} diet, ${dino.compareDiet(humanObj)}`
            }
        else return dino.fact
    }

    // Show Dino info card
    function showInfo(el, dino) {
        let humanObj = tilesArray[4]
        let dinoCardEl = document.getElementById("dino-card")
        let dinoTitle = document.getElementById("dino-title")
        let dinoImg = document.getElementById("img-box")
        let dinoProps = document.querySelector(".dino-props")
        let fact = document.getElementById("fact")
        let close = document.querySelector(".close")

        el.addEventListener("click", ()=> {
            dinoCardEl.style.display = "block"
            dinoTitle.innerHTML = dino.species
            // Dinos info
            if (dino.species != "Pigeon") { 
                    dinoImg.innerHTML = `<img id="dino-img" src="images/${dino.species}.png">`
                    dinoProps.innerHTML = `<li><p>Weight:</p> ${dino.weight} lb, ${dino.compareWeight(humanObj)}</li>
                                          <li><p>Height:</p> ${dino.height} ft, ${dino.compareHeight(humanObj)}</li>`
                                } else {
                    // Pigeon info
                    dinoImg.innerHTML = `<img id="dino-img" src="images/${dino.species}.png">`
                    dinoProps.innerHTML = `<li><p>Weight:</p> ${dino.weight} lb, ${dino.compareWeight(humanObj)}</li>
                                          <li><p>Height:</p> ${dino.height} ft, ${dino.compareHeight(humanObj)}</li>
                                          <li><p>Diet:</p> ${dino.diet}, ${dino.compareDiet(humanObj)}</li>
                                          <li><p>Where:</p> ${dino.where}</li>
                                          <li><p>Whent:</p> ${dino.when}</li>`
                                                    }
            fact.innerHTML = randomFact(dino, humanObj) 
        })
        // Card close button
        close.addEventListener("click", ()=> {
            dinoCardEl.style.display = "none"
        })
    }

    // Remove form from screen
    function removeForm() {
        const form = document.getElementById("dino-compare")
        form.style.display = 'none'
    }

// human data click event
document.getElementById("btn").addEventListener("click", getHumanData)
