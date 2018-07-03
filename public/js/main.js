console.log('JS Loaded');
const apiClient = axios.create()


let $menuToggle = $('#menu-toggle')
let $mainNavigation = $('#main-navigation')

    $menuToggle.on('click', () => {
      console.log('clicked')
      $mainNavigation.toggleClass('open')
      $menuToggle.toggleClass('active')
    })

const $profDel = $('#delete-account')

