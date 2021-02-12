document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

// const closeIssue = id => {
//   const issues = JSON.parse(localStorage.getItem('issues'));
//   const currentIssue = issues.find(issue => issue.id === id);
//   currentIssue.status = 'Closed';
//   localStorage.setItem('issues', JSON.stringify(issues));
//   fetchIssues();
// }

const deleteIssue = id => {
  
  const issues = JSON.parse(localStorage.getItem('issues'));
  
  const remainingIssues = issues.filter(issue=> issue.id != id );
  // console.log(remainingIssues);
  // issues.push(remainingIssues);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const setStatusClosed=(id)=>{
  const issues = JSON.parse(localStorage.getItem('issues'));
  const closedIssue=issues.find(issue=>issue.id ==id);
  closedIssue.status='closed';
  console.log(closedIssue.status);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  let openCount=0;
  const totalIssue=issues.length;
  for (var i = 0; i < totalIssue; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    let setStatusClass='';
    if(status=='closed'){
      setStatusClass='closed-class';
    }
    else{
      openCount++;
      setStatusClass='open-class';
    }

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3><span class="${setStatusClass}"> ${description}<span> </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }

  document.getElementById('openedIssue').innerText=openCount;
  document.getElementById('totalIssue').innerText=totalIssue;
}
