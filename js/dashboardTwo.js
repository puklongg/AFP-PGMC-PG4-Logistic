
function limitToFiveDigits(inputElement) {
  inputElement.addEventListener('input', function() {
    if (this.value.length > 5) {
      this.value = this.value.slice(0, 5); // Limiting to 5 digits
    }
  });
}

// Get input elements and apply the restriction
const inputElements = document.querySelectorAll('input[type="number"]');
inputElements.forEach(function(inputElement) {
  limitToFiveDigits(inputElement);
});






function next(){
  var prevBtn = document.querySelector('.prev')
  var nextBtn = document.querySelector('.next')

    if(currentIndex <= maxIndex - 1){
      currentIndex++
      prevBtn.classList.add("act")

      highlightIndexBtn()
    }

    if(currentIndex > maxIndex - 1){
      nextBtn.classList.remove("act")
    }

}


function prev(){
  var prevBtn = document.querySelector('.prev')

    if(currentIndex > 1){
      currentIndex--
      prevBtn.classList.add("act")
      highlightIndexBtn()
    }

    if(currentIndex < 2){
      prevBtn.classList.remove("act")
    }
}



function paginationBtn(i){
  currentIndex = i 

  var prevBtn = document.querySelector('.prev')
  var nextBtn = document.querySelector('.next')


  highlightIndexBtn()

    if( currentIndex > maxIndex -1 ){
      nextBtn.classList.add.remove('act')
    }
    else{
      nextBtn.classList.add("act")
    }


    if(currentIndex > 1 ){
      prevBtn.classList.add("act")
    }

    if (currentIndex < 2 ){
      prevBtn.classList.remove("act")
    }

}



tabSize.addEventListener('change', () => {
  var selectedValue = parseInt(tabSize.value)
  tableSize = selectedValue
  currentIndex = 1 
  startIndex = 1
  displayIndexBtn()

})

window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Calculate the opacity based on scroll position
  // For example, starts with 1 (fully visible) and approaches 0 (fully transparent) as you scroll down
  var fadeOutThreshold = 100; // The scroll position where the fading effect should start
  var opacity = 1 - scrollPosition / fadeOutThreshold;

  // Apply the calculated opacity to the header
  // Ensure opacity doesn't go below 0
  header.style.opacity = Math.max(opacity, 0);
});



filterData.addEventListener("input", () => {
  const searchTerm = filterData.value.toLowerCase().trim();

  if (searchTerm !== "") {
    const filteredData = originalData.filter((item) => {
      // Assuming 'tDecs' and 'tProp' are correct properties from your items
      const description = item.tDecs.toLowerCase();
      const propertyNumber = item.tProp.toLowerCase();
      // Assuming 'tRemarksVal' is the correct property for remarks
      const remarks = item.tRemarksVal.toLowerCase();

      return (
        description.includes(searchTerm) ||
        propertyNumber.includes(searchTerm) ||
        remarks.includes(searchTerm)
      );
    });

    // Update the current data with filtered data
    getData = filteredData;
  } else {
    // Reset to original data if the search term is cleared
    getData = [...originalData];
  }

  // Reset the pagination and display the filtered or reset data
  currentIndex = 1;
  startIndex = 1;
  showInfo(); // Ensure this function refreshes the table with the current `getData`
  displayIndexBtn();
});


