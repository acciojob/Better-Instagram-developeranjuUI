//your code here

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".image");
    let draggedItem = null;

    images.forEach(img => {
        img.addEventListener("dragstart", handleDragStart);
        img.addEventListener("dragend", handleDragEnd);
        img.addEventListener("dragover", handleDragOver);
        img.addEventListener("dragenter", handleDragEnter);
        img.addEventListener("dragleave", handleDragLeave);
        img.addEventListener("drop", handleDrop);
    });

    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.innerHTML);
        
        // Set a custom drag image (optional)
        const dragImage = this.cloneNode(true);
        dragImage.style.width = `${this.offsetWidth}px`;
        dragImage.style.height = `${this.offsetHeight}px`;
        dragImage.style.position = "absolute";
        dragImage.style.top = "-9999px";
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, this.offsetWidth/2, this.offsetHeight/2);
        setTimeout(() => document.body.removeChild(dragImage), 0);
    }

    function handleDragEnd() {
        this.classList.remove("dragging");
        images.forEach(img => img.classList.remove("over"));
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        return false;
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (this !== draggedItem) {
            this.classList.add("over");
        }
    }

    function handleDragLeave() {
        this.classList.remove("over");
    }

    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (draggedItem !== this) {
            // Swap background images
            const draggedBg = window.getComputedStyle(draggedItem).backgroundImage;
            const targetBg = window.getComputedStyle(this).backgroundImage;
            
            draggedItem.style.backgroundImage = targetBg;
            this.style.backgroundImage = draggedBg;
            
            
            const tempText = draggedItem.textContent;
            draggedItem.textContent = this.textContent;
            this.textContent = tempText;
        }
        
        this.classList.remove("over");
        return false;
    }
});

