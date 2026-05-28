const BASE_URL =
"https://job-portal-project-iv0v.onrender.com";

const userId =
localStorage.getItem("userId");

const userName =
localStorage.getItem("userName");

/* ========================= */
/* LOAD DASHBOARD */
/* ========================= */

loadDashboard();

async function loadDashboard(){

    const jobsResponse =
    await fetch(`${BASE_URL}/jobs`);

    const jobs =
    await jobsResponse.json();

    const appliedResponse =
    await fetch(
    `${BASE_URL}/applications/user/${userId}`
    );

    const applied =
    await appliedResponse.json();

    const savedResponse =
    await fetch(
    `${BASE_URL}/saved-jobs/user/${userId}`
    );

    const saved =
    await savedResponse.json();
    const res = await fetch(`${BASE_URL}/users/${userId}/completion`);
const completion = await res.json();
const userResponse =
await fetch(`${BASE_URL}/users/${userId}`);

const user =
await userResponse.json();

    document.getElementById("content")
    .innerHTML = `

    <!-- HERO -->

<div class="hero">

    <div>

        <h1>

            Welcome,
            ${userName} 👋

        </h1>

        <p>
            Find your dream jobs easily with SparkJobs.
        </p>

        <!-- SEARCH -->

        <div class="search-box">

            <i class="fa-solid fa-magnifying-glass"></i>

            <input type="text"
                   placeholder="Search jobs..."
                   onkeyup="searchJobs(this.value)">

        </div>

    </div>

    <!-- PROFILE PHOTO -->

    <div class="top-profile">

        <img
            id="dashboardProfile"

            src="${
                user.profileImage
                ?
                `${BASE_URL}/uploads/profile-images/${user.profileImage}`
                :
                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            }"

            alt="Profile"
        >

    </div>

</div>

    <!-- STATS -->

    <div class="stats">

        <div class="card blue">

            <div>

                <p>Total Jobs</p>

                <h2>${jobs.length}</h2>

            </div>

            <i class="fa-solid fa-briefcase"></i>

        </div>

        <div class="card green">

            <div>

                <p>Applied Jobs</p>

                <h2>${applied.length}</h2>

            </div>

            <i class="fa-solid fa-file-lines"></i>

        </div>

        <div class="card purple">

            <div>

                <p>Saved Jobs</p>

                <h2>${saved.length}</h2>

            </div>

            <i class="fa-solid fa-bookmark"></i>

        </div>

        <div class="card pink">

            <div>

                <p>Profile Completion</p>

                <h2>${completion}%</h2>

            </div>

            <i class="fa-solid fa-user-check"></i>

        </div>

    </div>

    <!-- JOB SECTION -->

    <div class="jobs-section">

        <h2>
            Latest Jobs
        </h2>

        <div class="jobs-container">

            ${jobs.map(job => `

            <div class="job-card">

                <h3>
                    ${job.title}
                </h3>

                <p>
                    <i class="fa-solid fa-building"></i>

                    ${job.company}
                </p>

                <p>
                    <i class="fa-solid fa-location-dot"></i>

                    ${job.location}
                </p>

                <p>
                    ₹ ${job.salary}
                </p>

               <div class="btn-group">

    <button onclick="applyJob(${job.id})">
        Apply
    </button>

    <button onclick="saveJob(${job.id})">
        Save
    </button>

</div>

            </div>

            `).join("")}

        </div>

    </div>

    `;
}

/* ========================= */
/* SEARCH JOBS */
/* ========================= */

function searchJobs(keyword){

    keyword =
    keyword.toLowerCase();

    const cards =
    document.querySelectorAll(".job-card");

    cards.forEach(card => {

        const text =
        card.innerText.toLowerCase();

        if(text.includes(keyword)){

            card.style.display = "block";
        }

        else{

            card.style.display = "none";
        }
    });
}

