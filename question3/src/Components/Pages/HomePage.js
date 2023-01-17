const HomePage = async () => {
  // const main = document.querySelector('main');
  // loading
  // main.innerHTML = '<img src="">';
  try {
    const response = await fetch('https://places-exam-api.azurewebsites.net/places');
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const destinations = await response.json();

    // eslint-disable-next-line no-use-before-define
    afficherToutesDestinations(destinations);
  } catch (err) {
    console.error('HomePage::error: ', err);
  }

  try {
    const response2 = await fetch('https://places-exam-api.azurewebsites.net/recommended');
    if (!response2.ok) throw new Error(`fetch error : ${response2.status} : ${response2.statusText}`);
    const destinationsRecommander = await response2.json();

    // eslint-disable-next-line no-use-before-define
    afficherDestinationsRecommander(destinationsRecommander);
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

const afficherToutesDestinations = (array) => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  console.log(array);
  let info = '<div class="container"><div class="column text-center justify-content-center"><h2>Toutes les destinations</h2><br>';
  array.forEach((element) => {
    info += `
        <div class="col-3 text-center mx-auto">
        <h4>${element.name}</h4>
        <hr>
        </div>
    `;
  });
  info += '</div></div>';
  main.innerHTML += info;
};

const afficherDestinationsRecommander = (array) => {
  const main = document.querySelector('main');
  console.log(array);
  let info = '<div class="container"><div class="column text-center justify-content-center"><h2>Les destinations recommandées</h2><br>';
  if (array.lenght > 1) {
    array.forEach((element) => {
      info += `
        <div class="col-3 text-center mx-auto">
        <h4>${element.name}</h4>
        <hr>
        </div>
    `;
    });
  } else {
    info += `
        <div class="col-3 text-center mx-auto">
        <h4>${array.name}</h4>
        <hr>
        </div>
    `;
  }

  info += '</div></div>';
  main.innerHTML += info;
};

export default HomePage;
