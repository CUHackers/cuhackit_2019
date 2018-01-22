const accordionTitle = document.getElementsByClassName("accordion");

for (let i = 0; i < accordionTitle.length; i++) {
  	accordionTitle[i].addEventListener("click", function() {
  		let panel = this.nextElementSibling;

  		hideAllPanels();

    	this.classList.toggle("active");

    	if (panel.style.maxHeight) {
    		panel.style.maxHeight = null;
    	} else {
     		panel.style.maxHeight = panel.scrollHeight + "px";
    	}
  });
}

function hideAllPanels() {
    for (i = 0; i < accordionTitle.length; i++) {
        accordionTitle[i].classList.toggle("active", false);
        accordionTitle[i].nextElementSibling.style.maxHeight = null;
    }
}