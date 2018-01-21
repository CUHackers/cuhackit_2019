const accordionTitle = document.getElementsByClassName("accordion");

for (let i = 0; i < accordionTitle.length; i++) {
  	accordionTitle[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.height) {
    	panel.style.height = null;
    } else {
      panel.style.height = "200px";
    }
  });
}