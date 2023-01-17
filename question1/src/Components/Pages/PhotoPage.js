import voyage from '../../utils/places';

const boucleDest = () => {
  const main = document.querySelector('main');
  // eslint-disable-next-line no-const-assign
  main.innerHTML='';

  const div = document.createElement('div');
  const divContainer = document.createElement('div');
  divContainer.className = "container";
  div.className = "all-destination column justify-content-center";

  divContainer.appendChild(div);

  const buttonPrev = document.createElement('button');
  const buttonAfter = document.createElement('button');
  buttonPrev.innerText = "previous";
  buttonAfter.innerText = "after";

  buttonPrev.dataset.info = "previous";
  buttonAfter.dataset.info = "after";
  buttonAfter.className = "after btn btn-primary max-2 col-3";
  buttonPrev.className = "previous btn btn-secondary max-2 col-3";

  const arrayInfo = voyage();
  console.log(arrayInfo);

  arrayInfo.forEach(element => {
    
    const img = document.createElement('img');
    img.className = `destination-image ${element.name}`;
    img.dataset.num = element.id;
    // img.id = element.id;
    img.src=element.image;
    const text = document.createElement('h2');
    text.innerText = element.name;

    const divInfoVille = document.createElement('div');
    divInfoVille.className = "info-ville text-center col-12";
    divInfoVille.dataset.num = element.id;
    if(element.id === 1){
      divInfoVille.className += ` active`;
    }

    divInfoVille.append(img);
    divInfoVille.append(text);

    div.appendChild(divInfoVille);

  });

  div.appendChild(buttonPrev);
  div.appendChild(buttonAfter);
  main.appendChild(divContainer);

  const button = document.querySelectorAll('button');

  button.forEach((item) => {
    item.addEventListener('click', (elem) => {
      elem.preventDefault();
      const image = document.querySelector('div.all-destination .info-ville.active');
      let numero = parseInt(image.dataset.num,10);
      console.log(numero);
      // eslint-disable-next-line prefer-destructuring
      const info = item.dataset.info;
      console.log("click");
      console.log(info);


    if(info === "previous"){ 
       if(numero === 1) {
        image.classList.remove("active");
        numero = voyage().length;
        const imageAddActive = document.querySelector(`div.info-ville[data-num="${numero}"]`);
        imageAddActive.classList.add("active");
        return;
       } 
      image.classList.remove("active");
      // eslint-disable-next-line operator-assignment
      numero = numero - 1;
      const imageAddActive = document.querySelector(`div.info-ville[data-num="${numero}"]`);
      imageAddActive.classList.add("active");
     }

    if(info === "after") {
      if(numero === voyage().length) {
        image.classList.remove("active");
        numero = 1;
        // const imageAddActive = document.querySelector(`img#${numero}`);
        const imageAddActive = document.querySelector(`div.info-ville[data-num="${numero}"]`);
        imageAddActive.classList.add("active");
        return;
      } 
      image.classList.remove("active");
      numero += 1;
      const imageAddActive = document.querySelector(`div.info-ville[data-num="${numero}"]`);
      imageAddActive.classList.add("active");
     }

    })
  })



}

const PhotoPage = () => {
  
  boucleDest();

};



export default PhotoPage;
