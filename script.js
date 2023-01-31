 
//  window.addEventListener('DOMContentLoaded', () => {

//     const tabs = document.querySelectorAll('.tabheader_item'),
//           tabsContent = document.querySelectorAll('tabcontent'),
//           tabsParent = document.querySelector('.tabheader_items');

//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.style.display = 'none';
//         });

//         tabs.forEach(tab => {
//             item.classList.remove('tabheader__item__active');
//         });
//     }

//     function showTabContent(i = 0) {
//         tabsContent[i].style.display = 'block';
//         tabs[i].classList.add('tabheader__item__active');
//         }

//         hideTabContent();
//         showTabContent();

//         tabsParent.addEventListener('click', (event) => {
//             const target = event.target;

//             if(target && target.classList.contains('tabheader__item')) {
//                 tabs.forEach((item, i) => {
//                     if (target == item) {
//                         hideTabContent();
//                         showTabContent(i);
//                     }
                     
//                 });
//             }
//         });
//  });

//MODAL
const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);



class MenuCard {
constructor(src, alt, title, descr, price, parentSelector, ... classes) {
 this.src = src;
 this.alt = alt;
 this.title = title;
 this.descr = descr;
 this.price = price;
 this.classes = classes;
 this.parent = document.querySelector(parentSelector);
 this.transfer = 27;
 this.changeToUAH();
}
changeToUAH() {
 this.price = this.price * this.transfer;
 
}                                       

render() {
 const element = document.createElement('div');

 if (this.classes.length === 0) {
     this.element = 'menu_item';
     element.classList.add(this.element);
 } else {
     this.classes.forEach(className => element.classList.add(className));
 }

 element.innerHTML = `
     <img src=${this.src} alt=${this.alt}>    
     <h3 class="menu__item-subtitle">${this.title}</h3>
     <div class="menu__item-descr">${this.descr}</div>
     <div class="menu__item-divider"></div>
     <div class="menu__item-price">
     <div class="menu__item-cost">Цена:</div>
     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
     </div>
 
`;
 
 this.parent.append(element);
}
}

new MenuCard(
"img/tabs/vegy.jpg",
"vegy",
'Меню "Фитнес"',
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
9,
".menu .container"
).render();

new MenuCard(
"img/tabs/elite.jpg",
"elite",
'Меню “Премиум”',
'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
14,
".menu .container"
).render();

new MenuCard(
"img/tabs/post.jpg",
"post",
'Меню "Постное"',
'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
27,
".menu .container"
).render();

//Forms

const form = document.querySelectorAll('form');

const message = {
    loading:'img/form/spinner.svg',
    success: 'Спасибо!',
    failure: 'Что то пошло не так'

};

form.forEach(item => {
    postData(item);
});

function postData(from) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
        
        `;
        
        form.insertAdjacentEelement('afterend', statusMessage)

      
        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value; 
        });  

        fetch ('server.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/jason'
            },
            body: JSON.stringify(object)
        }).then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            from.reset();
            statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        })

    });
}


function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    showThanksModal.classList.add('modal__dialog');
    showThanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
    
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() =>{
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    },4000)
};