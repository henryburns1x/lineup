let email = null
let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

window.onload = function () {

    // Check if User is logged in
    create_login()


}

function start_app() {
    create_home()
    create_calendar(null)
    create_recommendation()
    find_friends()
    read_calendar()

    // Check for search button clicks
    profile_friends_search_button.onclick = function () {

        find_friend(profile_friends_search.value)

    }
}

// Create the login page
function create_login() {

    if (localStorage.getItem('email') != null) {

        email = localStorage.getItem('email')

        start_app()

        return
    }

    if (document.getElementById('overlay')) {
        document.getElementById('overlay').remove()
        document.getElementById('outer_container').remove()
    }

    document.body.setAttribute('style', 'overflow: hidden')

    let overlay = document.createElement('div')
    overlay.setAttribute('id', 'login_overlay')

    let outer_container = document.createElement('div')
    outer_container.setAttribute('id', 'outer_container')

    let container = document.createElement('div')
    container.setAttribute('id', 'login_container')
    container.onclick = function (event) {
        event.stopPropagation()
    }

    let container_header_container = document.createElement('div')
    container_header_container.setAttribute('id', 'container_header_container')

    let container_header_logo = document.createElement('img')
    container_header_logo.setAttribute('id', 'container_header_logo')
    container_header_logo.src = '/images/logo.jpg'

    let container_header = document.createElement('h1')
    container_header.setAttribute('id', 'login_container_header')
    container_header.textContent = 'LineUp'

    container_header_container.append(container_header_logo, container_header)

    let container_inner_container = document.createElement('div')
    container_inner_container.setAttribute('id', 'container_login_inner_container')

    let container_email_container = document.createElement('input')
    container_email_container.setAttribute('id', 'container_email_container')
    container_email_container.setAttribute('placeholder', 'Email')

    let container_username_container = document.createElement('input')
    container_username_container.setAttribute('id', 'container_username_container')
    container_username_container.setAttribute('placeholder', 'Username')

    let container_password_container = document.createElement('input')
    container_password_container.setAttribute('type', 'password')
    container_password_container.setAttribute('id', 'container_password_container')
    container_password_container.setAttribute('placeholder', 'Password')

    container_inner_container.append(container_username_container, container_email_container, container_password_container)

    let container_footer_container = document.createElement('div')
    container_footer_container.setAttribute('id', 'container_footer_container')

    let container_sign_up_button = document.createElement('button')
    container_sign_up_button.setAttribute('id', 'container_sign_up_button')
    container_sign_up_button.textContent = 'Get Started'
    container_sign_up_button.onclick = function () {

        if (container_username_container.value.length <= 0) {

            alert('Missing Username')
            return

        }

        if (container_email_container.value.length <= 0) {

            alert('Missing Email')
            return

        }

        if (container_password_container.value.length <= 0) {

            alert('Missing Password')
            return

        }

        let url = `/api/user/sign_up`;

        let data = {

            username: container_username_container.value,
            email: container_email_container.value,
            password: container_password_container.value,

        }

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(result => {

                return result.json()
            })
            .then(data => {

                if (data.status) {
                    alert('Try another Username or Email')
                    return
                }

                localStorage.setItem('username', container_username_container.value)
                localStorage.setItem('email', container_email_container.value)
                start_app()

            })
            .catch(error => alert(error))


    }

    container_footer_container.append(container_sign_up_button)

    container.append(container_header_container, container_inner_container, container_footer_container)

    outer_container.append(container)

    document.body.append(overlay, outer_container)

}

