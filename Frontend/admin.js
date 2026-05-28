const BASE_URL =
"http://localhost:8080";

/* ========================= */
/* DEFAULT PAGE */
/* ========================= */

loadDashboard();

/* ========================= */
/* DASHBOARD */
/* ========================= */
async function loadDashboard(){

    const jobsResponse =
    await fetch(`${BASE_URL}/jobs`);

    const jobs =
    await jobsResponse.json();

    const appResponse =
    await fetch(`${BASE_URL}/applications`);

    const applications =
    await appResponse.json();

    document.getElementById("content")
    .innerHTML = `

    <!-- HERO -->

    <div class="hero">

        <div class="hero-left">

            <h1>
                Welcome Admin 👋
            </h1>

            <p>
                Manage jobs, applications and monitor platform activity.
            </p>

            <button onclick="loadAddJob()">

                Add New Job

            </button>

        </div>

        <div class="hero-right">

            <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png">

        </div>

    </div>

    <!-- STATS -->

    <div class="stats">

        <div class="card">

            <div>

                <h3>Total Jobs</h3>

                <h2>${jobs.length}</h2>

            </div>

            <i class="fa-solid fa-briefcase"></i>

        </div>

        <div class="card">

            <div>

                <h3>Applications</h3>

                <h2>${applications.length}</h2>

            </div>

            <i class="fa-solid fa-file-lines"></i>

        </div>

        <div class="card">

            <div>

                <h3>Approved</h3>

                <h2>

                    ${applications.filter(
                        app => app.status === "APPROVED"
                    ).length}

                </h2>

            </div>

            <i class="fa-solid fa-circle-check"></i>

        </div>

        <div class="card">

            <div>

                <h3>Pending</h3>

                <h2>

                    ${applications.filter(
                        app => app.status === "APPLIED"
                    ).length}

                </h2>

            </div>

            <i class="fa-solid fa-clock"></i>

        </div>

    </div>

    <!-- QUICK ACTIONS -->

    `;
}

