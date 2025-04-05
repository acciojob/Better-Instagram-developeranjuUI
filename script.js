//your code here
// document.addEventListener("DOMContentLoaded", () => {
//     const images = document.querySelectorAll(".image");

//     images.forEach((img, index) => {
//         // Ensure each div has an ID (use index if missing)
//         if (!img.id) img.setAttribute("id", `div${index + 1}`);

//         img.setAttribute("draggable", true);

//         img.addEventListener("dragstart", (event) => {
//             event.dataTransfer.setData("id", event.target.id);
//         });

//         img.addEventListener("dragover", (event) => {
//             event.preventDefault();
//         });

//         img.addEventListener("drop", (event) => {
//             event.preventDefault();
//             let draggedElementId = event.dataTransfer.getData("id");
//             let draggedElement = document.getElementById(draggedElementId);

//             if (draggedElement && draggedElement !== event.target) {

//                 let tempBg = window.getComputedStyle(draggedElement).backgroundImage;
//                 draggedElement.style.backgroundImage = window.getComputedStyle(event.target).backgroundImage;
//                 event.target.style.backgroundImage = tempBg;

//                 // let tempText = draggedElement.innerText;
//                 // draggedElement.innerText = event.target.innerText;
//                 // event.target.innerText = tempText;
//             }
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.image');
    let draggedItem = null;

    // Add event listeners for each grid item
    gridItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        // Required for Firefox
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        e.preventDefault();
        this.classList.add('over');
    }

    function handleDragLeave() {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        
        // Don't do anything if we're dropping on the same item
        if (draggedItem !== this) {
            // Swap background images
            const draggedBg = draggedItem.style.backgroundImage;
            const targetBg = this.style.backgroundImage;
            
            draggedItem.style.backgroundImage = targetBg;
            this.style.backgroundImage = draggedBg;
        }
        
        this.classList.remove('over');
        return false;
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
        gridItems.forEach(item => {
            item.classList.remove('over');
        });
    }
});