// Create the home page
function create_home() {

    let html = `

        <div id="left_container">

            <div id="logo_container">

            <img src="/images/logo.jpg" id="logo">

                        
            </img> 


            </div> 

            <div id="navigation_container">

                <div id="navigation_inner_container">

                    <div class="navigation_option">
                        🏠
                    </div>
                    <div class="navigation_option">
                        😎
                    </div>
                    <div class="navigation_option">
                        ⚙️
                    </div>

                    <div class="navigation_option">
                        📙
                    </div>

                </div> 

            </div> 


        </div> 

        <div id="middle_container">

            <div id="profile_container">

                <div id="profile_icon_container">

                    <img src="/images/you.jpg" id="profile_icon">

                        
                    </img> 

                </div> 

                <div id="profile_content_container">

                    <div id="profile_name_container">

                        ${localStorage.getItem('username')}

                    </div> 

                    <div id="profile_quote_container">
            
                        “Nothing is impossible. The word itself says ‘I’m possible!'”
                        — Audrey Hepburn
                    </div> 

                </div> 

                <div id="profile_friends_container">

                    <div id="profile_friends_header">

                        Friends

                    </div> 

                    <div id="profile_friends_search_container">

                        <input placeholder="Search ..." id="profile_friends_search"/>

                        <button id="profile_friends_search_button">🔎</button>

                    </div> 

                    <div id="profile_friends_inner_container">

    
                    </div> 

                </div> 


            </div> 


            <div id="calendar_container">

                

            </div> 

        </div> 

        <div id="right_container">


            <div id="extra_container">

                <div id="extra_header_container">

                    <h2>LineUp</h2>

                </div> 

                <ul id="extra_text_container">

                    <li>Help users spend more time with friends and family</li>
                    <li>Get your life organized</li>
                    <li>Make friends who will hold you accountable to your schedule</li>
                    <li>Let LineUp schedule your dates and meetups for you</li>

                    
                </ul> 

            </div> 


            <div id="recommendation_container">

                <div id="recommendation_header">

                    Recommendation

                </div> 

                <div id="recommendation_inner_container">

                </div> 

            </div> 



        </div> 
    
    `
    document.body.innerHTML = html


}

// Create the friend popup
function create_friend_popup(username) {

    if (document.getElementById('overlay')) {
        document.getElementById('overlay').remove()
        document.getElementById('outer_container').remove()
    }

    document.body.setAttribute('style', 'overflow: hidden')

    let overlay = document.createElement('div')
    overlay.setAttribute('id', 'overlay')

    let outer_container = document.createElement('div')
    outer_container.setAttribute('id', 'outer_container')
    outer_container.onclick = function () {
        document.getElementById('overlay').remove()
        document.getElementById('outer_container').remove()
        document.body.setAttribute('style', 'overflow: auto')
    }

    let container = document.createElement('div')
    container.setAttribute('id', 'container')
    container.onclick = function (event) {
        event.stopPropagation()
    }

    let container_header_container = document.createElement('div')
    container_header_container.setAttribute('id', 'container_header_container')

    let container_header = document.createElement('h2')
    container_header.setAttribute('id', 'container_header')
    container_header.textContent = 'Add Friend'

    container_header_container.append(container_header)

    let container_inner_container = document.createElement('div')
    container_inner_container.setAttribute('id', 'container_add_friend_inner_container')

    let friends = document.createElement('div')
    friends.setAttribute('class', 'friends')

    let friends_image_container = document.createElement('div')
    friends_image_container.setAttribute('class', 'friends_image_container')

    let friends_image = document.createElement('img')
    friends_image.setAttribute('class', 'friends_image')
    friends_image.setAttribute('src', '/images/dog')

    friends_image_container.append(friends_image)

    let friends_name_container = document.createElement('div')
    friends_name_container.setAttribute('class', 'friends_name_container')

    let friends_name = document.createElement('p')
    friends_name.setAttribute('class', 'friends_name')
    friends_name.textContent = (username == null) ? '404 User not found' : username

    friends_name_container.append(friends_name)

    friends.append(friends_image_container, friends_name_container)

    container_inner_container.append(friends)

    let container_footer_container = document.createElement('div')
    container_footer_container.setAttribute('id', 'container_footer_container')

    let container_add_button = document.createElement('button')
    container_add_button.setAttribute('id', 'container_add_button')
    container_add_button.textContent = 'Add'
    container_add_button.onclick = function () {

        container_add_button.textContent = 'Added'
        add_friend(username)

    }

    if (username != null) {
        container_footer_container.append(container_add_button)
        container.append(container_header_container, container_inner_container, container_footer_container)
    } else {
        container.append(container_header_container, container_inner_container)
    }


    outer_container.append(container)

    document.body.append(overlay, outer_container)
}

