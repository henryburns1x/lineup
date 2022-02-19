window.onload = function () {

    create_home()

}

// Create the home page
function create_home() {

    let html = `

        <div id="left_container">

            <div id="logo_container">



            </div> 

            <div id="navigation_container">

                <div id="navigation_inner_container">


                </div> 

            </div> 


        </div> 

        <div id="middle_container">

            <div id="profile_container">

                <div id="profile_container">


                </div> 


            </div> 

            <div id="recommendation_container">


            </div> 

            <div id="calendar_container">

                

            </div> 

        </div> 

        <div id="right_container">




        </div> 
    
    `
    document.body.innerHTML = html


}