/* ========================= */
/* LOAD JOBS */
/* ========================= */
async function loadJobs(){

    const response =
    await fetch(`${BASE_URL}/jobs`);

    const jobs =
    await response.json();

    document.getElementById("content")
    .innerHTML = `

    <!-- TOP -->

    <div class="page-header">

        <h1>Browse Jobs</h1>

        <p>
            Find your dream jobs easily
        </p>

    </div>

    <!-- SEARCH -->

    <div class="search-container">

        <i class="fa-solid fa-magnifying-glass"></i>

        <input type="text"
               placeholder="Search jobs..."
               onkeyup="searchJobs(this.value)">
    </div>

    <!-- JOBS -->

    <div class="jobs-container">

        ${jobs.map(job => `

        <div class="job-card">

            <div class="job-top">

                <h2>${job.title}</h2>

                <span class="salary">
                    ₹ ${job.salary}
                </span>

            </div>

            <p>

                <i class="fa-solid fa-building"></i>

                ${job.company}

            </p>

            <p>

                <i class="fa-solid fa-location-dot"></i>

                ${job.location}

            </p>

            <!-- BUTTONS -->

            <div class="job-buttons">

                <button class="apply-btn"
                        onclick="applyJob(${job.id})">

                    Apply

                </button>

                <button class="save-btn"
                        onclick="saveJob(${job.id})">

                    Save

                </button>

                <button class="view-btn"
                        onclick='viewJob(${JSON.stringify(job)})'>

                    View

                </button>

            </div>

        </div>

        `).join("")}

    </div>

    <!-- POPUP -->

    <div id="jobModal"
         class="job-modal">

        <div class="job-modal-content">

            <span class="close-modal"
                  onclick="closeModal()">

                &times;

            </span>

            <div id="jobDetails"></div>

        </div>

    </div>

    `;
}


/* ========================= */
/* VIEW JOB POPUP */
/* ========================= */

function viewJob(job){

    document.getElementById("jobModal")
    .style.display = "flex";

    document.getElementById("jobDetails")
    .innerHTML = `

        <h2>${job.title}</h2>

        <p>
            <b>Company:</b>
            ${job.company}
        </p>

        <p>
            <b>Location:</b>
            ${job.location}
        </p>

        <p>
            <b>Salary:</b>
            ₹ ${job.salary}
        </p>

        <p>
            <b>Description:</b>
            ${job.description}
        </p>

    `;
}

/* ========================= */
/* CLOSE MODAL */
/* ========================= */

function closeModal(){

    document.getElementById("jobModal")
    .style.display = "none";
}

/* ========================= */
/* APPLY JOB */
/* ========================= */
async function applyJob(jobId){

    const response = await fetch(

        `${BASE_URL}/applications?userId=${userId}&jobId=${jobId}`,

        {
            method:"POST"
        }
    );

    const message =
    await response.text();

    alert(message);

    // REDIRECT TO PROFILE
    if(message.includes("resume")){

        loadProfile();
    }
}
/* ========================= */
/* SAVE JOB */
/* ========================= */
async function saveJob(jobId){

    const response =
    await fetch(

        `${BASE_URL}/saved-jobs/save?userId=${userId}&jobId=${jobId}`,

        {
            method:"POST"
        }
    );

    const message =
    await response.text();

    alert(message);

    loadDashboard();
}


/* ========================= */
/* APPLIED JOBS */
/* ========================= */

