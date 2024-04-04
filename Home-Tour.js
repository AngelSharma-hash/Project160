AFRAME.registerComponent("home-tour",{
    schema:{
        state:{type:"string",default:"rooms-list"},
        selectedRoom:{type:"string",default:"#front_yard"}
    },
    init: function() {
        this.roomsContainer = this.el;
        this.cameraEl = document.querySelector("#camera");
        this.createRooms();
    },
    update: function() {
        window.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") {
            if (
            (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
            (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
            ) {
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
        }
        if (e.key === "ArrowDown") {
            if (
            (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
            (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
            ) {
            this.data.zoomAspectRatio -= 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
        }
        });
    },
    tick: function() {
        const { state } = this.el.getAttribute("home-tour");
    
        if (state === "view") {
        this.hideEl([this.roomsContainer]);
        
        }
    },
    hideEl: function(elList) {
        elList.map(el => {
        el.setAttribute("visible", false);
        });
    },


    createRooms:function(){
        const RoomsPhotographs=[
            {
                id:"front_yard",
                title:"Front Yard",
                url:"./front_yard.jpg"
            },
            {
                id:"living_room",
                title:"Living Room",
                url:"./living_room.jpg"
            },
            {
                id:"master_bed_room",
                title:"Master Bed Room",
                url:"master_bed_room.jpg"
            },
            {
                id:"guest_room",
                title:"Guest Room",
                url:"./guest_room.jpg"
            },
            {
                id:"kitchen",
                title:"Kitchen",
                url:"./kitchen.jpg"
            },

        ];
        let prevoiusXPosition = -60;
    for (var item of RoomsPhotographs) {
    const posX = prevoiusXPosition + 25;
    const posY = 10;
    const posZ = -40;
    const position = { x: posX, y: posY, z: posZ };
    prevoiusXPosition = posX;

      // Border Element
    const borderEl = this.createBorder(position, item.id);

      // Thubnail Element
    const thumbNail = this.createThumbNail(item);
    borderEl.appendChild(thumbNail);

      // Title Text Element
    const titleEl = this.createTitleEl(position, item);
    borderEl.appendChild(titleEl);

    this.roomsContainer.appendChild(borderEl);
    }
    },
    createBorder: function(position, id) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
        primitive: "ring",
        radiusInner: 9,
        radiusOuter: 10
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("material", {
        color: "#0077CC",
        opacity: 1
        });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
    },
    createThumbNail: function(item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 9
        });
        entityEl.setAttribute("material", { src: item.url });
        entityEl.setAttribute("cursor-listener", {});
        return entityEl;
    },
    createTitleEl: function(position, item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            width: 60,
            color: "#e65100",
            value: item.title
        });
        const elPosition = position;
        elPosition.y = -20;
        entityEl.setAttribute("position", elPosition);
        entityEl.setAttribute("visible", true);
        return entityEl;
    }, 

})