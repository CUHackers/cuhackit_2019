const accordionTitle = document.getElementsByClassName("accordion");

for (let i = 0; i < accordionTitle.length; i++) {
  	accordionTitle[i].addEventListener("click", function() {
  		let panel = this.nextElementSibling;

  		for (let j = 0; j < accordionTitle.length; j++) {
  			if (panel.style.maxHeight) {
  				panel.style.maxHeight = null;
  			}
  		}
  		
    	this.classList.toggle("active");

    	if (panel.style.maxHeight) {
    		panel.style.maxHeight = null;
    	} else {
     		panel.style.maxHeight = panel.scrollHeight + "px";
    	}
  });
}