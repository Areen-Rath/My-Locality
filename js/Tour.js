AFRAME.registerComponent("tour", {
    schema: {
        state: {
            type: "string",
            default: "places-list"
        },
        selectedCard: {
            type: "string",
            default: "#card1"
        }
    },
    init: function() {
        this.placesContainer = this.el;
        this.createCards();
    },
    tick: function() {
        const { state } = this.el.getAttribute("tour");
        if (state === "view") {
            this.hide([this.placesContainer]);
            this.showView();
        }
    },
    createCards: function() {
        const thumbnailRef = [
            {
                id: "gate",
                title: "Entrance",
                url: '../assets/thumbnails/gate.png'
            },
            {
                id: "society",
                title: "Society",
                url: '../assets/thumbnails/society.jpg'
            },
            {
                id: "park",
                title: "Park",
                url: '../assets/thumbnails/park.jpg'
            },
            {
                id: "court",
                title: "Badminton Court",
                url: '../assets/thumbnails/court.png'
            }
        ];

        let preXPos = -60;
        for (var item in thumbnailRef) {
            const posX = preXPos + 25;
            const posY = 10;
            const posZ = -45;
            const pos = {
                x: posX,
                y: posY,
                z: posZ
            }
            preXPos = posX;
            const border = this.createBorder(pos, thumbnailRef[item].id);
            const thumbnail = this.createThumbnail(thumbnailRef[item]);
            border.appendChild(thumbnail);
            const title = this.title(pos, thumbnailRef[item]);
            border.appendChild(title);
            this.placesContainer.appendChild(border);
        }
    },
    createBorder: function(position, id) {
        const entity = document.createElement("a-entity");
        entity.setAttribute("id", id);
        entity.setAttribute("visible", true);
        entity.setAttribute("geometry", {
            primitive: "ring",
            radiusInner: 9,
            radiusOuter: 10
        });
        entity.setAttribute("position", position);
        entity.setAttribute("material", {
            color: "#00bcd4",
            opacity: 0.4
        });
        entity.setAttribute("cursor-listener", {});
        return entity;
    },
    createThumbnail: function(item) {
        const entity = document.createElement("a-entity");
        entity.setAttribute("visible", true);
        entity.setAttribute("geometry", {
            primitive: "circle",
            radius: 9
        });
        entity.setAttribute("material", {
            src: item.url
        });
        return entity;
    },
    title: function(position, item) {
        const entity = document.createElement("a-entity");
        entity.setAttribute("text", {
            font: "exo2bold",
            align: 'center',
            width: 60,
            color: "#e65100",
            value: item.title
        });
        const pos = position;
        pos.y = -20;
        entity.setAttribute("position", pos);
        entity.setAttribute("visible", true);
        return entity;
    },
    hide: function(elList) {
        elList.map(el => {
            el.setAttribute("visible", false);
        });
    },
    showView: function() {
        const { selectedCard } = this.data;
        const sky = document.querySelector("#main-container");
        sky.setAttribute("material", {
            src: `../assets/360_images/${selectedCard}.jpg`,
            color: "#fff"
        });
    }
});