async function loadAppliedJobs(){

    const response =
    await fetch(
        `${BASE_URL}/applications/user/${userId}`
    );

    const data =
    await response.json();

    document.getElementById("content")
    .innerHTML = `

    <div class="jobs-page">

        <!-- HEADER -->

        <div class="page-header">

            <div>

                <h1>
                    Applied Jobs
                </h1>

                <p>
                    Track all your job applications
                </p>

            </div>

        </div><br><br><br>

        <!-- TABLE -->

        <div class="table-container">

            <table class="job-table">

                <thead>

                    <tr>

                        <th>Role</th>

                        <th>Company</th>

                        <th>Location</th>

                        <th>Salary</th>

                        <th>Resume</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${data.map(app => `

                    <tr>

                        <td>
                            ${app.job
                                ? app.job.title
                                : "N/A"}
                        </td>

                        <td>
                            ${app.job
                                ? app.job.company
                                : "N/A"}
                        </td>

                        <td>
                            ${app.job
                                ? app.job.location
                                : "N/A"}
                        </td>

                        <td>
                            ${app.job
                                ? app.job.salary
                                : "N/A"}
                        </td>

                        <td>

                            ${app.user?.resume

                                ?

                                `<a class="resume-btn"
                                    href="${BASE_URL}/uploads/resumes/${app.user.resume}"
                                    target="_blank">

                                    View Resume

                                </a>`

                                :

                                "No Resume"
                            }

                        </td>

                       <td>

    <div class="action-cell">

        <span class="status ${app.status}">
            ${app.status}
        </span>

        <button class="delete-btn"
                onclick="deleteApplication(${app.id})">

            Delete

        </button>

    </div>

</td>

                    </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    </div>

    `;
}

async function deleteApplication(applicationId){

    const confirmDelete =
    confirm("Delete this application?");

    if(!confirmDelete){

        return;
    }

    await fetch(

        `${BASE_URL}/applications/${applicationId}`,

        {
            method:"DELETE"
        }
    );

    alert("Application Deleted");

    loadAppliedJobs();
}
/* ========================= */
/* SAVED JOBS */
/* ========================= */
async function loadSavedJobs(){

    const response =
    await fetch(
        `${BASE_URL}/saved-jobs/user/${userId}`
    );

    const jobs =
    await response.json();

    document.getElementById("content")
    .innerHTML = `

    <div class="jobs-page">

        <!-- TOPBAR -->

        <div class="page-header">

            <div>

                <h1>
                    Saved Jobs
                </h1>

                <p>
                    Your bookmarked opportunities
                </p>

            </div>

        </div><br><br><br>

        <!-- JOBS -->

        <div class="jobs-container">

            ${
                jobs.length > 0
                ?

                jobs.map(saved => `

                <div class="job-card">

                    <div class="job-top">

                        <h3>
                            ${saved.job.title}
                        </h3>

                        <span class="saved-badge">

                            Saved

                        </span>

                    </div>

                    <p>

                        <i class="fa-solid fa-building"></i>

                        ${saved.job.company}

                    </p>

                    <p>

                        <i class="fa-solid fa-location-dot"></i>

                        ${saved.job.location}

                    </p>

                    <p class="salary">

                        ₹ ${saved.job.salary}

                    </p>

                    <div class="btn-group">

                        <button onclick="applyJob(${saved.job.id})">

                            Apply Now

                        </button>

                        <button class="delete-btn"
                                onclick="removeSavedJob(${saved.id})">

                            Remove

                        </button>

                    </div>

                </div>

                `).join("")

                :

                `

                <div class="empty-box">

                    <i class="fa-solid fa-bookmark"></i>

                    <h2>
                        No Saved Jobs
                    </h2>

                    <p>
                        Save jobs to view them here
                    </p>

                </div>

                `
            }

        </div>

    </div>

    `;
}

async function removeSavedJob(savedId){

    const confirmDelete =
    confirm("Remove this saved job?");

    if(!confirmDelete){

        return;
    }

    await fetch(

        `${BASE_URL}/saved-jobs/${savedId}`,

        {
            method:"DELETE"
        }
    );

    alert("Removed Successfully");

    loadSavedJobs();
}


let selectedImageFile = null;
let selectedResumeFile = null;

/* ========================= */
/* PROFILE */
/* ========================= */
async function loadProfile(){

    const response =
    await fetch(`${BASE_URL}/users/${userId}`);

    const user =
    await response.json();

    document.getElementById("content")
    .innerHTML = `
       
        <div class="page-header">

            <div>

                <h1>
                    My Profile
                </h1>

                <p>
                     Manage your professional profile details
                </p>

            </div>
        </div>

        
        <div class="profile-card">

            <!-- IMAGE SECTION -->

            <div class="profile-image-section">

                <!-- PROFILE IMAGE -->

                
                <img id="profilePreview"
                    src="${
                        user.profileImage
                        ? `${BASE_URL}/uploads/profile-images/${user.profileImage}`
                        : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                    }"
                alt="Profile">

                <!-- CUSTOM IMAGE BUTTON -->

                <label class="upload-btn">

                    <i class="fa-solid fa-camera"></i>

                    Upload Photo

                    <input type="file"
                           id="profileImage"
                           hidden>

                </label>

            </div>

            <!-- PROFILE FORM -->

            <div class="profile-form">

                <!-- NAME -->

                 <div class="input-group">

                <label>Name</label>

                <input type="text"
                       id="name"
                       value="${user.name || ""}">

                </div>
                <!-- EMAIL -->
                <div class="input-group">

                <label>Email</label>

                <input type="email"
                       id="email"
                       value="${user.email || ""}">

                </div>

                <!-- SKILLS -->

                <div class="input-group">

                <label>Skills</label>

                <input type="text"
                       id="skills"
                       value="${user.skills || ""}">

            </div>

            <div class="input-group">

                <label>Bio</label>

                <textarea id="bio">${
                    user.bio || ""
                }</textarea>

            </div>

            <!-- RESUME -->

            <div class="input-group">

                <label>Resume</label>

                <label class="upload-btn">

                    <i class="fa-solid fa-file-arrow-up"></i>

                    Upload Resume

                    <input type="file"
                           id="resume"
                           hidden>

                </label>

                ${
                    user.resume
                    ?
                    `<a class="resume-link"
                        href="${BASE_URL}/uploads/resumes/${user.resume}"
                        target="_blank">

                        View Resume

                    </a>`
                    :
                    ""
                }

            </div>

            <!-- BUTTON -->

            <button class="update-btn"
                    onclick="updateProfile()">

                <i class="fa-solid fa-floppy-disk"></i>

                Update Profile

            </button>
            </div>

        </div>

    <!-- IMAGE MODAL -->

    <div id="imageModal"
         class="image-modal">

        <span class="close-btn">

            &times;

        </span>

        <img id="fullImage">

    </div>

    `;
 document.getElementById("profileImage")
.addEventListener("change", function(){

    selectedImageFile = this.files[0];

    if(selectedImageFile){

        document.getElementById("profilePreview").src =
        URL.createObjectURL(selectedImageFile);
    }
});

document.getElementById("resume")
.addEventListener("change", function(){

    selectedResumeFile = this.files[0];

    if(selectedResumeFile){

        alert("New Resume Selected");
    }
});

    // =============================
    // IMAGE MODAL
    // =============================

    const profilePreview =
    document.getElementById("profilePreview");

    const imageModal =
    document.getElementById("imageModal");

    const fullImage =
    document.getElementById("fullImage");

    const closeBtn =
    document.querySelector(".close-btn");

    profilePreview.addEventListener("click", () => {

        imageModal.style.display = "flex";

        fullImage.src =
        profilePreview.src;
    });

    closeBtn.addEventListener("click", () => {

        imageModal.style.display = "none";
    });

    imageModal.addEventListener("click", (e) => {

        if(e.target === imageModal){

            imageModal.style.display = "none";
        }
    });
}
async function updateProfile(){

    try{

        const data = {

            name:
            document.getElementById("name").value,

            email:
            document.getElementById("email").value,

            skills:
            document.getElementById("skills").value,

            bio:
            document.getElementById("bio").value
        };

        // UPDATE TEXT DATA

        const profileResponse = await fetch(

            `${BASE_URL}/users/${userId}`,

            {
                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)
            }
        );
        const confirmUpdate =
    confirm("Do you want to update profile?");

    if(!confirmUpdate){

        return;
    }

        // IMAGE UPLOAD

        if(selectedImageFile){

            const imageData = new FormData();

            imageData.append("file", selectedImageFile);

            await fetch(

                `${BASE_URL}/users/${userId}/upload-image`,

                {
                    method:"POST",
                    body:imageData
                }
            );
        }

        // RESUME UPLOAD

        if(selectedResumeFile){

            const resumeData = new FormData();

            resumeData.append("file", selectedResumeFile);

            await fetch(

                `${BASE_URL}/users/${userId}/upload-resume`,

                {
                    method:"POST",
                    body:resumeData
                }
            );
        }

        alert("Profile Updated Successfully");

        selectedImageFile = null;
        selectedResumeFile = null;

        loadProfile();

    }
    catch(error){

        console.log(error);

        alert("Something Went Wrong");
    }
}
window.onclick = function(event){

    const modal =
    document.getElementById("jobModal");

    if(event.target == modal){

        closeModal();
    }
}
/* ========================= */
/* LOGOUT */
/* ========================= */

function logout(){

    localStorage.clear();

    window.location.href =
    "login.html";
}