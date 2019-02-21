//create a function to generate img tag
const apiUrl = "http://loadurl-api.azurewebsites.net/api/loadurl";
const createImg = function(src) {
  var img = document.createElement("img");
  img.src = src;
  img.className = "grid-container__thumbnails";
  return img;
};

const createGallery = function (response) {
  //query the grid container div and save it in a variable.
  let thumbnailDiv = document.getElementsByClassName("grid-container")[0];
  response.forEach(imageUrl => {
    // create a thumbnail container div for each photo returned by api
    let thumbnailContainer = document.createElement("div");

    thumbnailContainer.className = "thumbnail-container";
    //create img tag for each photo returned by api
    let imgTag = createImg(imageUrl);

    //append the image tag to  thumbnail container div
    thumbnailContainer.appendChild(imgTag);

    //append thumbnail container div to main grid-container
    thumbnailDiv.appendChild(thumbnailContainer);

    imgTag.addEventListener("click", function () {
      createModel(photo, this);
    });
  });
};

const createSlider = function (response) {
  let carouselDiv = document.getElementsByClassName("carousel-inner")[0];
  let active = false;
  for (imageUrl of response) {
    const carouselContainer = document.createElement("div");
    if (active === false) {
      carouselContainer.className = "item active";
      active = true;
    } else {
      carouselContainer.className = "item";
    }
    let imgTag = createImg(imageUrl);
    carouselContainer.appendChild(imgTag);
    carouselDiv.appendChild(carouselContainer);
  }
};


//this function displays total word count
const totalWordCount = function (response) {
  let totalCountContainer = document.getElementById("total-word-count");
  totalCountContainer.innerHTML = response.totalWordCount;
};

//this function displays a list of words with their counts.
const wordCount = function (responseObject) {
  let wordCountList = document.getElementById("word-count-list");
  wordCountList.innerHTML = "";

  const labels = [];
  const values = [];

  let counter = 1;
  for (let key in responseObject) {
    if (counter <= 10) {
      let value = responseObject[key];
      let listItem = document.createElement("li");
      listItem.className = "word-count-list__item";
      listItem.innerHTML = `${key} - ${value}`;
      wordCountList.appendChild(listItem);
      labels.push(key);
      values.push(value);
      counter++;
    } else break;
  }

  wordCountChart(labels, values);
};


const wordCountChart = function (labels, values) {
  const ctx = document.getElementById("word-count-chart").getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Counts',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(155, 159, 14, 0.2)',
          'rgba(255, 155, 64, 0.2)',
          'rgba(115, 159, 34, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(155, 159, 14, 1)',
          'rgba(255, 155, 64, 1)',
          'rgba(115, 159, 34, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//This function will remove existing images from gallery
function removeChildElements(parentDiv) {
  //run a loop to remove child nodes
  while (parentDiv.hasChildNodes()) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
}

//This is the main function that makes fetch calls to provided API

const loadUrl = function(userInput) {
  let url = `${apiUrl}?Url=${userInput}`;

  return fetch(url, {
    method: "GET",
    mode: "cors",
    origin: "*",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      createGallery(response.imageUrls);
      //createSlider(response.imageUrls);
      totalWordCount(response);
      wordCount(response.wordCount);
    })
    .catch(error => {
      console.log("error", error);
    });
};

//handle User Input or search query
let inputTag = document.getElementsByClassName("seacrh-form__input")[0];
let inputBtn = document.getElementsByClassName("search-form__btn")[0];

inputBtn.addEventListener("click", e => {
  e.preventDefault();
  let thumbnailDiv = document.getElementsByClassName("grid-container")[0];

  removeChildElements(thumbnailDiv);
  let searchInput = inputTag.value;
  loadUrl(searchInput);
});
