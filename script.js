//your code here
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".image");

    images.forEach(img => {
        img.setAttribute("draggable", true);

        img.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("id", event.target.id);
        });

        img.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        img.addEventListener("drop", (event) => {
            event.preventDefault();
            let draggedElementId = event.dataTransfer.getData("id");
            let draggedElement = document.getElementById(draggedElementId);

            if (draggedElement && draggedElement !== event.target) {
                
                let tempBg = window.getComputedStyle(draggedElement).backgroundImage;
                draggedElement.style.backgroundImage = window.getComputedStyle(event.target).backgroundImage;
                event.target.style.backgroundImage = tempBg;
            }
        });
    });
});
