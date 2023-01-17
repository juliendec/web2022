import voyage from '../../utils/places';

const afficherDestinations = () => {
  let destination =  ``;
  voyage().forEach(element => {
    destination +=  `
    <div class="col-md-3 mx-auto">
    <hr>
    <h4>${element.name}</h4>
    </div>
    `;
  });
  return destination;
}

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  main.innerHTML += `
    <div class="container">
      <div class="row text-center">
        <h1>Places to visit !</h1>
        <div class="column text-center justify-content-center">
          ${afficherDestinations()}
        </div>
      </div>
    </div>
  `;

};



export default HomePage;