// Create the block
function create_block(day, time, block) {

    let message = (block == null) ? '' : block.message

    if (document.getElementById('overlay')) {
        document.getElementById('overlay').remove()
        document.getElementById('outer_container').remove()
    }

    document.body.setAttribute('style', 'overflow: hidden')

    let overlay = document.createElement('div')
    overlay.setAttribute('id', 'overlay')

    let outer_container = document.createElement('div')
    outer_container.setAttribute('id', 'outer_container')
    outer_container.onclick = function () {
        document.getElementById('overlay').remove()
        document.getElementById('outer_container').remove()
        document.body.setAttribute('style', 'overflow: auto')
    }

    let container = document.createElement('div')
    container.setAttribute('id', 'container')
    container.onclick = function (event) {
        event.stopPropagation()
    }

    let container_header_container = document.createElement('div')
    container_header_container.setAttribute('id', 'container_header_container')

    let container_header = document.createElement('h2')
    container_header.setAttribute('id', 'container_header')
    container_header.textContent = 'Add Block'

    container_header_container.append(container_header)

    let container_inner_container = document.createElement('div')
    container_inner_container.setAttribute('id', 'container_inner_container')

    let container_message_container = document.createElement('div')
    container_message_container.setAttribute('id', 'container_message_container')
    container_message_container.setAttribute('contenteditable', true)
    container_message_container.setAttribute('data-ph', 'Add a description of your task')
    container_message_container.textContent = message

    container_inner_container.append(container_message_container)

    let container_footer_container = document.createElement('div')
    container_footer_container.setAttribute('id', 'container_footer_container')

    let container_delete_button = document.createElement('button')
    container_delete_button.setAttribute('id', 'container_delete_button')
    container_delete_button.textContent = 'Delete'
    container_delete_button.onclick = function () {

        document.getElementById('overlay').remove()
        document.getElementById('outer_container').remove()
        document.body.setAttribute('style', 'overflow: auto')

        update_calendar(day, time, 0, null, true)

    }


    let container_update_button = document.createElement('button')
    container_update_button.setAttribute('id', 'container_update_button')
    container_update_button.textContent = 'Update'
    container_update_button.onclick = function () {

        update_calendar(day, time, 0, container_message_container.textContent, false)

    }

    container_footer_container.append(container_delete_button, container_update_button)

    container.append(container_header_container, container_inner_container, container_footer_container)

    outer_container.append(container)

    document.body.append(overlay, outer_container)
}

