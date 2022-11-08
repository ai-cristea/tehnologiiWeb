const url = "http://localhost:8080/api"

async function get(url){
    return (await axios.get(url)).data
}

async function post(url, body){
    return (await axios.post(url, JSON.stringify(body), {
        headers: {"Content-Type": "application/json"}
    })).data;
}

async function addTask(){
    let task = document.getElementById("inputTask").value;

    if (!task){
        alert("task nu trebuie sa gol")
        return
    }

    await post(url + "/addTask", {title: task, isDone: false})
    await loadTable();
}

async function loadTable(){
    let data = await get(url + "/getTasks")

    let tableDiv = document.getElementById("tableData")

    if (!data || !tableDiv){
        return
    }

    let myHTMLCode = [];
    myHTMLCode.push("<table id='taskTable'>");
    myHTMLCode.push("<thead>")
    myHTMLCode.push("<tr> <th> Task </th> <th> isDone </th> </tr>")
    myHTMLCode.push("</thead>")
    myHTMLCode.push("<tbody>")

    for (let item of data){
        myHTMLCode.push("<tr> <td> " + item.title + "  </td> <td> <input type='checkbox' value='" + item.title + "'")
        if (item.isDone)    
            myHTMLCode.push(" checked " )
        myHTMLCode.push("> </td> </tr>")
    }

    myHTMLCode.push("</tbody>")
    myHTMLCode.push("<table>");

    tableDiv.innerHTML = myHTMLCode.join("")
}

loadTable();

about = document.getElementById("menuAbout")
tasks = document.getElementById("menuTasks")
contact = document.getElementById("menuContact")

about.onclick = function(){
    document.getElementById("about").style.display = "block"
    document.getElementById("contact").style.display = "none"
    document.getElementById("tasks").style.display = "none"
}

tasks.onclick = function(){
    document.getElementById("about").style.display = "none"
    document.getElementById("contact").style.display = "none"
    document.getElementById("tasks").style.display = "block"
}

contact.onclick = function(){
    document.getElementById("about").style.display = "none"
    document.getElementById("contact").style.display = "block"
    document.getElementById("tasks").style.display = "none"
}