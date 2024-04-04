AFRAME.registerComponent("cursor-listener", {
    schema: {
    selectedItemId: { default: "", type: "string" }
    },
    init: function() {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
    },
    handleClickEvents: function() {
      //  Click Events
    this.el.addEventListener("click", evt => {
        const roomContainer = document.querySelector("#rooms-container");
        const { state } = roomContainer.getAttribute("home-tour");

        if (state === "rooms-list") {
        const id = this.el.getAttribute("id");
        const roomsId = ["kitchen","guest_room","master_bed_room","front_yard","living_room"];
        if (roomsId.includes(id)) {
            roomContainer.setAttribute("home-tour", {
            state: "view",
            selectedRoom: id
            });
        }
        }
        
        if (state=="view"){
        this.handleViewState()
        }
        if (state=="change-view"){
        this.handleViewState()
        }
        
    });
    },
    handleMouseEnterEvents: function() {
      // Mouse Center Events
    this.el.addEventListener("mouseenter", () => {
        const placeContainer = document.querySelector("#rooms-container");
        const { state } = placeContainer.getAttribute("home-tour");
        if (state === "rooms-list") {
        this.handlePlacesListState();
        }
    });
    },
    handlePlacesListState: function() {
    const id = this.el.getAttribute("id");
    const roomsId = ["kitchen","guest_room","master_bed_room","front_yard","living_room"];
    if (roomsId.includes(id)) {
        const placeContainer = document.querySelector("#rooms-container");
        placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
        });
        this.el.setAttribute("material", {
        color:"#D76B30",
        opacity: 1
        });
    }
    },
    handleMouseLeaveEvents: function() {
      // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
        const roomContainer = document.querySelector("#rooms-container");
        const { state } = roomContainer.getAttribute("home-tour");
        if (state === "rooms-list") {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
            const el = document.querySelector(`#${selectedItemId}`);
            const id = el.getAttribute("id");
            if (id == selectedItemId) {
            el.setAttribute("material", {
                color: "#0077CC",
                opacity: 1
            });
            }
        }
        }
    });
    },
    handleViewState:function(){
    const el = this.el
    const id = el.getAttribute("id")
    const roomContainer = document.querySelector("#rooms-container")
    const {selectedItemId} = roomContainer.getAttribute("cursor-listener")
    const sideViewroomsId = ["kitchen","guest_room","master_bed_room","front_yard","living_room"]
    if (sideViewroomsId.includes(id)){
        roomContainer.setAttribute("home-tour",{
        state:"change-view"
        })
        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material",
        {
        src:`./${id}.jpg`,
        color:"#fff",
    })
    }
    }
    
});