// Create the recommendation
function create_recommendation() {

    let url = `/api/user/recommendation`;

    let data = {

        email: email,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            let matching_times = data.matching_times || []

            for (let i = 0; i < matching_times.length; i++) {

                if (matching_times[i] == null) {

                    return
                }

                let friend = matching_times[i].friend
                let day = matching_times[i].day
                let time_index = matching_times[i].time

                let time = get_time(time_index)

                let recommendation = document.createElement('div')
                recommendation.setAttribute('class', 'recommendation')

                let recommendation_profile_container = document.createElement('div')
                recommendation_profile_container.setAttribute('class', 'recommendation_profile_container')

                let recommendation_profile_image_container = document.createElement('div')
                recommendation_profile_image_container.setAttribute('class', 'recommendation_profile_image_container')

                let recommendation_profile_image = document.createElement('img')
                recommendation_profile_image.setAttribute('class', 'recommendation_profile_image')
                recommendation_profile_image.setAttribute('src', '/images/dog')

                recommendation_profile_image_container.append(recommendation_profile_image)

                let recommendation_profile_name_container = document.createElement('div')
                recommendation_profile_name_container.setAttribute('class', 'recommendation_profile_name_container')

                let recommendation_profile_name = document.createElement('p')
                recommendation_profile_name.setAttribute('class', 'recommendation_profile_name')
                recommendation_profile_name.textContent = friend

                recommendation_profile_name_container.append(recommendation_profile_name)

                recommendation_profile_container.append(recommendation_profile_image_container, recommendation_profile_name_container)

                // Date section
                let recommendation_subject_container = document.createElement('div')
                recommendation_subject_container.setAttribute('class', 'recommendation_date_container')

                let recommendation_subject = document.createElement('input')
                recommendation_subject.setAttribute('class', 'recommendation_subject')
                recommendation_subject.setAttribute('placeholder', 'Let\'s hang out')

                recommendation_subject_container.append(recommendation_subject)

                // Date section
                let recommendation_date_container = document.createElement('div')
                recommendation_date_container.setAttribute('class', 'recommendation_date_container')

                let recommendation_date = document.createElement('p')
                recommendation_date.setAttribute('class', 'recommendation_date')
                recommendation_date.textContent = days[day]

                let recommendation_time = document.createElement('p')
                recommendation_time.setAttribute('class', 'recommendation_time')
                recommendation_time.textContent = `⏰ ${time}`

                recommendation_date_container.append(recommendation_date, recommendation_time)

                // Options section
                let recommendation_options_container = document.createElement('div')
                recommendation_options_container.setAttribute('class', 'recommendation_options_container')

                let recommendation_cancel = document.createElement('button')
                recommendation_cancel.setAttribute('class', 'recommendation_cancel')
                recommendation_cancel.textContent = 'Delete'
                recommendation_cancel.onclick = function () {

                    recommendation.remove()

                }

                let recommendation_ok = document.createElement('button')
                recommendation_ok.setAttribute('class', 'recommendation_ok')
                recommendation_ok.textContent = 'Invite'
                recommendation_ok.onclick = function () {

                    let message = recommendation_subject.value
                    if (message.length <= 0) {
                        message = 'Let\'s Hang Out'
                    }

                    update_calendar(day, time_index, 0, message, false)

                }



                recommendation_options_container.append(recommendation_cancel, recommendation_ok)

                recommendation.append(recommendation_profile_container, recommendation_subject_container, recommendation_date_container, recommendation_options_container)

                document.getElementById('recommendation_inner_container').append(recommendation)

            }


        })
        .catch(error => alert(error))



}

// Cretae the calendar
function create_calendar(calendar) {

    document.getElementById('calendar_container').innerHTML = ''

    if (calendar == null) {
        calendar = [
            new Array(48).fill(null),
            new Array(48).fill(null),
            new Array(48).fill(null),
            new Array(48).fill(null),
            new Array(48).fill(null),
            new Array(48).fill(null),
            new Array(48).fill(null),
        ]
    }

    for (let i = 0; i < calendar.length; i++) {

        let day = document.createElement('div')
        day.setAttribute('class', 'day')

        let day_title = document.createElement('div')
        day_title.setAttribute('class', 'day_title')
        day_title.textContent = days[i]

        let day_content = document.createElement('div')
        day_content.setAttribute('class', 'day_content')

        // Create th etime blocks. 48 because 30 min
        for (let j = 0; j < calendar[i].length; j++) {

            let empty = (calendar[i][j] == null) ? true : false
            let colors = ['red', 'yellow', 'green']

            let block = document.createElement('div')
            block.setAttribute('class', `block ${empty ? 'empty' : ''}`)
            block.setAttribute('data-day', i)
            block.setAttribute('data-time', j)
            let color_style = (2 == 5 && empty == false) ? `background-color: ${colors[calendar[i][j].color]}` : ''
            block.setAttribute('style', `${empty ? '' : color_style}`)

            let block_start_time = document.createElement('div')
            block_start_time.setAttribute('class', `block_start_time`)
            block_start_time.textContent = get_time(j)

            let block_activity = document.createElement('div')
            block_activity.setAttribute('class', `block_activity`)
            if (empty == false) {
                block_activity.textContent = calendar[i][j].message
            }

            let block_stop_time = document.createElement('div')
            block_stop_time.setAttribute('class', `block_stop_time`)
            block_stop_time.textContent = get_time(j + 1)

            if (empty == false) {

                block.append(block_start_time, block_activity, block_stop_time)

            }

            block.onclick = function () {

                let day = this.getAttribute('data-day')
                let time = this.getAttribute('data-time')

                create_block(day, time, calendar[i][j])


            }

            day_content.append(block)

        }


        day.append(day_title, day_content)
        document.getElementById('calendar_container').append(day)

    }
}

