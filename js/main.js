
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .aside__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');

function tab(elem) {

      checkTabActive = true;
  
      elem.closest('._tab-list').querySelectorAll('._tab-link').forEach(element => {
          element.classList.remove('_active');
      })
  
      elem.classList.add('_active');
  
      const tabLink = elem;
  
      let tabBlock, tabBlockActive, tabBlockParent;
  
      try {
          tabBlock = document.querySelector(tabLink.getAttribute('href'));
          tabBlockParent = tabBlock.closest('._tab-wrapper');
  
          if(tabBlock.classList.contains('_active')) {
              checkTabActive = false;
              return false;
          }
  
          tabBlockActive = tabBlockParent.querySelector('._tab-block._active');
      } catch {
          return false;
      }
  
      const tabBlockList      = tabBlockParent.querySelectorAll('._tab-block');
  
      tabBlockParent.style.minHeight = tabBlockActive.offsetHeight + 'px';
      
      tabBlockActive.classList.add('_fade-out');
  
      setTimeout(function() {
  
          tabBlockList.forEach(element => {
              element.classList.remove('_active');
              element.classList.remove('_fade-out');
              element.classList.remove('_fade-in');
          });
  
          tabBlock.classList.add('_active');
  
      },300);
  
      setTimeout(function() {
          tabBlock.classList.add('_fade-in');
          
          
          tabBlockParent.style.minHeight = '0px';
  
          checkTabActive = false;
  
      },500);
  
}

let thisTarget, checkTabActive = false;
body.addEventListener('click', function (e) {

    thisTarget = e.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }

    let dropDownCurrent = thisTarget.closest('._drop-down-current'),
    dropDownParent = (dropDownCurrent) ? dropDownCurrent.closest('._drop-down') : false;
    if (dropDownCurrent) {

      if (!dropDownParent.classList.contains('_active')) {
        dropDownParent.classList.add('_active');
      }

    } else if (!thisTarget.closest('._drop-down')) {

      document.querySelectorAll('._drop-down').forEach(element => {
        element.classList.remove('_active');
      })

    }



    let inputClearBtn = thisTarget.closest('._clear-input-btn');
    if(inputClearBtn) {
      let input = inputClearBtn.closest('label').querySelector('input'),
          textarea = inputClearBtn.closest('label').querySelector('textarea');

      if(input) {
        
        input.value = (input.getAttribute('value')) ? input.getAttribute('value') : '' + '';

      } else if(textarea) {

        textarea.value = '';

      }
      
      

    }




    let tabLink = thisTarget.closest('._tab-link');
    if(tabLink) {
      e.preventDefault();
      if(checkTabActive == false) {
        tab(thisTarget);
      }
    }



})

const ctx = document.querySelector('#statistics-chart');

function dataChart(arg) {
    let result = {
        labels: arg.labels,
        datasets: [],
    }
    for(let i = 0; i<arg.data.length; i++) {
        result.datasets.push({
            label: arg.data[i].label,
            data: arg.data[i].data,

            backgroundColor: [
                arg.data[i].color,
            ],
            borderColor: [
                arg.data[i].color,
            ],
            borderWidth: 4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderWidth: 0,
            pointHoverBackgroundColor: arg.data[i].color,
            hidden: arg.data[i].hidden,

            cubicInterpolationMode: 'monotone',

        })
    }

    return result;
}


let data = dataChart({
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    data: [
        {
            label: 'Completed',
            data: [0, 100, 250, 400, 300, 500, 220, 230],
            color: 'rgba(187, 57, 188, 1)',
        },
        {
            label: 'Processing',
            data: [0, 220, 350, 200, 500, 400, 320, 330],
            color: 'rgba(244, 183, 64, 1)',
            hidden: true,
        },
        {
          label: 'Pending',
          data: [0, 150, 250, 190, 400, 300, 420, 430],
          color: 'rgba(162, 107, 0, 1)',
          hidden: true,
        },
        {
          label: 'In progress',
          data: [0, 100, 210, 130, 230, 500, 320, 230],
          color: 'rgba(0, 186, 136, 1)',
          hidden: true,
        },
        {
          label: 'Partial',
          data: [0, 50, 110, 230, 330, 200, 420, 500],
          color: 'rgba(28, 150, 238, 1)',
          
        },
        {
          label: 'Canceled',
          data: [0, 70, 130, 190, 270, 300, 490, 300],
          color: 'rgba(255, 76, 156, 1)',
          hidden: true,
        },
        {
          label: 'Refunded',
          data: [0, 20, 300, 160, 270, 300, 500, 400],
          color: 'rgba(195, 0, 82, 1)',
          hidden: true,
        },
    ]
    
});


const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('chart-legend-li');
            if(item.hidden) li.classList.add('_disabled');

            li.onclick = () => {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                chart.update();
            };

            const boxSpan = document.createElement('span');
            boxSpan.classList.add('chart-legend-box');
            boxSpan.style.setProperty('--color', item.fillStyle);


            const textContainer = document.createElement('span');
            textContainer.classList.add('chart-legend-text');
            
            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
};

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.classList.add('chart-legend-list');

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

try {
  const chart = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {

            y: {
              grid: {
                borderColor: 'rgba(0,0,0,0)',
                borderDash: [5],
              },
                ticks: {
                  stepSize: 100
                    /* font: {
                        size: 12,
                        family: 'Intro Book, sans-serif',
                    }, */
                }
            },
            x: {
              grid: {
                display: false,
                borderColor: 'rgba(0,0,0,0)',
              },
                /* ticks: {
                    font: {
                        size: 11,
                        family: 'Intro Book',
                    },
                } */
            },
        },
        plugins: {
            htmlLegend: {
                containerID: 'legend-container',
            },
            legend: {
                display: false,
            }
        }
    },
    plugins: [htmlLegendPlugin]

})
} catch {

}







// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=
/*
let slider = new Swiper('.__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    }
}); 
*/
// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
