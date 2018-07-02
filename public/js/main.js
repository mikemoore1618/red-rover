console.log('JS Loaded');

let $menuToggle = $('#menu-toggle')
let $mainNavigation = $('#main-navigation')

    $menuToggle.on('click', () => {
      $mainNavigation.toggleClass('open')
      $menuToggle.toggleClass('active')
    })