const firebaseConfig = {
  apiKey: "AIzaSyDNJnvcbYlotsT790YP4uOD--cbvIug098",
  authDomain: "pgmc-logistics.firebaseapp.com",
  projectId: "pgmc-logistics",
  storageBucket: "pgmc-logistics.appspot.com",
  messagingSenderId: "510680365264",
  appId: "1:510680365264:web:d0185b37eafd289e1646d5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();




var addMemberBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.darkXbg'),                    
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    form = document.querySelector('form'),
    formInputFields = document.querySelectorAll('form input'),
    tDecs = document.getElementById("tDecs"),
    tProp = document.getElementById("tProp"),
    tDate = document.getElementById("tDate"),
    tValue = document.getElementById("tValue"),
    tBal = document.getElementById("tBal"),
    tOnhand = document.getElementById("tOnhand"),
    tShortage = document.getElementById("tShortage"),
    tOverage = document.getElementById("tOverage"),
    tRemarks = document.getElementById("tRemarks"),
    tUnit = document.getElementById("tUnit"),
    entries = document.querySelector(".showEntries"),

    tabSize = document.getElementById("table_size"),
    userInfo = document.querySelector(".userInfo"),
    table = document.querySelector("table"),
    filterData = document.getElementById("search")



let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let getData = [...originalData]

let isEdit = false, editId

var arrayLength = 0
var tableSize = 10
var startIndex = 1 
var endIndex = 0 
var currentIndex = 1
var maxIndex = 0


showInfo()


function highlightMatch(text, searchTerm) {
  if (!searchTerm) return text; // If no search term, return the original text
  const re = new RegExp(searchTerm, 'gi'); // 'g' for global match, 'i' for case-insensitive
  return text.replace(re, match => `<span class="highlight">${match}</span>`);
}


addMemberBtn.addEventListener('click', ()=>{
  isEdit = false
  submitBtn.innerHTML = "Submit" 
  modalTitle.innerHTML = "Add Equipment"
  popupFooter.style.display = "block"

  darkBg.classList.add('active')
  popupForm.classList.add('active')
})

crossBtn.addEventListener('click', ()=>{
  darkBg.classList.remove('active')
  popupForm.classList.remove('active')
  form.reset()
})


function preLoadCalculations(){
  array = getData
  arrayLength = array.length
  maxIndex = arrayLength / tableSize

    if((arrayLength % tableSize) > 0){
        maxIndex++
    }
  }



function displayIndexBtn(){
  preLoadCalculations()


  const pagination = document.querySelector('.pagination')

  pagination.innerHTML = "" 


  pagination.innerHTML = '<button onclick="prev()" class="prev">Prev</button>';


  for(let i=1; i <=maxIndex; i++){
    pagination.innerHTML += '<button onclick =paginationBtn('+i+') index = "'+i+'">'+i+'</button>'
  }


  pagination.innerHTML += '<button onclick="next()" class="next">Next</button>';

  highlightIndexBtn()
}



function highlightIndexBtn(){
  startIndex = ((currentIndex - 1 ) * tableSize) + 1;
  endIndex = (startIndex + tableSize) - 1;

    if(endIndex > arrayLength){
      endIndex = arrayLength
    }

    if(maxIndex >= 2){
      var nextBtn = document.querySelector(".next")
      nextBtn.classList.add("add")
    }


    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`

    var paginationBtns = document.querySelectorAll('.pagination button')
    paginationBtns.forEach(btn =>{
        btn.classList.remove('active')
        if(btn.getAttribute('index') === currentIndex.toString()){
          btn.classList.add('active')
        }
    })



  showInfo()
}


function showInfo(){
document.querySelectorAll(".itemsDetails").forEach(info => info.remove())

  var tab_start = startIndex - 1
  var tab_end = endIndex 

  if(getData.length > 0 ){
    for(var i = tab_start; i<tab_end; i++){
      var staff = getData[i]


      if(staff){
        let createElement =  `<tr class = "itemsDetails">
          <td>${i+1}</td>                     

          <td>${highlightMatch(staff.tDecs, filterData.value.trim())}</td>
          <td>${highlightMatch(staff.tProp, filterData.value.trim())}</td>
          <td>${highlightMatch(staff.tRemarksVal, filterData.value.trim())}</td>            
          <td>${staff.tUnit}</td>
          <td>${staff.tDateVal}</td>                           
          <td>${staff.valueVal}</td>                             
          <td>${staff.balVal}</td>                              
          <td>${staff.tOnhandVal}</td>                         

                                                               
            <td>${staff.tShortageVal}</td>
            <td>${staff.tOverageVal}</td>
        

                                                                 
          <td>
            <button onclick= "editInfo('${i}','${staff.tDecs}' ,'${staff.tProp}','${staff.tRemarksVal}','${staff.tUnit}','${staff.tDateVal}','${staff.valueVal}'
            ,'${staff.balVal}','${staff.tOnhandVal}','${staff.tShortageVal}','${staff.tOverageVal}') "><i class="fa-regular fa-pen-to-square"></i></button>


            <button onclick="deleteInfo (${i})" ><i class="fa-regular fa-trash-can"></i></button>
          </td>
        </tr>`


          userInfo.innerHTML += createElement;
          
      }
    }
  }

  else{
    userInfo.innerHTML = `<tr class = "itemsDetails"><td class="empty" colspan="12" text-align="center">No Data Available </td></tr>`
  }
}

showInfo()
 




function editInfo(id, decs, prop, remarks,unit, date, value, bal, onhand, short, over ){
  isEdit = true
  editId = id


  const originalIndex = originalData.findIndex(item => item.id === id)
  //Updating original Data

  originalData[originalData] = {
    id: id,
    tDecs: decs,
    tProp: prop,
    tRemarksVal: remarks,
    tUnitVal: unit,
    tDateVal: date,
    valueVal: value,
    balVal: bal,
    tOnhandVal: onhand,
    
    tShortageVal: short,
    tOverageVal: over,
  
  }
   
  tDecs.value = decs
  tProp.value = prop
  tRemarks.value = remarks
  tUnit.value = unit
  tDate.value = date
  tValue.value = value
  tBal.value = bal
  tOnhand.value = onhand
    
  tShortage.value = short
  tOverage.value = over
  
  
  darkBg.classList.add('active')
  popupForm.classList.add('active')
  popupFooter.style.display = "block"
  modalTitle.innerHTML = "Update The Equipment"
  submitBtn.innerHTML = "Update"

  formInputFields.forEach(input => {
    input.disabled = false;


  })


  
}



function deleteInfo(index){
  if(confirm("Are you sure want to delete?")){
      originalData.splice(index, 1);
      localStorage.setItem("userProfile", JSON.stringify(originalData));
      
      // Update getData after deleting the record
      getData = [...originalData];

      preLoadCalculations()

      if(getData.length === 0){
          currentIndex = 1
          startIndex = 1
          endIndex = 0
      }
      else if(currentIndex > maxIndex){
          currentIndex = maxIndex
      }

      showInfo()
      highlightIndexBtn()
      displayIndexBtn()

      var nextBtn = document.querySelector('.next')
      var prevBtn = document.querySelector('.prev')

      if(Math.floor(maxIndex) > currentIndex){
          nextBtn.classList.add("act")
      }
      else{
          nextBtn.classList.remove("act")
      }


      if(currentIndex > 1){
          prevBtn.classList.add('act')
      }

      showNotification("Equipment has been deleted.");

  }
}


function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;
  document.body.appendChild(notification);

  // Automatically remove the notification after 3 seconds
  setTimeout(() => {
      document.body.removeChild(notification);
  }, 2000);
}











form.addEventListener('submit', (e)=>{
  e.preventDefault()

    const information = {
    id: Date.now(),
    tDecs: tDecs.value,
    tProp: tProp.value,
    tRemarksVal: tRemarks.value,
    tUnit:tUnit.value,
    tDateVal: tDate.value,
    valueVal: tValue.value,
    balVal: tBal.value,
    tOnhandVal: tOnhand.value,
    
    tShortageVal: tShortage.value,
    tOverageVal: tOverage.value,
  




  }

  if(!isEdit){
    originalData.unshift(information)
  }

  else{
    originalData[editId] = information
  }
  getData = [...originalData]
  localStorage.setItem('userProfile', JSON.stringify(originalData))

  submitBtn.innerHTML = "Submit" 
  modalTitle.innerHTML = "Add Equipment"


  darkBg.classList.remove('active')
  popupForm.classList.remove('active')
  form.reset()


  const action = isEdit ? "updated" : "added";
  showNotification(`Equipment has been ${action}.`); // Show notification





  highlightIndexBtn()
  displayIndexBtn()
  showInfo()

  var nextBtn = document.querySelector(".next")
  var prevBtn = document.querySelector(".prev")
    if(Math.floor(maxIndex) > currentIndex){
      nextBtn.classList.add("act")
    }
    else{
      nextBtn.classList.remove(".act")
    }


    if( currentIndex > 1){
      prevBtn.classList.add("act")
    }
})

// Set initial value of tValue field
tValue.value = "₱ "; // Add peso sign followed by a space as initial value

// Add event listener to tValue field to maintain peso sign and space
tValue.addEventListener('input', function(event) {
    // If the input does not start with peso sign followed by a space, prepend it
    if (!event.target.value.startsWith("₱ ")) {
        event.target.value = "₱ "; // Reset the value
        return;
    }

    // Remove any non-numeric characters
    const inputValue = event.target.value.replace(/[^\d.]/g, '');
    
    // Format the number
    const formattedNumber = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    

    // Update the value of tValue field
    event.target.value = "₱ " + formattedNumber;
});



function confirmLogout() {
  if (confirm("Do you want to exit?")) {
    location = 'login.html';
  }
}






displayIndexBtn()