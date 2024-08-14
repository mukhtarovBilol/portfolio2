const menu = document.querySelector('.nav__common');
const bars = document.querySelectorAll('.bar');
const nav = document.querySelector(".nav")
const open = document.querySelector(".open")

function toggleMenu() {

    menu.classList.toggle('active');
    open.classList.toggle("active")


    // Анимация бургер-иконки
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.toggle("toggle")
        nav.classList.toggle("active")
    }

}

// swiper

var swiperElements = document.querySelectorAll('.swiper');

if (swiperElements.length > 0) {
    swiperElements.forEach(function (swiperElement) {
        new Swiper(swiperElement, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
            },
        });
    });
}


// swiper

function toggleAnswer(element) {
    var answer = element.querySelector('.answer');
    var isOpen = answer.classList.contains('open');

    if (isOpen) {
        // Закрываем ответ
        answer.style.maxHeight = null;
        answer.classList.remove('open');
    } else {
        // Закрываем все открытые ответы
        var allAnswers = document.querySelectorAll('.answer');
        allAnswers.forEach(function (item) {
            item.style.maxHeight = null;
            item.classList.remove('open');
        });

        // Открываем текущий ответ
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.classList.add('open');
    }
}

function toggleFaq(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');

    const allContents = document.querySelectorAll('.faq-content');
    allContents.forEach(item => {
        if (item !== content && item.style.maxHeight) {
            item.style.maxHeight = null;
            item.previousElementSibling.querySelector('.arrow').style.transform = "rotate(0deg)";
        }
    });

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.style.transform = "rotate(180deg)";
    }
}


const headerLink = document.querySelectorAll(".modal-btn");
const navPhone = document.querySelector(".nav__phone")

for (let i = 0; i < headerLink.length; i++) {
    headerLink[i].addEventListener("click", function () {
        document.getElementById("my-modal").classList.add("open")
    })
}

// Закрыть модальное окно
document.getElementById("close-my-modal-btn")?.addEventListener("click", function () {
    document.getElementById("my-modal").classList.remove("open")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box")?.addEventListener('click', event => {
    event._isClickWithInModal = true;
});

document.getElementById("my-modal")?.addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.portfolio__category-btn');
    const contents = document.querySelectorAll('.main__cards .content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Скрыть все контенты
            contents.forEach(content => content.classList.remove('active'));

            // Показать только тот контент, который соответствует категории
            document.querySelector(`.main__cards .content.${category}`).classList.add('active');

            // Обновить активную кнопку
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var currentFlag = document.getElementById('currentFlag');
    var languageDropdown = document.getElementById('languageDropdown');
    var isDropdownVisible = false;

    currentFlag.addEventListener('click', function() {
        isDropdownVisible = !isDropdownVisible;
        languageDropdown.style.display = isDropdownVisible ? 'block' : 'none';
    });

    languageDropdown.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('nav__language-option')) {
            var selectedFlagSrc = event.target.getAttribute('data-flag');
            currentFlag.src = selectedFlagSrc;
            languageDropdown.style.display = 'none';
            isDropdownVisible = false;
        }
    });

    // Закрытие выпадающего списка при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav__language-current')) {
            languageDropdown.style.display = 'none';
            isDropdownVisible = false;
        }
    });
});


$(document).ready(function () {

    $('.submit__form').on('submit', function (event) {
        const headerContentTitle = document.querySelector(".header__content-title");
        event.preventDefault();

        let form = $(this);
        let submitButton = form.find('.submit__btn');
        let formData = new FormData(); // Создаем новый объект FormData для каждой отправки
        let files = $('input[type=file]', form);

        submitButton.prop('disabled', true).text('Отправка...');

        // Добавление данных в FormData
        formData.append('Тип', headerContentTitle.getAttribute("data-src"));
        formData.append('Имя', $('[name="name"]', form).val());
        formData.append('Телефон', $('[name="phone"]', form).val());

        // Добавление файлов в FormData
        files.each(function (key, fileInput) {
            let filesList = fileInput.files;
            if (filesList.length > 0) {
                $.each(filesList, function (key, file) {
                    formData.append('file[]', file);
                });
            }
        });

        $.ajax({
            url: 'ajax.php', // Укажите здесь свой URL для обработки AJAX запроса
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (response) {
                alert("Отправлено успешно!");
                document.getElementById("my-modal").classList.remove("open")
                console.log('Успешно завершено');
                form.trigger('reset');
                submitButton.prop('disabled', false).text('Отправить');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Произошла ошибка при отправке формы: ' + textStatus);
                console.error('Ошибка AJAX:', errorThrown);
                submitButton.prop('disabled', false).text('Отправить');
            }
        });
    });
});
