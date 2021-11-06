jQuery(document).ready(function($) {
    // define vars
    var userRegRestricted = 'p.no_companies_allowed'
    var groups = ['1', '2']
    var myGroups = isLoggedIn ? abUser.group_id : []

    // define boolean conditions
    var isUserRegRestricted = !!($(userRegRestricted).length)
    var isDashboard = !!(window.location.pathname == '/my-url/')
    var isLoggedIn = !!(typeof roleUser !== undefined)
    var canSeeCampaigns = !!(isAdmin || campaignVisibility())
    var isEngagePost = !!($('.post-type-archive-pagename table').length)
    var isAdmin = !!($('.administrator').length)

    function ssoLogout() {
        return $(userRegRestricted + ' a').attr('href', 'https://abc.xyz/identity/connect/endsession?post_logout_redirect_uri=test')
    }

    function renameFunction() {
        setTimeout(function() {
          $('.post-type-archive-engage table.dataTable thead tr th:nth-child(2)').text('Filter 1');
          $('.post-type-archive-engage table.dataTable thead tr th:nth-child(3)').text('Filter 2');
        }, 1000)
    }

    function loadDashboardPlaybook() {
        // playbook content holder to dashboard
        var contentBox = '<div class="content-box"></div>';
        $('.dash_pin_holder').prepend(contentBox);
        $('.content-box').append('<div class="content-wrapper"></div>');
        $('.content-wrapper').load('https://abc.com .asset_holder');
    }

    function campaignVisibility() {
        for (group of groups) {
            if (myGroups.indexOf(group) > -1) {
                return true
            }
        }
        return false
    }

    function showCampaigns() {
        return $('li.menu-campaigns').show()
    }
    function partnerTierFunction() {
        // set up DOM
        $('#header .wrapper').append('<div class="tier_level"></div>');

        // create object for partner tiers
        var myTier = {
            "8" : {
                name: "Bronze", 
                image: 'https://fakeurl.com/bronze'
            },
            "9" : {
                name: "Silver", 
                image: 'https://fakeurl.com/silver'
            },
            "10" : {
                name: "Gold", 
                image: 'https://fakeurl.com/gold'
            },
            "11" : {
                name: "Platinum", 
                image: 'https://fakeurl.com/platinum'
            }
        };

        // check if the user is in a tier group
        for (var i = 0; i < myGroups.length; i++) {
            
            // associate tier label to group values
            var groups = myGroups[i];
            var tier = myTier[groups];
            
            // populate DOM with tier label
            if (tier !== undefined) {
                var $z = $('div.tier_level');
                $z.append('<img src="' + tier['image']+ '">');   
                break;
            }
        }
    }

    function customerNav() {
        var menu = '#menu-primary-menu-1'
        var navItems = [
            '<li class="menu-quick"><a href="https://fakepage.com"><span class="icon-quick"></span>Resources</a></li>',
            '<li class="menu-feedback"><a href="https://fakepage.com"><span class="icon-feedback"></span>Opportunities</a></li>',
            '<li class="menu-news"><a href="https://fakepage.com"><span class="icon-knowledge-base"></span>News</a></li>',
            '<li class="menu-PAssets"><a href="https://fakepage.com"><span class="icon-PAssets"></span>Assets</a></li>'
        ]
        
        for (item of navItems) {
            $(menu).append(item)
        }
    }

    function visibilityDriver() {
        for (scenario of visScenarios) {
            if (scenario.condition) {
                scenario.outcome()
            }
        }
    }

    function changeHtml() {
        for (el of newHtml) {
            $(el.selector).html(el.changedTo).show()
        }
    }

    var visScenarios = [
        {
            condition: isUserRegRestricted,
            outcome: function() {
                ssoLogout()
            }
        },
        {
            condition: isDashboard,
            outcome: function() {
                loadDashboardPlaybook()
            }
        },
        {
            condition: isLoggedIn,
            outcome: function() {
                partnerTierFunction()
                customerNav()
            }
        },
        {
            condition: canSeeCampaigns,
            outcome: function() {
                showCampaigns()
            }
        },
        {
            condition: isEngagePost,
            outcome: function() {
                renameFunction()
            }
        },
    ]

    var newHtml = [
        {
            selector: '.dashboard #crumbs strong',
            changedTo: 'Customer Name'
        }
    ]

    visibilityDriver()
    changeHtml()

}); // end rdy function
