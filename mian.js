document.addEventListener("DOMContentLoaded", function(){

    fetch('otdel.json')
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            if(document.querySelector('.otdel') != null){

                data.forEach(element => {
                    document.querySelector('.otdel').innerHTML += `
                        <li>
                        
                            <a href="otdel.html?id=${element.id}">
                                <img src="${element.img_src}">
                                <h2>${element.title}</h2>
                                <h2>${element.adress}</h2>
                            </a>

                        </li>
                    `;
                });

               

            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    fetch('spec.json')
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            if(document.querySelector('section.spec') != null){
                
                const url = new URL(window.location.href);
                const id_spec = url.searchParams.get('id');
                var id_otdel;

                data.forEach(element => {
                    
                    if(element.id == id_spec){

                        id_otdel = element.id_otdel;

                        var obl_list = ``;
                        var img_list = ``;

                        element.obl.forEach(element => {
                            obl_list += `
                                <li>${element}</li>
                            `;
                        });

                        element.photo.forEach(element => {
                            img_list += `
                                <img src="${element}">
                            `;
                        });

                        document.querySelector('section.spec').innerHTML = `
                        
                            <h2 class="title">${element.title}</h2>

                            <div class="text__top"><h3>Срок обучения:</h3><p>${element.sroc}</p></div>
                            <div class="text__top"><h3>База образования:</h3><p>${element.baza}</p></div>
                            <div class="text__top"><h3>Квалификация:</h3><p>${element.kval}</p></div>

                            <h3>Область профессиональной деятельности выпускников:</h3>
                            <ul class="obl__list">
                                ${obl_list}
                            </ul>

                            <h3>Возможности для трудоустройства:</h3>
                            <p>${element.vozmojnosti}</p>

                            <div class="img__block">
                                ${img_list}
                            </div>

                        `;

                    }

                });

                data.forEach(element => {
                    
                    if(element.id_otdel == id_otdel){
                        document.querySelector('.spec__list').innerHTML += `
                            <li>
                            
                                <a href="spec.html?id=${element.id}">
                                    <img src="${element.img_src}">
                                    <h2>${element.title}</h2>
                                </a>

                            </li>
                        `;
                    }

                });

                $('body').append(`<a href="otdel.html?id=${id_otdel}" class="btn">назад к специальностям</a>`);

                if(document.querySelector('.spec__list') != null){

                    $('.spec__list').slick({
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: false, // Отключаем точки навигации
                        arrows: true, // Отключаем кнопки управления
                    });
            
                }


            }

            if(document.querySelector('.otdel__list') != null){

                const url = new URL(window.location.href);
                const id_otdel = url.searchParams.get('id');

                data.forEach(element => {

                    if(element.id_otdel == id_otdel){
                        document.querySelector('.otdel__list').innerHTML += `
                            <li>
                            
                                <a href="spec.html?id=${element.id}">
                                    <img src="${element.img_src}">
                                    <h2>${element.title}</h2>
                                </a>

                            </li>
                        `;
                    }
                });

               

            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    

})