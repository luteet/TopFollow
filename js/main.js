
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .aside__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



// =-=-=-=-=-=-=-=-=-=-=-=- <tab> -=-=-=-=-=-=-=-=-=-=-=-=

function tab(elem, duration) {

      checkTabActive = true;
      
  
      if(elem.tagName != 'SELECT') {
        elem.closest('._tab-list').querySelectorAll('._tab-link').forEach(element => {
          element.classList.remove('_active');
        })

        elem.classList.add('_active');

      }
  
      const tabLink = elem;
      
      let tabBlock, tabBlockActive, tabBlockParent;
      
      try {
        
        if(elem.tagName != 'SELECT') {
          tabBlock = document.querySelector(tabLink.getAttribute('href'));
        } else {
          tabBlock = document.querySelector('#' + tabLink.value);
        }
        
          tabBlockParent = tabBlock.closest('._tab-wrapper');
  
          if(tabBlock.classList.contains('_active')) {
            if(!tabBlock.classList.contains('_fade-in')) {
              tabBlock.classList.add('_fade-in');
            }
              checkTabActive = false;
              return false;
          }
  
          tabBlockActive = tabBlockParent.querySelector('._tab-block._active');
      } catch {
          checkTabActive = false;
          return false;
      }

      const tabBlockList = tabBlockParent.querySelectorAll('._tab-block');
  
      tabBlockParent.style.minHeight = (tabBlockActive) ? tabBlockActive.offsetHeight + 'px' : '0px';
      
      if(tabBlockActive) tabBlockActive.classList.add('_fade-out');
  
      setTimeout(function() {
  
          tabBlockList.forEach(element => {
              element.classList.remove('_active');
              element.classList.remove('_fade-out');
              element.classList.remove('_fade-in');
          });
  
          tabBlock.classList.add('_active');
  
      },(duration) ? duration : 300);
  
      setTimeout(function() {
          tabBlock.classList.add('_fade-in');
          
          tabBlockParent.style.minHeight = '0px';
  
          checkTabActive = false;
  
      },500);
  
}

// =-=-=-=-=-=-=-=-=-=-=-=- </tab> -=-=-=-=-=-=-=-=-=-=-=-=



(function() {
  var FX = {
      easing: {
          linear: function(progress) {
              return progress;
          },
          quadratic: function(progress) {
              return Math.pow(progress, 2);
          },
          swing: function(progress) {
              return 0.5 - Math.cos(progress * Math.PI) / 2;
          },
          circ: function(progress) {
              return 1 - Math.sin(Math.acos(progress));
          },
          back: function(progress, x) {
              return Math.pow(progress, 2) * ((x + 1) * progress - x);
          },
          bounce: function(progress) {
              for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                  if (progress >= (7 - 4 * a) / 11) {
                      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                  }
              }
          },
          elastic: function(progress, x) {
              return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
          }
      },
      animate: function(options) {
          var start = new Date;
          var id = setInterval(function() {
              var timePassed = new Date - start;
              var progress = timePassed / options.duration;
              if (progress > 1) {
                  progress = 1;
              }
              options.progress = progress;
              var delta = options.delta(progress);
              options.step(delta);
              if (progress == 1) {
                  clearInterval(id);
                  
                  options.complete();
              }
          }, options.delay || 10);
      },
      fadeOut: function(element, options) {
          var to = 1;
          this.animate({
              duration: options.duration,
              delta: function(progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function(delta) {
                  element.style.opacity = to - delta;
              }
          });
      },
      fadeIn: function(element, options) {
          var to = 0;
          element.style.display = 'block';
          this.animate({
              duration: options.duration,
              delta: function(progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function(delta) {
                  element.style.opacity = to + delta;
              }
          });
      }
  };
  window.FX = FX;
})()



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

let popupCheck = true, popupCheckClose = true;
function popup(arg) {

    if(popupCheck) {
        popupCheck = false;
    
    let popup, popupBg, popupCloseBtn,
    
        body        = arg.body,
        html        = arg.html,
        header      = arg.header,
        duration    = (arg.duration) ? arg.duration : 200;
        id          = arg.id;

    try {
        
        popup = document.querySelector(id);
        popupBg = popup.querySelector('._popup-bg');
        popupCloseBtn = popup.querySelectorAll('._close-popup');

    } catch {
        return false;
    }
    
        function removeFunc(popup, removeClass) {

            if(popupCheckClose) {
                popupCheckClose = false;

                
                FX.fadeOut(popup, {
                  duration: duration,
                  complete: function () {
                    popup.style.display = 'none';
                  }
                });
                popup.classList.remove('_active');

                setTimeout(() => {
                    popupCheckClose = true;
                },duration)
    
                if(removeClass) {
                    if(header) header.classList.remove('_popup-active');
    
                    setTimeout(function() {
                        
                        body.classList.remove('_popup-active');
                        html.style.setProperty('--popup-padding', '0px');

                    },duration)
                }
            }
        }

        body.classList.remove('_popup-active');
        html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
        body.classList.add('_popup-active');

        popup.classList.add('_active');
        if(header) header.classList.add('_popup-active');
        

        setTimeout(function () {
          FX.fadeIn(popup, {
            duration: duration,
            complete: function () {
            }
          });
        },duration);
    

    

        popupBg.addEventListener('click', function() {
            if(document.querySelectorAll('._popup._active').length <= 1) {
                removeFunc(popup, true);
            } else {
                removeFunc(popup, false);
            }
            setTimeout(function() {
                return false;
            },duration)
        });

        popupCloseBtn.forEach(element => {
          element.addEventListener('click', function() {
            if(document.querySelectorAll('._popup._active').length <= 1) {
                removeFunc(popup, true);
            } else {
                removeFunc(popup, false);
            }
            setTimeout(function() {
                return false;
            },duration)
        });
        })

        

        setTimeout(() => {
            popupCheck = true;
        },duration);

    }
    
}

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=



let slideUp = (target, duration=500) => {
  
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    checkSlideItem = false;
  }, duration);
}

let slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    checkSlideItem = false;
  }, duration);
}

let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none' && checkSlideItem == false) {
      checkSlideItem = true;
      setTimeout(function() {
          checkSlideItem = false;
      },500)
    return slideDown(target, duration);
    
  } else {
      checkSlideItem = true;
      setTimeout(function() {
          checkSlideItem = false;
      },500)
    return slideUp(target, duration);
  }
}





// =-=-=-=-=-=-=-=-=-=-=-=- <init> -=-=-=-=-=-=-=-=-=-=-=-=
document.querySelectorAll('._slide-item').forEach(element => {

  if(!element.classList.contains('_active')) {
    slideUp(element.querySelector('._slide-content'), 0);
  }
  
})


document.querySelectorAll('.aside__nav--sub-list').forEach(element => {
  
  if(!element.classList.contains('_active') && !element.closest('.aside__nav--item').querySelector('.aside__link._current-page')) {
    slideUp(element, 0);
  }
  
})


let checkTabActive = false;
document.querySelectorAll('._tab-select').forEach(element => {
  tab(element);
  
})

// =-=-=-=-=-=-=-=-=-=-=-=- </init> -=-=-=-=-=-=-=-=-=-=-=-=






let thisTarget;
let checkSlideItem = false;
body.addEventListener('click', function (e) {

    thisTarget = e.target;

    // =-=-=-=-=-=-=-=-=-=-=-=- <aside menu> -=-=-=-=-=-=-=-=-=-=-=-=
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </aside menu> -=-=-=-=-=-=-=-=-=-=-=-=



    // =-=-=-=-=-=-=-=-=-=-=-=- <theme> -=-=-=-=-=-=-=-=-=-=-=-=

    let themeLink = thisTarget.closest('._theme-link');
    if(themeLink) {
      e.preventDefault();

      if(themeLink.classList.contains('_light-theme')) {

        themeLink.classList.remove('_light-theme');
        themeLink.classList.add('_dark-theme');

        localStorage.setItem('theme', 'dark');
        body.classList.add('_dark-theme');

        let themeIcon = themeLink.querySelector('._icon-theme-to-dark');
        themeIcon.classList.remove('_icon-theme-to-dark');
        themeIcon.classList.add('_icon-theme-to-light');
        
      } else if(themeLink.classList.contains('_dark-theme')) {

        themeLink.classList.remove('_dark-theme');
        themeLink.classList.add('_light-theme');

        localStorage.setItem('theme', 'light');
        body.classList.remove('_dark-theme');

        let themeIcon = themeLink.querySelector('._icon-theme-to-light');
        themeIcon.classList.remove('_icon-theme-to-light');
        themeIcon.classList.add('_icon-theme-to-dark');

      }
    }


    // =-=-=-=-=-=-=-=-=-=-=-=- </theme> -=-=-=-=-=-=-=-=-=-=-=-=





    // =-=-=-=-=-=-=-=-=-=-=-=- <aside drop list> -=-=-=-=-=-=-=-=-=-=-=-=
    let asideLink         = thisTarget.closest('.aside__link'),
        asideLinkParent   = (asideLink) ? asideLink.closest('.aside__nav--item') : false,
        asideItemSubList  = (asideLinkParent) ? asideLinkParent.querySelector('.aside__nav--sub-list') : false;
    
    if(asideLinkParent && asideItemSubList) {


      if(!asideItemSubList.classList.contains('_active') && !asideLink.classList.contains('_current-page')) e.preventDefault();


      if(!checkSlideItem && !asideItemSubList.classList.contains('_active') && !asideLink.classList.contains('_current-page')) {

        document.querySelectorAll('.aside__nav--sub-list._active').forEach(element => {
          slideUp(element);
          element.classList.remove('_active');
        })
        document.querySelectorAll('.aside__link._active').forEach(element => {
          element.classList.remove('_active');
        })



        checkSlideItem = true;
        asideLink.classList.add('_active');
        asideItemSubList.classList.add('_active');
        slideDown(asideItemSubList);


      }
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </aside drop list> -=-=-=-=-=-=-=-=-=-=-=-=






    // =-=-=-=-=-=-=-=-=-=-=-=- <language> -=-=-=-=-=-=-=-=-=-=-=-=
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
    // =-=-=-=-=-=-=-=-=-=-=-=- </language> -=-=-=-=-=-=-=-=-=-=-=-=





    // =-=-=-=-=-=-=-=-=-=-=-=- <clear btn input> -=-=-=-=-=-=-=-=-=-=-=-=
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
    // =-=-=-=-=-=-=-=-=-=-=-=- </clear btn input> -=-=-=-=-=-=-=-=-=-=-=-=





    // =-=-=-=-=-=-=-=-=-=-=-=- <New order> -=-=-=-=-=-=-=-=-=-=-=-=
    let tabLink = thisTarget.closest('._tab-link');
    if(tabLink) {
      e.preventDefault();
      if(checkTabActive == false) {
        tab(thisTarget);
      }
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </New order> -=-=-=-=-=-=-=-=-=-=-=-=





    // =-=-=-=-=-=-=-=-=-=-=-=- <Action btn> -=-=-=-=-=-=-=-=-=-=-=-=
    /* let actionBtn = thisTarget.closest('.action-block__btn');
    if(actionBtn) {
      let subList = actionBtn.closest('.action-block').querySelector('.action-block__sub-list');

      if(!subList.classList.contains('_active')) {
        subList.classList.add('_active');
        actionBtn.classList.add('_active');
      } else {
        subList.classList.remove('_active');
        actionBtn.classList.remove('_active');
      }

    } else {
      let subList = document.querySelector('.action-block__sub-list._active'),
          actionBtn = document.querySelector('.action-block__btn._active');
      if(subList) subList.classList.remove('_active');
      if(actionBtn) actionBtn.classList.remove('_active');

    } */
    // =-=-=-=-=-=-=-=-=-=-=-=- </Action btn> -=-=-=-=-=-=-=-=-=-=-=-=






    // =-=-=-=-=-=-=-=-=-=-=-=- <Sub List> -=-=-=-=-=-=-=-=-=-=-=-=

    let subOpen = thisTarget.closest('._sub-open');
    if(subOpen) {
      e.preventDefault();
      let subList = subOpen.closest('._sub-parent').querySelector('._sub-list');

      if(!subList.classList.contains('_active')) {
        subList.classList.add('_active');
        subOpen.classList.add('_active');
      } else {
        subList.classList.remove('_active');
        subOpen.classList.remove('_active');
      }

    } else {
      let subList = document.querySelector('._sub-list._active'),
          subOpen = document.querySelector('._sub-open._active');
      if(subList) subList.classList.remove('_active');
      if(subOpen) subOpen.classList.remove('_active');

    }

    // =-=-=-=-=-=-=-=-=-=-=-=- </Sub List> -=-=-=-=-=-=-=-=-=-=-=-=



    let checkAllLabel = thisTarget.closest('._table-check-all-checkbox');
    if(checkAllLabel) {
      e.preventDefault();

      let input = checkAllLabel.closest('._table-parent-check-all-checkbox').querySelector('input[type="checkbox"]');
      input.checked = !input.checked;
      let allCheckBoxList = checkAllLabel.closest('table').querySelector('tbody').querySelectorAll('._form-checkbox');
      
      if(input.checked) {

        allCheckBoxList.forEach(element => {
          element.checked = true;
        })

      } else {

        allCheckBoxList.forEach(element => {
          element.checked = false;
        })

      }
    }



    // =-=-=-=-=-=-=-=-=-=-=-=- <Add funds> -=-=-=-=-=-=-=-=-=-=-=-=
    let tabSelect     = thisTarget.closest('._tab-select');
    if(tabSelect) {
      tabSelect.onchange = () => {
        if(checkTabActive == false) {
          tab(tabSelect);
        }
      }
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </Add funds> -=-=-=-=-=-=-=-=-=-=-=-=





    // =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=
    let btnPopup = thisTarget.closest('._btn-popup');
    if(btnPopup) {
        e.preventDefault();
        popup({
          id: btnPopup.getAttribute('href'),
          html: html,
          body: body,
        });
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=





    // =-=-=-=-=-=-=-=-=-=-=-=- <FAQs> -=-=-=-=-=-=-=-=-=-=-=-=
    let slideBtn = thisTarget.closest('._slide-btn');
    if(slideBtn && !checkSlideItem) {
      checkSlideItem = true;

      let slideItem     = slideBtn.closest('._slide-item'),
          slideContent  = slideItem.querySelector('._slide-content');


      if(slideItem.classList.contains('_active')) {
        
        slideItem.classList.remove('_active');
        slideUp(slideContent);

      } else {

        slideItem.classList.add('_active');
        slideDown(slideContent);

      }
      
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </FAQs> -=-=-=-=-=-=-=-=-=-=-=-=




    // =-=-=-=-=-=-=-=-=-=-=-=- <icon active on focus select> -=-=-=-=-=-=-=-=-=-=-=-=
    let formLable = thisTarget.closest('._form-label'),
        formSelect = (formLable) ? formLable.querySelector('._form-select') : false;
    if(formSelect) {
      if(!formSelect.classList.contains('_focus-event')) {
        e.preventDefault();
      
        let formIcon = formSelect.parentNode.querySelector('._form-icon');
        formIcon.classList.add('_active');

        formSelect.classList.add('_focus-event');
        
        formSelect.onfocus = () => {
          formIcon.classList.add('_active');
        }
        formSelect.onblur = () => {
          formIcon.classList.remove('_active');
        }
      }
      
      
    }
    // =-=-=-=-=-=-=-=-=-=-=-=- </icon active on focus select> -=-=-=-=-=-=-=-=-=-=-=-=




})




// =-=-=-=-=-=-=-=-=-=-=-=- <Chart> -=-=-=-=-=-=-=-=-=-=-=-=
const ctx = document.querySelector('#statistics-chart');
const pieCtx = document.querySelector('#statistics-pie-chart');

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

const externalTooltipHandler = (context) => {

  const value = context.tooltip.dataPoints[0].formattedValue;
  const { chart, tooltip } = context;
  
  const tooltipEl = document.querySelector('.chart-tooltip');
  let tooltipBlock = document.createElement('div');
  tooltipBlock.classList.add('chart-tooltip-block');
  tooltipBlock.innerHTML = `${value}%`;
  

  if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      tooltipEl.style.visibility = 'hidden';
      return;
  }

  if (tooltip.body) {
      /* const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map(b => b.pies);
      

      const tooltipBlockHeader = document.createElement('div');
      tooltipBlockHeader.classList.add('chart-tooltip-block__header')

      titleLines.forEach(title => {
          const text = document.createTextNode(title);

          tooltipBlockHeader.appendChild(text);
          tooltipBlock.appendChild(tooltipBlockHeader);
      });

      const tooltipBlockBody = document.createElement('div');
      tooltipBlockBody.classList.add('chart-tooltip-block__body');

      bodyLines.forEach((body, i) => {

          tooltipEl.style.setProperty('--color', tooltip.dataPoints[0].dataset.backgroundColor);

          const text = document.createTextNode(body);


          tooltipBlockBody.appendChild(text);
          tooltipBlock.appendChild(tooltipBlockBody);
      }); */

      const tableRoot = tooltipEl.querySelector('.chart-tooltip-block');

      if (tableRoot) tableRoot.remove();

      tooltipEl.appendChild(tooltipBlock);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  tooltipEl.style.opacity = 1;
  tooltipEl.style.visibility = 'visible';
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  //tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

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
                color: 'rgba(78, 75, 102, 0.5)',
              },
                ticks: {
                  stepSize: 100
                }
            },
            x: {
              grid: {
                display: false,
                borderColor: 'rgba(0,0,0,0)',
              },
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

try {
  new Chart(pieCtx.getContext('2d'), {
    type: 'pie',
    data: {
      labels: ['Completed', 'Processing', 'Processing', 'Pending', 'In progress', 'Partial', 'Canceled', 'Refunded'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [10, 13, 11, 20, 8, 9, 29],
          borderWidth: 0,
          
          backgroundColor: [
            'rgba(187, 57, 188, 1)',
            'rgba(244, 183, 64, 1)',
            'rgba(162, 107, 0, 1)',
            'rgba(0, 186, 136, 1)',
            'rgba(28, 150, 238, 1)',
            'rgba(255, 76, 156, 1)',
            'rgba(195, 0, 82, 1)',
          ],
        },
      ]
    },
    options: {
        responsive: true,
        plugins: {
          htmlLegend: {
              containerID: 'pie-legend-container',
          },
          tooltip: {
            boxWidth: 0,
            boxHeight: 0,

            padding: 15,

            backgroundColor: 'rgba(255,255,255,1)',
            bodyColor: '#000',

            bodyFont: {
              size: 16,
            },

            position: 'average',
            usePointStyle: true,
            callbacks: {
                label: function (context) {
                    let value = context.formattedValue;
                        return value + '%';
                }
            },
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

// =-=-=-=-=-=-=-=-=-=-=-=- </Chart> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <media event> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {},
    windowSize;


let appendItems = document.querySelectorAll('._append-item'),
    appendItemsList = [];

    appendItems.forEach(element => {
      appendItemsList.push([element, element.parentNode]);
    })

      function resizeCheckFunc(size, minWidth, maxWidth) {
        

        if(windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
            resizeCheck[String(size)] = false;
            maxWidth(); // < size
            
        }
        if(windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
            resizeCheck[String(size)] = true;
            minWidth(); // > size
            
        }

      }
      


      function resize() {
        
      windowSize = window.innerWidth;
    
      resizeCheckFunc(768, 
        function () {  // screen < 768px
          
          for(let i = 0; i<appendItemsList.length; i++) {
            let appendParent = appendItemsList[i][1];
            appendParent.append(appendItemsList[i][0]); 
          }
          
        },
        function () {  // screen > 768px
          
          for(let i = 0; i<appendItemsList.length; i++) {
            let appendTo = document.querySelector(appendItemsList[i][0].dataset.appendTo);
            appendTo.append(appendItemsList[i][0]); 
          }

        });
    
    
      }
      
      resize();
      
      window.onresize = resize;
     
// =-=-=-=-=-=-=-=-=-=-=-=- </media event> -=-=-=-=-=-=-=-=-=-=-=-=