// Create the friends
function create_friends(friends_data) {

    if (friends_data > 3) {
        friends_data.length = 3
    }

    for (let i = 0; i < friends_data.length; i++) {

        let friends = document.createElement('div')
        friends.setAttribute('class', 'friends')

        let friends_image_container = document.createElement('div')
        friends_image_container.setAttribute('class', 'friends_image_container')

        let friends_image = document.createElement('img')
        friends_image.setAttribute('class', 'friends_image')
        friends_image.setAttribute('src', '/images/dog')

        friends_image_container.append(friends_image)

        let friends_name_container = document.createElement('div')
        friends_name_container.setAttribute('class', 'friends_name_container')

        let friends_name = document.createElement('p')
        friends_name.setAttribute('class', 'friends_name')
        friends_name.textContent = friends_data[i]

        friends_name_container.append(friends_name)

        let friends_delete_container = document.createElement('div')
        friends_delete_container.setAttribute('class', 'friends_delete_container')
        friends_delete_container.onclick = function () {

            remove_friend(friends_data[i])

        }


        let friends_delete = document.createElement('p')
        friends_delete.setAttribute('class', 'friends_delete')
        friends_delete.textContent = '-'

        friends_delete_container.append(friends_delete)



        friends.append(friends_image_container, friends_name_container, friends_delete_container)

        document.getElementById('profile_friends_inner_container').append(friends)

    }

}

// Get time
function get_time(index) {

    let start, end;

    let hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
    let minutes = ['00', '30']

    s1 = hours[Math.floor(index / 2)]
    s2 = minutes[(index % 2)]

    return `${s1}:${s2}`

}

// Read the user calendar
function read_calendar() {

    let url = `/api/user/read_calendar`;

    let data = {

        email: email,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            let calendar = data.calendar || []

            create_calendar(calendar)



        })
        .catch(error => alert(error))

}

// Update the user calendar
function update_calendar(calendar_day_index, calendar_index, color, message, please_remove) {

    let url = `/api/user/update_calendar`;

    let data = {

        email: email,
        calendar_day_index: calendar_day_index,
        calendar_index: calendar_index,
        item: (please_remove == false) ? {
            color: color,
            message: message
        } : null

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            location.reload()

        })
        .catch(error => alert(error))

}

// Get a  user
function find_friend(username) {

    let url = `/api/user/find_friend`;

    let data = {

        username: username,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            create_friend_popup(data.friend)

        })
        .catch(error => alert(error))

}

// Get the users friends
function find_friends() {

    let url = `/api/user/find_friends`;

    let data = {

        email: email,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            create_friends(data.friends)

        })
        .catch(error => alert(error))

}

// Add the user friend
function add_friend(friend_username) {

    let url = `/api/user/add_friend`;

    let data = {

        email: email,
        friend_username: friend_username,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            location.reload()

        })
        .catch(error => alert(error))

}

// Remove the user friend
function remove_friend(friend_username) {

    let url = `/api/user/remove_friend`;

    let data = {

        email: email,
        friend_username: friend_username,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            location.reload()

        })
        .catch(error => alert(error))

}

// Remove the user friend
function remove_friend(friend_username) {

    let url = `/api/user/remove_friend`;

    let data = {

        email: email,
        friend_username: friend_username,

    }

    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(result => {

            return result.json()
        })
        .then(data => {

            location.reload()

        })
        .catch(error => alert(error))

}


// create_welcome('bob', 'bob', 'bob')
// remove_friend('yolo', 'checky')
// update_calendar(3, 2, 1, 'Lucky!! Really Long textx', false)

