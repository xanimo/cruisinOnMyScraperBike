let url_id, page, concat_url, user;

function run() {
  const length_url = window.location.pathname.split('/').length;
  if (length_url >= 1) {
        page = window.location.pathname.split('/')[1];
        if (length_url >= 2) {
        switch (page) {
            case 'account':
                let uid = document.getElementById('uid');
                get_user('user', uid.value);
                break;
            }
        }
  }
}

async function get_user(url, id) {
    if (id) url = 'user/' + id;
    const response = await fetch(url);
    if (!response.ok) {
        console.log("error fetching user.");
    } else {
        const data = await response.text();
        const obj = JSON.parse(data);
        let html = "";
        html += "<h5>Welcome back ";
        html += obj.firstname + " " + obj.lastname + "</h1>";
        html += "<small>Last login: ";
        html += "" + localDate(obj.last_login) + "</small>";
        html += "<hr />";
        const root = document.getElementById("root");
        root.innerHTML = html;
    
        let tr = "";
        tr += "<td>" + obj._id + "</td>";
        tr += "<td>" + obj.firstname + " " + obj.lastname + "</td>";
        tr += "<td>" + obj.email + "</td>";
        const table = document.getElementById('contact')
        table.innerHTML = tr;
    }
}

const localDate = (date) => {
  let d = new Date(date);
  d.toLocaleDateString('en-US');
  return d;
}

function val(el) {
    if (el.options && el.multiple) {
      return el.options
        .filter((option) => option.selected)
        .map((option) => option.value);
    } else {
      return el.value;
    }
  }

if (document.readyState!='loading') run();
else if (document.addEventListener) 
document.addEventListener('DOMContentLoaded', run);
else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') run();
});
