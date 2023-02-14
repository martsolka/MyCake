document.addEventListener('DOMContentLoaded', function (e) {
    document.addEventListener("click", function (e) {
        const targetItem = e.target;
        if (targetItem.closest('.icon-menu')) {
            document.documentElement.classList.toggle('menu-open');
        }

    });

    document.querySelector('.actions__link.link-account').addEventListener("click", function (e) {
        document.querySelector('.dropdown').classList.toggle('open');
    });

    const heroTagsSublist = document.querySelector('.tags__item.tags-sublist');

    if (heroTagsSublist) {
        heroTagsSublist.addEventListener("click", function (e) {
            heroTagsSublist.classList.toggle('open');
        });
    }

    const navLinks = document.querySelectorAll('.menu__link');
    const currentPageURL = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentPageURL) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    for (let i of
        [
            { selector: ".hero__carousel > .swiper", slides_per_view: 5, space_between: 20 },
            { selector: ".cakes > .swiper", slides_per_view: 5, space_between: 18 },
            { selector: ".cupcakes > .swiper", slides_per_view: 5, space_between: 18 },
            { selector: ".best-confectioners > .swiper", slides_per_view: 'auto', space_between: 24 },
            { selector: ".articles > .swiper", slides_per_view: 'auto', space_between: 18 },
            { selector: ".confectioner__products-slider", slides_per_view: 4, space_between: 10 },
            { selector: ".other-products > .swiper", slides_per_view: 5, space_between: 18 },
            { selector: ".similar-products > .swiper", slides_per_view: 5, space_between: 18 },
        ]) {
        new Swiper(i.selector, {
            slidesPerView: i.slides_per_view,
            spaceBetween: i.space_between,
            autoHeight: true,
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
            }
        });
    }

    const filterTabs = document.querySelectorAll('.filter__tabs-item');
    const products = document.querySelectorAll('.desserts__grid-item');
    let selectedFilters = [];

    filterTabs.forEach(filterTab => {
        filterTab.addEventListener('click', event => {
            const filter = event.currentTarget.dataset.filter;

            if (selectedFilters.includes(filter)) {
                selectedFilters = selectedFilters.filter(selectedFilter => selectedFilter !== filter);
                event.currentTarget.classList.remove('filter__tabs-item--active');
            } else {
                selectedFilters.push(filter);
                event.currentTarget.classList.add('filter__tabs-item--active');
            }

            products.forEach(product => {
                product.addEventListener("transitionend", function () {
                    if (product.classList.contains("desserts__grid-item--hidden")) {
                        product.style.display = "none";
                    }
                });

                if (selectedFilters.length === 0) {
                    product.style.removeProperty("display");
                    setTimeout(() => product.classList.remove('desserts__grid-item--hidden'), 0.001);
                } else if (selectedFilters.some(selectedFilter => product.dataset.category === selectedFilter)) {
                    product.style.removeProperty("display");
                    setTimeout(() => product.classList.remove('desserts__grid-item--hidden'), 0.001);
                } else {
                    product.classList.add('desserts__grid-item--hidden');
                }
            });
        });
    });
});

