console.log('JS Loaded');
const apiClient = axios.create()


let $menuToggle = $('#menu-toggle')
let $mainNavigation = $('#main-navigation')

    $menuToggle.on('click', () => {
      $mainNavigation.toggleClass('right-open')
      $menuToggle.toggleClass('right-active')
    })

const $profDel = $('#delete-account')

let $editSiteToggle = $('#edit-site-toggle')
let $editSitePartial = $('#edit-site-partial ')

    $editSiteToggle.on('click', () => {
      console.log('clicked')
      $editSitePartial.toggleClass('left-open')
      $editSiteToggle.toggleClass('left-active')
    })

