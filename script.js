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

var swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2.7,
        },
        576: {
            slidesPerView: 1,
        },
    },
});


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
        allAnswers.forEach(function(item) {
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


$(document).ready(function() {
    const headerContentTitle = document.querySelector(".header__content-title");

    $('.submit__form').on('submit', function(event) {
        event.preventDefault();

        let form = $(this);
        let submitButton = form.find('.submit__btn');
        let formData = new FormData(); // Создаем новый объект FormData для каждой отправки
        let files = $('input[type=file]', form);

        submitButton.prop('disabled', true).text('Отправка...');

        // Добавление данных в FormData
        formData.append('Тип', headerContentTitle.getAttribute("data-src"));
        formData.append('Имя', $('[name="name"]', form).val());
        formData.append('Телефон', $('[name="tel"]', form).val());

        // Добавление файлов в FormData
        files.each(function(key, fileInput) {
            let filesList = fileInput.files;
            if (filesList.length > 0) {
                $.each(filesList, function(key, file) {
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
            success: function(response) {
                alert("Отправлено успешно!");
                console.log('Успешно завершено');
                form.trigger('reset');
                submitButton.prop('disabled', false).text('Отправить');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Произошла ошибка при отправке формы: ' + textStatus);
                console.error('Ошибка AJAX:', errorThrown);
                submitButton.prop('disabled', false).text('Отправить');
            }
        });
    });
});
