(async function () {
  const url =
    "https://api.themoviedb.org/3/trending/all/day?api_key=c9fac173689f5f01ba1b0420f66d7093";
  /*   const options = {
    method: "GET",
    headers: {},
  }; */
  try {
    const response = await fetch(url);
    const res = await response.json();
    const image = document.getElementById("images");
    const result = res.results;

    cartona = ``;
    result.forEach((show) => {
      cartona += `
            <div class="col-md-3">
          <div class="position-relative card">
            <img
              src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
              alt=""
              width="100%"
            />
            <div class="layer">
                <p>Rate: ${show.vote_average.toFixed(1)}</p>
                <i class="fa-regular fa-circle-play"></i>
                <p>dfd.dd</p>
            </div>
          </div>
        </div>
        `;
    });
    image.innerHTML = cartona;
    const cards = document.querySelectorAll(".card");
    const pop = document.querySelector(".pop-up");

    cards.forEach((card) => {
      let icon = card.childNodes[3];

      icon.addEventListener("click", () => {
        showPop(pop, result, card);
      });
    });
    let close = document.getElementById("close");
    close.addEventListener("click", () => {
      closePop(pop);
    });
  } catch (error) {
    console.error(error);
  }
})();

function showPop(pop, result, card) {
  let selectedshow = {};
  let image = pop.childNodes[1].childNodes[1].childNodes[1];
  let title = pop.childNodes[1].childNodes[3].childNodes[1];
  let type = pop.childNodes[1].childNodes[3].childNodes[3].childNodes[1];
  let stars = pop.childNodes[1].childNodes[3].childNodes[3].childNodes[3];
  let rate = pop.childNodes[1].childNodes[3].childNodes[3].childNodes[5];
  let overview = pop.childNodes[1].childNodes[3].childNodes[5];

  result.forEach((show) => {
    if (card.childNodes[1].src.includes(show.poster_path)) {
      selectedshow = show;
    }
  });

  image.src = `https://image.tmdb.org/t/p/w500/${selectedshow.poster_path}`;
  title.innerHTML = selectedshow.title || selectedshow.name;
  type.innerHTML = selectedshow.media_type;
  stars.innerHTML = showStars(selectedshow.vote_average.toFixed());
  rate.innerHTML = selectedshow.vote_average.toFixed(1);
  overview.innerHTML = selectedshow.overview;
  pop.style.display = "flex";
}

function closePop(pop) {
  pop.style.display = "none";
}

function showStars(rate) {
  let cartona = "";
  for (let i = 1; i <= 10; i += 2) {
    if (rate > i) {
      cartona += `<i class="fa-solid fa-star"></i>`;
    } else if (rate == i) {
      cartona += `<i class="fa-regular fa-star-half-stroke"></i>`;
    } else {
      cartona += `<i class="fa-regular fa-star"></i>`;
    }
  }
  return cartona;
}
