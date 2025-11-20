const params = new URLSearchParams(window.location.search);
const code=params.get("code");

if(!code){
    document.getElementById("statsBox").innerHTML="<p>No code provided</p>";
}else{
    loadStats(code);
}

async function loadStats(code) {
    const res=await fetch(`/api/links/${code}`);
    const link=await res.json();

    if(res.status===404){
        document.getElementById("statsBox").innerHTML="<p>Link not found </p>";
        return;
    }

    document.getElementById("code").textContent=link.code;
    document.getElementById("url").textContent=link.url;
    document.getElementById("url").href=link.url;
    document.getElementById("clicks").textContent=link.clicks;
    document.getElementById("createdAt").textContent=link.createdAt;
    document.getElementById("lastClicked").textContent=link.lastClicked || "-";
    
}