async function loadUsers(){

    const response =
    await fetch(`${BASE_URL}/users`);

    const users =
    await response.json();

    document.getElementById("content").innerHTML = `

    <div class="table-container">

        <h2>Manage Users</h2><br><br>

        <table>

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Skills</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody>

                ${users.map(user => `

                    <tr>

                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.skills || '-'}</td>
                        <td>${user.role}</td>

                        <td>

                            <button class="delete-btn"
                                    onclick="deleteUser(${user.id})">

                                Delete

                            </button>

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    </div>

    `;
}
async function deleteUser(id){

    if(!confirm("Are you sure to delete this user?")){
        return;
    }

    const response =
    await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE"
    });

    if(response.ok){

        alert("User Deleted Successfully");
        loadUsers();

    }else{

        alert("Delete Failed");
    }
}
/* ========================= */
/* LOAD ADD JOB */
/* ========================= */

function loadAddJob(){

    document.getElementById("content")
    .innerHTML = `

    <div class="form-container">

        <h2>Add Job</h2>

        <form id="jobForm">

            <input type="text"
                   id="title"
                   placeholder="Job Title"
                   required>

            <input type="text"
                   id="company"
                   placeholder="Company"
                   required>

            <input type="text"
                   id="location"
                   placeholder="Location"
                   required>

            <input type="text"
                   id="salary"
                   placeholder="Salary"
                   required>

            <textarea id="description"
                      placeholder="Description"
                      rows="5"
                      required></textarea>

            <button type="submit">

                Add Job

            </button>

        </form>

    </div>

    `;

    document.getElementById("jobForm")
    .addEventListener("submit", addJob);
}

/* ========================= */
/* ADD JOB */
/* ========================= */

async function addJob(e){

    e.preventDefault();

    const job = {

        title:
        document.getElementById("title").value,

        company:
        document.getElementById("company").value,

        location:
        document.getElementById("location").value,

        salary:
        document.getElementById("salary").value,

        description:
        document.getElementById("description").value
    };

    await fetch(`${BASE_URL}/jobs`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(job)
    });

    alert("Job Added Successfully");

    loadJobs();
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

    <div class="table-container">

        <h2 style="margin-bottom:20px;">

            Manage Jobs

        </h2>

        <table>

            <thead>

                <tr>

                    <th>Role</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                ${jobs.map(job => `

                <tr>

                    <td>

                        ${job.title}

                    </td>

                    <td>

                        ${job.company}

                    </td>

                    <td>

                        ${job.location}

                    </td>

                    <td>

                        ${job.salary}

                    </td>

                    <td>

                        <button class="edit-btn"
                                onclick="editJob(${job.id})">

                            Edit

                        </button>

                        <button class="delete-btn"
                                onclick="deleteJob(${job.id})">

                            Delete

                        </button>

                    </td>

                </tr>

                `).join("")}

            </tbody>

        </table>

    </div>

    `;
}
async function editJob(id){

    const response =
    await fetch(`${BASE_URL}/jobs/${id}`);

    const job =
    await response.json();

    document.getElementById("content")
    .innerHTML = `

    <div class="form-container">

        <h2 style="margin-bottom:20px;">

            Edit Job

        </h2>

        <form id="editJobForm">

            <input type="text"
                   id="title"
                   value="${job.title}"
                   placeholder="Job Title"
                   required>

            <input type="text"
                   id="company"
                   value="${job.company}"
                   placeholder="Company"
                   required>

            <input type="text"
                   id="location"
                   value="${job.location}"
                   placeholder="Location"
                   required>

            <input type="text"
                   id="salary"
                   value="${job.salary}"
                   placeholder="Salary"
                   required>

            <textarea id="description"
                      rows="5"
                      required>${job.description}</textarea>

            <button type="submit">

                Update Job

            </button>

        </form>

    </div>

    `;

    document.getElementById("editJobForm")
    .addEventListener("submit",
    function(e){

        updateJob(e,id);
    });
}
async function updateJob(e,id){

    e.preventDefault();

    const updatedJob = {

        title:
        document.getElementById("title").value,

        company:
        document.getElementById("company").value,

        location:
        document.getElementById("location").value,

        salary:
        document.getElementById("salary").value,

        description:
        document.getElementById("description").value
    };

    await fetch(`${BASE_URL}/jobs/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(updatedJob)
    });

    alert("Job Updated Successfully");

    loadJobs();
}

/* ========================= */
/* DELETE JOB */
/* ========================= */

async function deleteJob(id){

    const confirmDelete =
    confirm("Delete this job?");

    if(!confirmDelete){
        return;
    }

    await fetch(`${BASE_URL}/jobs/${id}`,{

        method:"DELETE"
    });

    alert("Job Deleted");

    loadJobs();
}

/* ========================= */
/* APPLICATIONS */
/* ========================= */

async function loadApplications(){

    const response =
    await fetch(`${BASE_URL}/applications`);

    const applications =
    await response.json();

    document.getElementById("content")
    .innerHTML = `

    <div class="table-container">

        <h2 style="margin-bottom:20px;">
            Applications
        </h2>

        <table>

            <thead>

                <tr>

                    <th>User</th>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Resume</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                ${applications.map(app => `

                <tr>

                    <td>
                        ${app.user?.name || "N/A"}
                    </td>

                    <td>
                        ${app.job?.title || "N/A"}
                    </td>

                    <td>
                        ${app.job?.company || "N/A"}
                    </td>

                    <td>
                        ${app.job?.location || "N/A"}
                    </td>

                    <td>

                        <span class="status ${app.status}">
                            ${app.status}
                        </span>

                    </td>

                    <td>

                        ${app.user?.resume
                            ? `<a href="http://localhost:8080/uploads/resumes/${app.user.resume}" target="_blank">
                                View
                               </a>`
                            : "No Resume"}

                    </td>

                    <td>

    <button class="approve-btn"
            onclick="updateStatus(${app.id},'APPROVED')">

        Approve

    </button>

    <button class="reject-btn"
            onclick="updateStatus(${app.id},'REJECTED')">

        Reject

    </button>

</td>

                </tr>

                `).join("")}

            </tbody>

        </table>

    </div>

    `;
}

/* ========================= */
/* UPDATE STATUS */
/* ========================= */

async function updateStatus(id,status){

    try{

        const response = await fetch(

            `${BASE_URL}/applications/${id}?status=${status}`,

            {
                method:"PUT"
            }
        );

        if(response.ok){

            alert("Status Updated");

            loadApplications();

        }else{

            alert("Failed To Update");
        }

    }catch(error){

        console.log(error);

        alert("Server Error");
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