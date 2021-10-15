firstload()
async function firstload() {
    const mountainList = document.querySelector('#mountain-list');
    let location = "경기";
    const apidata1 = await axios.post("/infomountain/location", { location });
    location = "인천";
    const apidata2 = await axios.post("/infomountain/location", { location });
    arrydata1 = JSON.stringify(apidata1.data);
    arrydata2 = JSON.stringify(apidata2.data);
    sumarrydata = arrydata1.slice(0, -1) + "," + arrydata2 + "]";
    const apidata = JSON.parse(sumarrydata);
    console.log(apidata)
    mountainList.innerHTML = "";
    for (let i = 0; i < apidata.length; i++) {

        let listsummury = document.createElement("div");
        listsummury.setAttribute('class', "mountain-list-summury");
        let temp = `<div class="mountain-summury-name">${apidata[i].mntnm}</div>
        <div class="mountain-summury-height">높이: ${apidata[i].mntheight}m</div>
        <div class="mountain-summury-address">주소지: ${apidata[i].areanm}</div>
        <div class="mountain-summury-overview">소개: ${apidata[i].subnm}</div>`;
        listsummury.innerHTML = temp;
        mountainList.appendChild(listsummury);
    }

};
/////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".kor-location").forEach(element => {
    element.addEventListener('click', async function () {
        let location = await this.textContent;
        const mountainList = document.querySelector('#mountain-list');
        if (location == "서울/경기") {
            location = "경기";
            const apidata1 = await axios.post("/infomountain/location", { location });
            location = "인천";
            const apidata2 = await axios.post("/infomountain/location", { location });
            arrydata1 = JSON.stringify(apidata1.data);
            arrydata2 = JSON.stringify(apidata2.data);
            sumarrydata = arrydata1.slice(0, -1) + "," + arrydata2 + "]";
            const apidata = JSON.parse(sumarrydata);
            console.log(apidata);
            mountainList.innerHTML = "";
            for (let i = 0; i < apidata.length; i++) {

                let listsummury = document.createElement("div");
                listsummury.setAttribute('class', "mountain-list-summury");
                let temp = `<div class="mountain-summury-name">${apidata[i].mntnm}</div>
        <div class="mountain-summury-height">높이: ${apidata[i].mntheight}m</div>
        <div class="mountain-summury-address">주소지: ${apidata[i].areanm}</div>
        <div class="mountain-summury-overview">소개: ${apidata[i].subnm}</div>`;
                listsummury.innerHTML = temp;
                mountainList.appendChild(listsummury);
            }

        } else {
            const apidata1 = await axios.post("/infomountain/location", { location });
            const apidata = apidata1.data
            console.log(apidata);
            console.log(apidata.length);
            mountainList.innerHTML = "";
            if (apidata.length == undefined) {
                let listsummury = document.createElement("div");
                listsummury.setAttribute('class', "mountain-list-summury");
                let temp = `<div class="mountain-summury-name">${apidata.mntnm}</div>
        <div class="mountain-summury-height">높이: ${apidata.mntheight}m</div>
        <div class="mountain-summury-address">주소지: ${apidata.areanm}</div>
        <div class="mountain-summury-overview">소개: ${apidata.subnm}</div>`;
                listsummury.innerHTML = temp;
                mountainList.appendChild(listsummury);
            } else {
                for (let i = 0; i < apidata.length; i++) {
                    let listsummury = document.createElement("div");
                    listsummury.setAttribute('class', "mountain-list-summury");
                    let temp = `<div class="mountain-summury-name">${apidata[i].mntnm}</div>
        <div class="mountain-summury-height">높이: ${apidata[i].mntheight}m</div>
        <div class="mountain-summury-address">주소지: ${apidata[i].areanm}</div>
        <div class="mountain-summury-overview">소개: ${apidata[i].subnm}</div>`;
                    listsummury.innerHTML = temp;
                    mountainList.appendChild(listsummury);
                }
            };
        };
    })
});
////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('click', async function (e) {
    let clicktarget = e.target.getAttribute("class");
    console.log(clicktarget)
    if (clicktarget == "mountain-summury-name") {
        let detail = e.target.textContent;
        console.log(detail)
        const mountainList = document.querySelector('#mountain-list');
        const apidata1 = await axios.post("/infomountain/location/detail", { detail });
        const apidata = apidata1.data
        console.log(apidata);
        console.log(apidata.length);
        mountainList.innerHTML = "";
        if (apidata.length == undefined) {
            let listContainer = document.createElement("div")
            listContainer.setAttribute('class', "mountain-list-container");
            mountainList.appendChild(listContainer);

            let listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-name")
            listItem.textContent = apidata.mntnm
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-height")
            listItem.textContent = apidata.mntheight + "m"
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-address")
            listItem.innerHTML = apidata.areanm
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-overview")
            listItem.innerHTML = apidata.overview
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-transport")
            listItem.innerHTML = apidata.transport
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-tour")
            listItem.innerHTML = apidata.tourisminf
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-etctour")
            listItem.innerHTML = apidata.etccourse
            listContainer.appendChild(listItem);

            let preButton = document.createElement("button");
            preButton.setAttribute('class', "pre-button")
            preButton.innerHTML = "뒤로가기"
            preButton.addEventListener("click", (e) => {
                mountainList.innerHTML = "";
                firstload()
            })

            listContainer.appendChild(preButton);
        } else {

            let listContainer = document.createElement("div")
            listContainer.setAttribute('class', "mountain-list-container");
            mountainList.appendChild(listContainer);

            let listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-name")
            listItem.textContent = apidata[0].mntnm
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-height")
            listItem.textContent = apidata[0].mntheight
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-address")
            listItem.innerHTML = apidata[0].areanm
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-overview")
            listItem.innerHTML = apidata[0].overview
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-transport")
            listItem.innerHTML = apidata[0].transport
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-tour")
            listItem.innerHTML = apidata[0].tourisminf
            listContainer.appendChild(listItem);

            listItem = document.createElement("div");
            listItem.setAttribute('class', "mountain-etctour")
            listItem.innerHTML = apidata[0].etccourse
            listContainer.appendChild(listItem);

            let preButton = document.createElement("button");
            preButton.setAttribute('class', "pre-button")
            preButton.innerHTML = "뒤로가기"
            preButton.addEventListener("click", (e) => {
                mountainList.innerHTML = "";
                firstload()
            })

        }

    }
});


