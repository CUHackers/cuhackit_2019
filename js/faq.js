const accordionTitle = document.getElementsByClassName("accordion");
let faqWidth = Math.max(document.getElementsByTagnam("body")[0].offsetWidth);

for (let i = 0; i < accordionTitle.length; i++) {
  	accordionTitle[i].addEventListener("click", function() {
  		let panel = this.nextElementSibling;

  		if (!panel.style.maxHeight) {
  			hideAllPanels();
  		}
  		
    	this.classList.toggle("active");

    	if (panel.style.maxHeight) {
    		panel.style.maxHeight = null;
        
        if (faqWidth < 500) {
          document.getElementById("faqs").minHeight = 65 + "em";
        }
    	} else {
     		panel.style.maxHeight = panel.scrollHeight + "px";
        
        if (faqWidth < 500) {
          document.getElementById("faqs").minHeight = 85 + "em";
        }
    	}
  });
}

function hideAllPanels() {
    for (i = 0; i < accordionTitle.length; i++) {
        accordionTitle[i].classList.toggle("active", false);
        accordionTitle[i].nextElementSibling.style.maxHeight = null;
    }
}

window.onresize = function() {
  faqWidth = Math.max(document.getElementsByTagName("body")[0].offsetWidth);
}


