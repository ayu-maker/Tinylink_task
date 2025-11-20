window.onload=()=>{
    loadLinks();
};

async function loadLinks(){
    const res=await fetch("/api/links");
    const links=await res.json();

    const tableBody=document.getElementById("linksTableBody");
    tableBody.innerHTML="";

    links.forEach(link=>{
        const row=`
          <tr>
                <td>${link.code}</td>
                <td><a href="${link.url}" target="_blank">${link.url}</a></td>
                <td>${link.clicks}</td>
                <td>${link.lastClicked || "-"}</td>
                
                <td>
                    <button onclick="deleteLink('${link.code}')">Delete</button>
                </td>
                <td>
                    <a href="/stats.html?code=${link.code}">
                    <button>View</button>
    </a>
</td>
            </tr>
        `;
        tableBody.innerHTML+=row;
    });
}

document.getElementById("addLinkForm").addEventListener("submit",async function(e){
    const url=document.getElementById("urlInput").value;
    const code=document.getElementById("codeInput").value;

    const res=await fetch("/api/links",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({url,code})
    });

    const data=await res.json();

    if(res.status===409){
        document.getElementById("formMessage").textContent="Code already exists";

    }else{
        document.getElementById("formMessage").textContent="Link created";
        loadLinks();
    }
});

async function deleteLink(code) {
    await fetch(`/api/links/${code}`,{
        method:"DELETE"
    });
    loadLinks();
    
}

//add healthcheck UI 

document.getElementById("healthBtn").addEventListener("click", async () => {
    const btn = document.getElementById("healthBtn");
    const box = document.getElementById("healthBox");

    // If box is currently hidden → show health status
    if (box.style.display === "none") {
        box.style.display = "block";
        btn.textContent = "Hide Healthcheck"; 
        box.textContent = "Checking system health...";

        try {
            const res = await fetch("/healthz");
            const data = await res.json();
            box.textContent = JSON.stringify(data, null, 2); 
        } catch (err) {
            box.textContent = "Failed to fetch health data.";
        }

    } else {
        // If box is visible - hide it
        box.style.display = "none";
        btn.textContent = "Health Check"; 
    }
});