// document.querySelectorAll(".mountain-list-summury").forEach(element => {
//     element.addEventListener('click', function () {
//         console.log("durlasjldkjasd")
//         let detail = this.firstChild;
//         console.log(detail)
//         const mountainList = document.querySelector('#mountain-list');
//         const apidata1 = await axios.post("/infomountain/location/detail", { detail });
//         const apidata = apidata1.data
//         console.log(apidata);
//         console.log(apidata.length);
//         mountainList.innerHTML = "";
//         if (apidata.length == undefined) {
//             let listContainer = document.createElement("div")
//             listContainer.setAttribute('class', "mountain-list-container");
//             mountainList.appendChild(listContainer);

//             let listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-name")
//             listItem.textContent = apidata.mntnm
//             listContainer.appendChild(listItem);

//             listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-height")
//             listItem.textContent = apidata.mntheight
//             listContainer.appendChild(listItem);

//             listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-address")
//             listItem.innerHTML = apidata.areanm
//             listContainer.appendChild(listItem);

//             listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-overview")
//             listItem.innerHTML = apidata.overview
//             listContainer.appendChild(listItem);

//             listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-transport")
//             listItem.innerHTML = apidata.transport
//             listContainer.appendChild(listItem);

//             listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-tour")
//             listItem.innerHTML = apidata.tourisminf
//             listContainer.appendChild(listItem);

//             listItem = document.createElement("div");
//             listItem.setAttribute('class', "mountain-etctour")
//             listItem.innerHTML = apidata.etccourse
//             listContainer.appendChild(listItem);
//         } else {
//             for (let i = 0; i < apidata.length; i++) {
//                 let listContainer = document.createElement("div")
//                 listContainer.setAttribute('class', "mountain-list-container");
//                 mountainList.appendChild(listContainer);

//                 let listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-name")
//                 listItem.textContent = apidata[i].mntnm
//                 listContainer.appendChild(listItem);

//                 listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-height")
//                 listItem.textContent = apidata[i].mntheight
//                 listContainer.appendChild(listItem);

//                 listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-address")
//                 listItem.innerHTML = apidata[i].areanm
//                 listContainer.appendChild(listItem);

//                 listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-overview")
//                 listItem.innerHTML = apidata[i].overview
//                 listContainer.appendChild(listItem);

//                 listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-transport")
//                 listItem.innerHTML = apidata[i].transport
//                 listContainer.appendChild(listItem);

//                 listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-tour")
//                 listItem.innerHTML = apidata[i].tourisminf
//                 listContainer.appendChild(listItem);

//                 listItem = document.createElement("div");
//                 listItem.setAttribute('class', "mountain-etctour")
//                 listItem.innerHTML = apidata[i].etccourse
//                 listContainer.appendChild(listItem);
//             }
//         }
//     })
// });