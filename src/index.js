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

                // Add an event listener to each movie card
                filmCard.addEventListener('click', () => {
               
                    const allFilmCards = document.querySelectorAll('.card-wrap');
                    allFilmCards.forEach((card) => {
                    card.style.display = 'none';  // Hides all movie card
                
                });

                // Displays the clicked movie card
                filmCard.style.display = 'block';
             });

            });
        })
    }

    // Function to create a card for a film
    function createFilmCard(film){

    //elements to be created and added to the DOM
    // div element class "card-wrap"
    const cardWrap = document.createElement("div");
    cardWrap.className = "card-wrap";

    // div element class "card"
    const card = document.createElement("div");
    card.className = "card";

    // div element class "card-content z-index"
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

    let totalTicket = film.capacity;
    let ticketSold = film.tickets_sold;
    const availTicket = totalTicket - ticketSold;
    if (availTicket>0) {
        readMoreBtn.textContent = `${availTicket} available tickets`;
    } else {
        readMoreBtn.textContent = `SOLD OUT!`;
        readMoreBtn.style.pointerEvents = "none"; // Disable button if sold out
    }

    // Add a click event listener to the "Buy Ticket" button
    readMoreBtn.addEventListener("click", (event) => {
        event.preventDefault();
  
        // Check if tickets are available
        if (availTicket > 0) {
          // Update the available tickets on the frontend
          totalTicket++;


          // Make a request to persist the updated number of tickets_sold
          fetch(`http://localhost:3000/films/${film.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_sold: totalTicket }),
          })
          .then((res) => res.json())
          .then((data) => {
            // Handle the response if needed
            data.forEach(filmx => {
                // Update the button text
                if (availTicket > 0) {
                    readMoreBtn.textContent = `${filmx.capacity-filmx.tickets_sold} available tickets`;
                  } else {
                    readMoreBtn.textContent = `SOLD OUT!`;
                    readMoreBtn.style.pointerEvents = "none"; // Disable button if sold out
            }
            })
          })

            
        }
      });
    

    // Append the elements to their respective parent elements
    cardContent.appendChild(iconImg);
    cardContent.appendChild(title);
    cardContent.appendChild(text);
    cardContent.appendChild(readMoreBtn);

    card.appendChild(cardContent);
    cardWrap.appendChild(card);
    
    return cardWrap;
    }

    getFilms();

}


document.addEventListener("DOMContentLoaded", init)