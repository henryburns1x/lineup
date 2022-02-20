window.onload = function () {

    create_home()
    create_calendar()
    create_recommendation()
    create_friends()

}

// Create the home page
function create_home() {

    let html = `

        <div id="left_container">

            <div id="logo_container">

            📈

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

                    <div id="profile_icon">

                    </div> 

                </div> 

                <div id="profile_content_container">

                    <div id="profile_name_container">

                        Ben Dover

                    </div> 

                    <div id="profile_quote_container">
            
                        “Nothing is impossible. The word itself says ‘I’m possible!'”
                        <br>
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

// Create the calendar
function create_calendar() {

    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

    for (let i = 0; i < 7; i++) {

        let day = document.createElement('div')
        day.setAttribute('class', 'day')

        let day_title = document.createElement('div')
        day_title.setAttribute('class', 'day_title')
        day_title.textContent = days[i]

        let day_content = document.createElement('div')
        day_content.setAttribute('class', 'day_content')


        // Create th etime blocks. 48 because 30 min
        for (let i = 0; i < 48; i++) {

            let empty = (i % 2 == 0) ? true : false

            let block = document.createElement('div')
            block.setAttribute('class', `block ${empty ? 'empty' : ''}`)

            let block_start_time = document.createElement('div')
            block_start_time.setAttribute('class', `block_start_time`)
            block_start_time.textContent = '7:30'

            let block_activity = document.createElement('div')
            block_activity.setAttribute('class', `block_activity`)
            block_activity.textContent = 'Lorem this is an activity'

            let block_stop_time = document.createElement('div')
            block_stop_time.setAttribute('class', `block_stop_time`)
            block_stop_time.textContent = '8:30'

            if (empty == false) {

                block.append(block_start_time, block_activity, block_stop_time)

            }

            day_content.append(block)

        }


        day.append(day_title, day_content)
        document.getElementById('calendar_container').append(day)

    }




}

// Create the recommendation
function create_recommendation() {

    let url = `/api/user/recommendation`;

    email = 'yolo'

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

            let recommendation = document.createElement('div')
            recommendation.setAttribute('class', 'recommendation')
    
            let recommendation_profile_container = document.createElement('div')
            recommendation_profile_container.setAttribute('class', 'recommendation_profile_container')
    
            let recommendation_profile_image_container = document.createElement('div')
            recommendation_profile_image_container.setAttribute('class', 'recommendation_profile_image_container')
    
            let recommendation_profile_image = document.createElement('img')
            recommendation_profile_image.setAttribute('class', 'recommendation_profile_image')
            recommendation_profile_image.setAttribute('src', '')
    
            recommendation_profile_image_container.append(recommendation_profile_image)
    
            let recommendation_profile_name_container = document.createElement('div')
            recommendation_profile_name_container.setAttribute('class', 'recommendation_profile_name_container')
    
            let recommendation_profile_name = document.createElement('p')
            recommendation_profile_name.setAttribute('class', 'recommendation_profile_name')
            recommendation_profile_name.textContent = 'Lebron James'
    
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
            recommendation_date.textContent = 'Mon'
    
            let recommendation_time = document.createElement('p')
            recommendation_time.setAttribute('class', 'recommendation_time')
            recommendation_time.textContent = '⏰ 06:00am to 08:30am'
    
            recommendation_date_container.append(recommendation_date, recommendation_time)
    
            // Options section
            let recommendation_options_container = document.createElement('div')
            recommendation_options_container.setAttribute('class', 'recommendation_options_container')
    
            let recommendation_cancel = document.createElement('button')
            recommendation_cancel.setAttribute('class', 'recommendation_cancel')
            recommendation_cancel.textContent = '(X) Cancel'
    
            let recommendation_ok = document.createElement('button')
            recommendation_ok.setAttribute('class', 'recommendation_ok')
            recommendation_ok.textContent = 'Invite'
    
            recommendation_options_container.append(recommendation_cancel, recommendation_ok)
    
            recommendation.append(recommendation_profile_container, recommendation_subject_container, recommendation_date_container, recommendation_options_container)
    
            document.getElementById('recommendation_inner_container').append(recommendation)
    
        }
    

    })
    .catch(error => alert(error))



}

// Create the friends
function create_friends() {

    for (let i = 0; i < 3; i++) {

        let friends = document.createElement('div')
        friends.setAttribute('class', 'friends')

        let friends_image_container = document.createElement('div')
        friends_image_container.setAttribute('class', 'friends_image_container')

        let friends_image = document.createElement('img')
        friends_image.setAttribute('class', 'friends_image')
        friends_image.setAttribute('src', '')

        friends_image_container.append(friends_image)

        let friends_name_container = document.createElement('div')
        friends_name_container.setAttribute('class', 'friends_name_container')

        let friends_name = document.createElement('p')
        friends_name.setAttribute('class', 'friends_name')
        friends_name.textContent = "Joe Mama"

        friends_name_container.append(friends_name)

        friends.append(friends_image_container, friends_name_container)

        document.getElementById('profile_friends_inner_container').append(friends)

    }

}

// Create Sign up & In popup
function create_welcome(email, username, password) {

    let html = `
        

    
    `

    // let emial = document.getElementById('email').value
    // let username = document.getElementById('username').value
    // let password = document.getElementById('password').value

    let url = `/api/user/sign_up`;

    let data = {

        email: email,
        username: username,
        password: password

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

        console.log(data)

    })
    .catch(error => alert(error))

}

// Read the user calendar
function read_calendar() {

    let url = `/api/user/read_calendar`;

    email = 'yolo'

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

        console.log(data)

    })
    .catch(error => alert(error))

}

// Update the user calendar
function update_calendar(email, calendar_index, color, message, please_remove) {

    let url = `/api/user/update_calendar`;

    let data = {

        email: email,
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

        console.log(data)

    })
    .catch(error => alert(error))

}

// Add the user friend
function add_friend(email, friend_username) {

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

        console.log(data)

    })
    .catch(error => alert(error))

}

// Remove the user friend
function remove_friend(email, friend_username) {

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

        console.log(data)

    })
    .catch(error => alert(error))

}


// remove_friend('yolo', 'checky')
// create_welcome('bob', 'checky', '1234')
// update_calendar('bob', 0, 1, 'Bob', false)

// read_calendar()
