const regions = [
    { id: 1, name: "Вінницька", bold: false, towns: [] },
    { id: 2, name: "Волинська", bold: false, towns: [] },
    { id: 3, name: "Дніпропетровська", bold: true, towns: [] },
    { id: 4, name: "Донецька", bold: false, towns: [] },
    { id: 5, name: "Житомирська", bold: false, towns: [] },
    { id: 6, name: "Закарпаття", bold: false, towns: [] },
    { id: 7, name: "Запорізька", bold: false, towns: [] },
    { id: 8, name: "Івано-Франківська", bold: false, towns: [] },
    {
        id: 9, name: "Київська", bold: true, towns: [
            { id: 91, name: "Київ", bold: true },
            { id: 92, name: "Коцюбинське", bold: false },
            { id: 93, name: "Баришівка", bold: false },
            { id: 94, name: "Макарів", bold: false },
            { id: 95, name: "Біла Церква", bold: true },
            { id: 96, name: "Миронівка", bold: false },
            { id: 97, name: "Березань", bold: false },
            { id: 98, name: "Обухів", bold: true },
            { id: 99, name: "Бориспіль", bold: true },
            { id: 910, name: "Переяслав - Хмельницький", bold: false },
            { id: 911, name: "Бородянка", bold: false },
            { id: 912, name: "Прип'ять", bold: false },
            { id: 913, name: "Боярка", bold: false },
            { id: 914, name: "Ржищів", bold: false },
            { id: 915, name: "Бровари", bold: true },
            { id: 916, name: "Рокитне", bold: false },
            { id: 917, name: "Буча", bold: true },
            { id: 918, name: "Сквира", bold: false },
            { id: 919, name: "Васильків", bold: false },
            { id: 920, name: "Славутич", bold: false },
            { id: 921, name: "Вишневе", bold: true },
            { id: 922, name: "Тараща", bold: false },
            { id: 923, name: "Володарка", bold: false },
            { id: 924, name: "Тетіїв", bold: false },
            { id: 925, name: "Вишгород", bold: true },
            { id: 926, name: "Узин", bold: false },
            { id: 927, name: "Глеваха", bold: false },
            { id: 928, name: "Українка", bold: false },
            { id: 929, name: "Гостомель", bold: true },
            { id: 930, name: "Фастів", bold: true },
            { id: 931, name: "Іванків", bold: false },
            { id: 932, name: "Чорнобиль", bold: false },
            { id: 933, name: "Ірпінь", bold: true },
            { id: 934, name: "Яготин", bold: false },
            { id: 935, name: "Кагарлик", bold: false }
        ]
    },
    { id: 10, name: "Кіровоградська", bold: false, towns: [] },
    { id: 11, name: "Крим", bold: false, towns: [] },
    { id: 12, name: "Луганська", bold: false, towns: [] },
    { id: 13, name: "Львівська", bold: true, towns: [] },
    { id: 14, name: "Миколаївська", bold: false, towns: [] },
    { id: 15, name: "Одеська", bold: false, towns: [] },
    { id: 16, name: "Полтавська", bold: true, towns: [] },
    { id: 17, name: "Рівненська", bold: false, towns: [] },
    { id: 18, name: "Сумська", bold: false, towns: [] },
    { id: 19, name: "Тернопільська", bold: false, towns: [] },
    { id: 10, name: "Харківська", bold: true, towns: [] },
    { id: 21, name: "Херсонська", bold: false, towns: [] },
    { id: 22, name: "Хмельницька", bold: false, towns: [] },
    { id: 23, name: "Черкаська", bold: false, towns: [] },
    { id: 24, name: "Чернігівська", bold: true, towns: [] },
    { id: 25, name: "Чернівецька", bold: false, towns: [] }
];

const regionModal = document.querySelector("#region-select-modal");
const regionHeader = regionModal.querySelector(".item-modal__title");
const regionSelector = regionModal.querySelector('.region-selector');
const regionButtons = regionSelector.querySelectorAll(".region-selector__button");

function initRegions() {
    regionHeader.innerText = "Оберіть область";
    regionSelector.innerHTML = `
        <button class="region-selector__button region-selector__button--selected">
            <span>Вся Україна</span>
            <svg class="region-selector__icon">
                <use xlink:href="./img/icons.svg#arrow-next-icon"></use>
            </svg>
        </button>`;
    regions.forEach(function (region) {
        const button = document.createElement('button');
        button.classList.add('region-selector__button');
        if (region.bold) button.classList.add('region-selector__button--bolder');
        button.setAttribute('data-region-id', `${region.id}`)
        button.innerHTML = `
            ${region.name} 
            <svg class="region-selector__icon">
                <use xlink:href="./img/icons.svg#arrow-next-icon"></use>
            </svg>
            `;
        regionSelector.appendChild(button);
        button.addEventListener("click", showTowns);
    });
};

initRegions();

function submitTown(townName) {
    document.querySelectorAll('[data-path="region-select-modal"] > span').forEach(function (button) {
        button.textContent = townName;
    });
    regionModal.querySelector('.item-modal__close-btn').click();
}

function showTowns(e) {
    const currentRegionId = e.target.getAttribute("data-region-id");
    const region = regions.find(region => region.id === parseInt(currentRegionId));

    regionHeader.innerText = "Оберіть місто";
    regionSelector.innerHTML = "";

    const backButton = document.createElement("button");
    backButton.className = "region-selector__button region-selector__button--back";
    backButton.innerHTML = '<svg class="region-selector__icon"><use xlink:href="./img/icons.svg#arrow-next-icon"></use></svg>Повернутися назад';
    backButton.addEventListener("click", function () {
        initRegions();
    });
    regionSelector.appendChild(backButton);

    const currRegionButton = document.createElement("button");
    currRegionButton.className = "region-selector__button region-selector__button--selected";
    const btnText = `Вся ${region.name.toLowerCase()} область`;
    currRegionButton.innerHTML = `${btnText}<svg class="region-selector__icon"><use xlink:href="./img/icons.svg#arrow-next-icon"></use></svg>`;
    currRegionButton.addEventListener("click", function () {
        submitTown(btnText);
    });
    regionSelector.appendChild(currRegionButton);

    region.towns.forEach(function (town) {
        const button = document.createElement('button');
        button.classList.add('region-selector__button');
        if (town.bold) button.classList.add('region-selector__button--bolder');
        button.setAttribute('data-town-id', `${town.id}`)
        button.innerHTML = `
            ${town.name} 
            <svg class="region-selector__icon">
                <use xlink:href="./img/icons.svg#arrow-next-icon"></use>
            </svg>
            `;
        regionSelector.appendChild(button);
        button.addEventListener("click", function () {
            submitTown(town.name);
        });
    });
}