document.addEventListener("DOMContentLoaded", function(){





  let age = parseInt(prompt("Введите ваш возраст"));

  const notif = document.getElementById("ageNotification");

  function showNotification(text) {
    notif.textContent = text;
    notif.classList.add("show");

    setTimeout(() => {
      notif.classList.remove("show");
    }, 3000);
  }

  if (!isNaN(age)) {

    if (age >= 18){
      showNotification("Доступ разрешён");
    } else {
      showNotification("Вам меньше 18");
    }

  } else {
    showNotification("Возраст не введен");
  }

  if (!isNaN(age)) {
    console.log("Возраст");
    if (age >= 18){
      console.log("Совершеннолетний");} 
    else {
      console.log("Несовершеннолетний");}
  } 
    else {
      console.log("Возраст не введен");}


    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1
    ///ПАРАЛАКС///
    window.addEventListener('scroll', e => {
    document.body.style.cssText=`--scrollTop: ${this.scrollY}px`})


  const section = document.querySelector(".sec1");

  section.addEventListener("mousemove", (e) => {
      const rect = section.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

    section.style.setProperty("--x", x + "px");
    section.style.setProperty("--y", y + "px");
  });


  const swapimg = document.querySelector(".image1");
  section.addEventListener("mouseenter", () => {
    swapimg.style.opacity = "1";
  });

  section.addEventListener("mouseleave", () => {
    swapimg.style.opacity = "0";
  });








    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2
 
    const fishes = document.querySelectorAll(".fish");
    const aquarium = document.getElementById("aquarium");const bubbles = document.querySelectorAll(".bubble");
    const result = document.getElementById("result");
    const restartBtn = document.getElementById("restart");


    let fishesInAquarium = 0;
    let bubblesLeft = bubbles.length;

    
    // случайное направление + скорость
fishes.forEach(fish => {
  setRandomDirection(fish);
  setRandomSpeed(fish);

  // каждые 3–6 сек меняет направление
  setInterval(() => {
    if (!fish.classList.contains("dragging") && !fish.classList.contains("in")) {
      changeDirection(fish);
    }
  }, Math.random() * 3000 + 3000);
});

function setRandomDirection(fish) {
  const dir = Math.random() > 0.5 ? 1 : -1;
  fish.style.setProperty('--dir', dir);
}

function changeDirection(fish) {
  const current = getComputedStyle(fish).getPropertyValue('--dir');
  fish.style.setProperty('--dir', current == 1 ? -1 : 1);
}

function setRandomSpeed(fish) {
  const duration = (Math.random() * 3 + 3).toFixed(2); // 3–6 сек
  fish.style.animationDuration = duration + "s";
}


    fishes.forEach(fish => {
      fish.addEventListener("dragstart", () => {
        fish.classList.add("dragging");
      });
      
      fish.addEventListener("dragend", () => {
        fish.classList.remove("dragging");
      });
    });

    aquarium.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    aquarium.addEventListener("drop", (e) => {
      const dragging = document.querySelector(".dragging");

      if (dragging && !dragging.classList.contains("in")) {

        const rect = aquarium.getBoundingClientRect();
        // координаты внутри аквариума
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const fishWidth = dragging.offsetWidth;
        const fishHeight = dragging.offsetHeight;

      
        x = Math.max(0, Math.min(x, rect.width - fishWidth));
        y = Math.max(0, Math.min(y, rect.height - fishHeight));

        dragging.style.position = "absolute";
        dragging.style.left = x + "px";
        dragging.style.top = y + "px";

        aquarium.appendChild(dragging);
        dragging.classList.add("in");

        fishesInAquarium++;

        checkStartCleaning();
      }
    });


    // мобилка дроп

    let activeFish = null;


    document.querySelectorAll('.fish').forEach(fish => {

      fish.addEventListener('touchstart', (e) => {
        activeFish = fish;
        fish.classList.add('dragging');
      });


      fish.addEventListener('touchmove', (e) => {

        if (!activeFish) return;
        const touch = e.touches[0];

        activeFish.style.position = "absolute";
        activeFish.style.left = touch.clientX - 40 + "px";
        activeFish.style.top = touch.clientY - 40 + "px";  
      });

      fish.addEventListener('touchend', (e) => {
        if (!activeFish) return;
  
        const aquarium = document.getElementById("aquarium");
        const rect = aquarium.getBoundingClientRect();
        const touch = e.changedTouches[0];

        if (
          touch.clientX > rect.left &&
          touch.clientX < rect.right &&
          touch.clientY > rect.top &&
          touch.clientY < rect.bottom

        ) {
          aquarium.appendChild(activeFish);
          activeFish.classList.add("in");
        }

        activeFish.classList.remove('dragging');
        activeFish = null;
      });

    });


    function checkStartCleaning() {
      if (fishesInAquarium === fishes.length) {
        result.textContent = "Очисти аквариум (кликай по пузырькам)";
      }
    }

    bubbles.forEach(bubble => {
      bubble.addEventListener("click", () => {
        if (fishesInAquarium !== fishes.length) return;

        bubble.remove();
        bubblesLeft--;

        if (bubblesLeft === 0) {
          result.textContent = "Спасибо за помощь!";
        }
      });
    });


    /* рестарт *///////////////////////////////////////////////////////////////////////////////////////
    window.addEventListener("load", () => {
      fishes.forEach(fish => {
        const rect = fish.getBoundingClientRect();
        const parentRect = document.querySelector(".scene").getBoundingClientRect();
        fish.dataset.startLeft = rect.left - parentRect.left;
        fish.dataset.startTop = rect.top - parentRect.top;
      });
    });

    window.addEventListener("load", () => {
      bubbles.forEach(bubble => {
        const rect = bubble.getBoundingClientRect();
        const parentRect = aquarium.getBoundingClientRect(); 
        bubble.dataset.startLeft = rect.left - parentRect.left;
        bubble.dataset.startTop = rect.top - parentRect.top;
      });
    });


    restartBtn.addEventListener("click", () => {
      fishes.forEach(fish => {
        fish.classList.remove("in", "dragging");
        fish.style.position = "absolute";
        fish.style.left = fish.dataset.startLeft + "px";
        fish.style.top = fish.dataset.startTop + "px";
        document.querySelector(".scene").appendChild(fish);
      });

      // пузырьки
      bubbles.forEach(bubble => {
        bubble.style.position = "absolute";
        bubble.style.left = bubble.dataset.startLeft + "px";
        bubble.style.top = bubble.dataset.startTop + "px";
        aquarium.appendChild(bubble);
      });

      
      fishesInAquarium = 0;
      bubblesLeft = bubbles.length;

      
      result.textContent = "";
    });
















    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3
    const GAME_NODE = document.querySelector("#game-board");
    const WINNING_TEXT = document.querySelector("#victory");
    const START_BUTTON = document.querySelector("#new-game-button");

    const IMAGES = [
      "img/lentoh1.png",
      "img/cardi1.png",
      "img/glou1.png",
      "img/scal1.png",
      "img/ptero1.png",
    ];

    const CARDS_AMOUNT = 10;
    let openedCards = [];
    let lockBoard = false;
    let memoryText;

    START_BUTTON.addEventListener("click", startGame);

    function startGame() {
      GAME_NODE.innerHTML = "";
      WINNING_TEXT.textContent = "";
      openedCards = [];
      lockBoard = false;

      const cards = generatePairs(IMAGES);

      cards.forEach((img, index) => {
        
        if (index === 5) {
          const text = document.createElement("div");
          text.className = "memorytext";
          text.textContent = "Найди пару";
          
        memoryText = text;
        GAME_NODE.appendChild(text);}
      
      createCard(img);});

      const allCards = document.querySelectorAll(".card");
      allCards.forEach(c => c.classList.add("visible"));


      setTimeout(() => {
        allCards.forEach(c => c.classList.remove("visible"));
      }, 1000);}

      function generatePairs(arr) {
        const pairs = [...arr, ...arr];
        return pairs.sort(() => Math.random() - 0.5);
      }

      function createCard(image) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.image = image;

        card.innerHTML = `
        <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">
        <img src="${image}" />
        </div>
        </div>
        `;

        card.addEventListener("click", () => handleClick(card));

        GAME_NODE.appendChild(card);
      }

      function handleClick(card) {
        if (lockBoard) return;
        if (card.classList.contains("visible")) return;

        card.classList.add("visible");
        openedCards.push(card);

        if (openedCards.length === 2) {
          checkMatch();
        }
      }

      function checkMatch() {
        lockBoard = true;

        const [card1, card2] = openedCards;
        if (card1.dataset.image === card2.dataset.image) {
          openedCards = [];
          lockBoard = false;
          checkVictory();
        } else {
          setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");
            openedCards = [];
            lockBoard = false;
          }, 700);
        }
      }

      function checkVictory() {
        const visibleCards = document.querySelectorAll(".card.visible");
        
        if (visibleCards.length === CARDS_AMOUNT) {
          WINNING_TEXT.textContent = "";
          memoryText.textContent = "Поздравляю, все пары найдены!";
        }
}
      
    
      startGame();
    


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4
  const fish = document.getElementById('fish3');
  const maxRotateX = 40; 
  const maxRotateY = 10; 
  const activeRadius = 700;


  document.addEventListener('mousemove', (e) => {
    const rect = fish.getBoundingClientRect();

    const fishX = rect.left + rect.width / 2;
    const fishY = rect.top + rect.height / 2;

    const deltaX = e.clientX - fishX;
    const deltaY = e.clientY - fishY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance > activeRadius) {
      fish.style.transform = 'rotateX(0) rotateY(0) scaleX(1)';
      return;
    }


    const percentX = deltaX / activeRadius;
    const percentY = -deltaY / activeRadius;

    const rotateY = -percentX * maxRotateY;

    const rotateX = percentY * maxRotateX;

    const flip = deltaX > 0 ? -1 : 1;

    fish.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scaleX(${flip})
    `;
  });






  const form = document.getElementById('feed');
  const notification = document.getElementById('Notification');

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim() !== '') {
        field.classList.add('filled');
      } 
      else {
        field.classList.remove('filled');
      }
    });
  });


  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Показ уведомления
    notification.style.display = 'block';

    setTimeout(() => {
      notification.style.display = 'none';
    }, 4000);


  });




})