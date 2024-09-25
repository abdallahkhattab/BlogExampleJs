function setupUi() {

    const token = localStorage.getItem("token");
    const loginDiv = document.getElementById('login-div');
    const logoutBtn = document.getElementById('logout-div');
    const addPost = document.getElementById('add-btn');
    const userName = document.getElementById('userName');


    if(token == null){

        loginDiv.style.setProperty("display","block","important");
        logoutBtn.style.setProperty("display","none","important");
        addPost.style.setProperty("display","none","important");
        userName.style.setProperty("display","none","important");


    }else{
        loginDiv.style.setProperty("display","none","important");
        logoutBtn.style.setProperty("display","flex","important");
        addPost.style.setProperty("display","block","important");
        userName.style.setProperty("display","flex","important");
    }
    // Hide the logout button
  }


  let baseUrl = "https://tarmeezacademy.com/api/v1";

          //REGISTER
          function registerBtnClicked() {
            const username = document.getElementById('registerUserName').value;
            const name = document.getElementById('registerName').value;
            const password = document.getElementById('registerPassword').value;
            const image = document.getElementById('registerUserInput').files[0];  // This gets the uploaded image file
        
            // Create a FormData object and append form fields
            const formData = new FormData();
            formData.append('username', username);
            formData.append('name', name);
            formData.append('password', password);
            formData.append('image', image);  // Make sure to append with the correct key 'profile_image'
        
            // Axios POST request to register
            axios.post(`${baseUrl}/register`, formData)
                .then(function (response) {
                    console.log(response.data);
        
                    // Store token and user data in local storage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));  // Save user data correctly
        
                    // Extract the username and profile image from the response
                    let user = response.data.user;
                    let profileImage = user.profile_image;
        
                    // Set the image and display the username
                    document.getElementById('userImageDiv').innerHTML = `
                        <img id="profile_image_user" src="${profileImage}" 
                        alt="User Avatar" class="rounded-circle border border-2 me-2" style="width: 40px; height: 40px;">`;
        
                    // Display the username
                    document.getElementById('userName').textContent = user.username;
        
                    // Close the registration modal and show a success alert
                    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                    const message = "User created successfully";
                    showSuccessAlert(message);
                    setupUi();
        
                    if (modal) {
                        modal.hide();
                    }
                })
                .catch(function (error) {
                    const message = error.response?.data?.message || "An error occurred";
                    console.log(error);
                    showDangerAlert(message);
                });
        }
        
        
        //LOGIN

    function loginBtnClicked() {
        event.preventDefault();

        let username = document.getElementById("username-input").value;
        let password = document.getElementById("password-input").value;

        let success = 200;
        let fail = 422;
        console.log(username, password);

        axios.post(`${baseUrl}/login`, {
            username: username,
            password: password
        })
            .then(function (response) {
                if(response.status == success){
                    let token = response.data.token;
                    localStorage.setItem('token', token); 
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    const name = response.data.user.username;
            let profileImage = response.data.user.profile_image;
            document.getElementById('userImageDiv').innerHTML = `<img id = "profile_image_user"src="${profileImage}"
 alt="User Avatar" class="rounded-circle border border-2 me-2" style="width: 40px; height: 40px;">
`;

document.getElementById('userName').textContent = name;

            console.log(profileImage);

            // Set the image and display the username
             // Set the image in the DOM




                    document.getElementById('userName').innerHTML= response.data.user.username;

                    console.log(response.data);
                  const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                  let message = "logged in successfully"
                  showSuccessAlert(message);
                  setupUi();
                  if(modal){
                    modal.hide();
                  }
                 
                }
                
            })
            .catch(function (error) {
                if(response.status == fail){
                    console.log("User not found");

                }
                console.error(error);
            });


    }


function showSuccessAlert(message){
const alertPlaceholder = document.getElementById('successAlert')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

    appendAlert(message, 'success')

    setTimeout(() => {
    const alertHide = bootstrap.Alert.getOrCreateInstance('#successAlert')
    alertHide.close();

        
    }, 3000);

  

    }

function showDangerAlert(message){
const alertPlaceholder = document.getElementById('dangerAlert')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

    appendAlert(message, 'danger');
  

    }

    function logout(){
        localStorage.removeItem("token");
        window.location.reload();
        showDangerAlert();
        setupUi();
      }

      // This function will run every time the page loads
window.onload = function() {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
        // Display the username
        document.getElementById('userName').textContent = user.name;
        
        // Display the profile image
        const profileImage = user.profile_image; // Ensure the image path is correct
        document.getElementById('userImageDiv').innerHTML = `
            <img id="profile_image_user" src="${profileImage}" 
            alt="User Avatar" class="rounded-circle border border-2 me-2" style="width: 40px; height: 40px;">`;
    }
};






