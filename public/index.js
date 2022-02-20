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
            
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but 

                    </div> 

                </div> 

                <div id="profile_friends_container">

                    <div id="profile_friends_header">

                        Friends

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
            block.setAttribute('class', `block ${empty ? 'empty' : '' }`)

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

    for (let i = 0; i < 10; i++) {

        let recommendation = document.createElement('div')
        recommendation.setAttribute('class', 'recommendation')

        document.getElementById('recommendation_inner_container').append(recommendation)

    }

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