function initialFunc() {
    let prevImg = null;
    let currentImg = document.querySelector(".img-menu__img-wrapper");
    currentImg.className += " img-menu__img-wrapper_selected";

    function changeImage(event) {
        prevImg = currentImg;
        currentImg = event.currentTarget;
        prevImg.classList.remove("img-menu__img-wrapper_selected");
        currentImg.classList.add("img-menu__img-wrapper_selected");
        document.querySelector(".this-product__image").src = currentImg.firstElementChild.src;
    }

    function pickSlider(event) {
        const thisSlider = event.currentTarget;
        if (thisSlider.classList.contains("img-menu__arrow-up-wrapper")) {
            slidePrevImg();
        } else {
            slideNextImg();
        }
    }

    function slidePrevImg() {
        const nextImg = currentImg.previousElementSibling;
        const eventToSet = new Event("click");
        if (!nextImg.classList.contains("img-menu__arrow-up-wrapper")) {
            nextImg.dispatchEvent(eventToSet);
        } else {
            nextImg.parentElement.lastElementChild.previousElementSibling.dispatchEvent(eventToSet);
        }
    }

    function slideNextImg() {
        const nextImg = currentImg.nextElementSibling;
        const eventToSet = new Event("click");
        if (!nextImg.classList.contains("img-menu__arrow-down-wrapper")) {
            nextImg.dispatchEvent(eventToSet);
        } else {
            nextImg.parentElement.firstElementChild.nextElementSibling.dispatchEvent(eventToSet);
        }
    }

    return ({changeImage: changeImage, slideImage: pickSlider});
}

function pickImage(event) {
    const thisRadio = event.currentTarget;
    const imgToReplace = thisRadio.parentNode.previousElementSibling;
    switch (thisRadio.classList[1]) {
        case "img-menu_mini__first-img":
            imgToReplace.src = "images/photos/img-menu1.png";
            break;
        case "img-menu_mini__second-img":
            imgToReplace.src = "images/photos/img-menu2.png";
            break;
        case "img-menu_mini__third-img":
            imgToReplace.src = "images/photos/img-menu3.png";
            break;
        case "img-menu_mini__fourth-img":
            imgToReplace.src = "images/photos/img-menu4.png";
            break;
    }
}

function slide(event) {
    function changeCoordinates(event) {
        if (event.type === "touchmove") {
            nextCoordinateX = event.touches[0].pageX;
        } else {
            nextCoordinateX = event.pageX;
        }
        const offset = nextCoordinateX - prevCoordinateX;
        thisPanel.style.left = takeOutValue(thisPanel.style.left) + offset + "px";
        prevCoordinateX = nextCoordinateX;
    }
    function stopSlide(event) {
        console.log("Мышь была отпущена");
        thisPanel.style.cursor = "url('images/icons/grab.png'), auto";
        document.body.style.cursor = "default";
        putInPlace(thisPanel);
        if (event.type === "touchend") {
            removeEventListener("touchmove", changeCoordinates);
            removeEventListener("touchend", stopSlide);
        } else {
            removeEventListener("mousemove", changeCoordinates);
            removeEventListener("mouseup", stopSlide);
        }
    }
    console.log("Мышь была нажата");
    const thisPanel = event.currentTarget;
    thisPanel.style.cursor = "url('images/icons/drag.png'), auto";
    document.body.style.cursor = "url('images/icons/drag.png'), auto";
    let prevCoordinateX = null;
    let nextCoordinateX = null;
    if (event.type === "touchstart") {
        event.preventDefault();
        prevCoordinateX = event.touches[0].pageX;
        addEventListener("touchmove", changeCoordinates);
        addEventListener("touchend", stopSlide);
    } else {
        thisPanel.ondragstart = () => { return false };
        prevCoordinateX = event.pageX;
        addEventListener("mousemove", changeCoordinates);
        addEventListener("mouseup", stopSlide);
    }
}

function putInPlace(thisPanel) {
    const thisPanelCoords = thisPanel.getClientRects()[0];
    const firstChildOfThisPanelCoords = thisPanel.firstElementChild.getClientRects()[0];
    const lastChildOfThisPanelCoords = thisPanel.lastElementChild.getClientRects()[0];
    const parentPanelCoords = thisPanel.parentNode.getClientRects()[0];
    if (thisPanelCoords.left > parentPanelCoords.left) {
        thisPanel.classList.add("context-box_slide-animation");
        thisPanel.style.left = "0px";
        setTimeout(() => {thisPanel.classList.remove("context-box_slide-animation")}, 200);
    }
    if (lastChildOfThisPanelCoords.right < parentPanelCoords.right) {
        thisPanel.classList.add("context-box_slide-animation");
        thisPanel.style.left = -((lastChildOfThisPanelCoords.right - firstChildOfThisPanelCoords.left) - parentPanelCoords.width) + "px";
        setTimeout(() => {thisPanel.classList.remove("context-box_slide-animation")}, 200);
    }
}

function takeOutValue(str) {
    return +str.substring(0, str.indexOf("px"));
}

function slideLeft(event) {
    const thisButton = event.currentTarget;
    const thisPanel = thisButton.nextElementSibling;
    thisPanel.classList.add("context-box_slide-animation");
    thisPanel.style.left = takeOutValue(thisPanel.style.left) + 200 + "px";
    setTimeout(() => { thisPanel.classList.remove("context-box_slide-animation") }, 200);
    setTimeout(() => { putInPlace(thisPanel) }, 200);
}

function slideRight(event) {
    const thisButton = event.currentTarget;
    const thisPanel = thisButton.previousElementSibling;
    thisPanel.classList.add("context-box_slide-animation");
    thisPanel.style.left = takeOutValue(thisPanel.style.left) - 200 +"px";
    setTimeout(() => { thisPanel.classList.remove("context-box_slide-animation") }, 200);
    setTimeout(() => { putInPlace(thisPanel) }, 200);
}

const { changeImage, slideImage} = initialFunc();
