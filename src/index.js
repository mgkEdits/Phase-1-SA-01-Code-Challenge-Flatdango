const init = () => {

    //elements to be got from DOM
    const filmShowing = document.getElementById('film-showing');

    //function to retrieve movies
    function getFilms(){
        //GET request to retrieve character data
        fetch(' http://localhost:3000/films')
        .then(res => res.json())
        .then(data =>{
               
            //get film titles and add them to the  film-showing Element
            filmShowing.innerHTML=" ";
            data.forEach(film => {
                const filmCard = createFilmCard(film);
                filmShowing.appendChild(filmCard);
            });
        })
    }


     // Function to handle the click event on a film card
     function handleFilmCardClick(selectedCard) {
        const cardss= document.querySelectorAll('.card-wrap');
        cardss.forEach(card => {
            if (card === selectedCard) {
                card.style.display = 'block';
            }
        });
    }



    function createFilmCard(film){

    //elements to be created and added to the DOM
    // div element with class "card-wrap"
    const cardWrap = document.createElement("div");
    cardWrap.className = "card-wrap";

    // div element with class "card"
    const card = document.createElement("div");
    card.className = "card";

    // div element with class "card-content z-index"
    const cardContent = document.createElement("div");
    cardContent.className = "card-content z-index";

    // img element for the icon
    const iconImg = document.createElement("img");
    iconImg.className = "icon";
    iconImg.src = film.poster;
    iconImg.alt = "";

    // h3 element for the title
    const title = document.createElement("h3");
    title.className = "title-sm";
    title.textContent = film.title;

    // paragraph element for the text
    const text = document.createElement("p");
    text.className = "text";
    text.textContent = `Show Time: ${film.showtime} ||  Run Time: ${film.runtime}minutes `;

    //  anchor element for the "Read more" button
    const readMoreBtn = document.createElement("a");
    readMoreBtn.href = "";
    readMoreBtn.className = "btn small";
    const availTicket = film.capacity - film.tickets_sold;
    readMoreBtn.textContent = `${availTicket} available tickets`;

    // Append the elements to their respective parent elements
    cardContent.appendChild(iconImg);
    cardContent.appendChild(title);
    cardContent.appendChild(text);
    cardContent.appendChild(readMoreBtn);

    card.appendChild(cardContent);
    cardWrap.appendChild(card);

     // Add a click event listener to the card
     card.addEventListener("click", () => {
        handleFilmCardClick(card)
     });
    
    return cardWrap;
    }

    getFilms();

}


document.addEventListener("DOMContentLoaded", init)