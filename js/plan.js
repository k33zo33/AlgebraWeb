const token = localStorage.getItem("token");

if (token === null) {
  window.location.href = "../html/login.html";
}



let urlGetAllCurriculums =
  "https://www.fulek.com/data/api/supit/curriculum-list/hr";
let xmlhttpGetAllSubjects = new XMLHttpRequest();
xmlhttpGetAllSubjects.open("GET", urlGetAllCurriculums, true);
xmlhttpGetAllSubjects.setRequestHeader("Authorization", "Bearer " + token);
xmlhttpGetAllSubjects.send();

xmlhttpGetAllSubjects.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let allSubjects = JSON.parse(this.responseText);
    let myArray = createArrayFromResponse(allSubjects.data);

    $("#search_bar").autocomplete({
      source: myArray,
      minLength: 1,
      focus: function (event, ui) {
        event.preventDefault();
        $("#search_bar").val(ui.item.kolegij);
      },
      select: function (event, ui) {
        event.preventDefault();
        $("#search_bar").val(ui.item.kolegij);
      },
    });

    $("#search_bar").on("autocompleteselect", function (e, ui) {
      let id = findID(allSubjects.data, ui.value);
      let urlGetCurriculum = `https://www.fulek.com/data/api/supit/get-curriculum/${id}`;
      let xmlhttpGetSubject = new XMLHttpRequest();
      xmlhttpGetSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let subject = JSON.parse(this.responseText);
          dodajRedak(subject);
          sumEctsAndHours();
        }
      };

      xmlhttpGetSubject.open("GET", urlGetCurriculum, true);
      xmlhttpGetSubject.setRequestHeader("Authorization", "Bearer " + token);
      xmlhttpGetSubject.send();
    });
  }
};

function createArrayFromResponse(response) {
  let arr = [];
  for (let i = 0; i < response.length; i++) {
    arr.push(response[i].kolegij);
  }
  return arr;
}

function findID(arr, nameOfKolegij) {
  for (let i = 0; i < arr.length; i++) {
    if (nameOfKolegij === arr[i].kolegij) {
      return arr[i].id;
    }
  }
}

function dodajRedak(subject) {
  $("#table").append(
    `<tr>
      <td scope="row">${subject.data.kolegij}</td>
      <td>${subject.data.ects}</td>
      <td>${subject.data.sati}</td>
      <td>${subject.data.predavanja}</td>
      <td>${subject.data.vjezbe}</td>
      <td>${subject.data.tip}</td>
    </tr>`
  );
}

function showSum(ukupniECTS, ukupniSati, ukupniPredavanja, ukupniVjezbe) {
  $("#ects").text(ukupniECTS);
  $("#sati").text(ukupniSati);
  $("#predavanja").text(ukupniPredavanja);
  $("#vjezbe").text(ukupniVjezbe);
}

function sumEctsAndHours() {
  let ukupniECTS = 0;
  let ukupniSati = 0;
  let ukupniPredavanja = 0;
  let ukupniVjezbe = 0;

  $("#table tr").each(function () {
    ukupniECTS += parseFloat($(this).find("td:eq(1)").text());
    ukupniSati += parseFloat($(this).find("td:eq(2)").text());
    ukupniPredavanja += parseFloat($(this).find("td:eq(3)").text());
    ukupniVjezbe += parseFloat($(this).find("td:eq(4)").text());
  });

  showSum(ukupniECTS, ukupniSati, ukupniPredavanja, ukupniVjezbe);
}
