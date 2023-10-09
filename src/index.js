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

            // Add an event listener to the "Buy Ticket" button
            const readMoreBtn = filmCard.querySelector('.btn');
            readMoreBtn.addEventListener('click', (event) => {
               event.preventDefault();
               buyTicket(film, readMoreBtn);
            });

            });
        })
    }

    // Function to create a card for a film
    function createFilmCard(film){

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

      updateTicketButton(film, readMoreBtn);
    
      // Append the elements to their respective parent elements
      cardContent.appendChild(iconImg);
      cardContent.appendChild(title);
      cardContent.appendChild(text);
      cardContent.appendChild(readMoreBtn);

      card.appendChild(cardContent);
      cardWrap.appendChild(card);
    
      return cardWrap;
    }

    // Function to update the "Buy Ticket" button based on available tickets
    function updateTicketButton(film, button) {
        const availTicket = film.capacity - film.tickets_sold;
          if (availTicket > 0) {
            button.textContent = `${availTicket} available tickets`;
            button.style.pointerEvents = 'auto'; // Enable the button
          } else {
            button.textContent = 'SOLD OUT!';
            button.style.pointerEvents = 'none'; // Disable the button if sold out
        }
    }

    // Function to handle the "Buy Ticket" button click
    function buyTicket(film, button) {
       const availTicket = film.capacity - film.tickets_sold;
       if (availTicket > 0) {
          film.tickets_sold++;
          updateTicketButton(film, button);

          // Make a request to persist the updated number of tickets_sold
          fetch(`http://localhost:3000/films/${film.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                },
              body: JSON.stringify({ tickets_sold: film.tickets_sold }),
            })
        
        .catch((error) => {
          console.error('Error updating tickets_sold:', error);
        });
    }
  }



    getFilms();

}


document.addEventListener("DOMContentLoaded", init)