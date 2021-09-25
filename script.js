const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;


class Camera{
    constructor(brand, model, powerConsumptionWh) {
        this.barand = brand;
        this.model = model;
        this.powerConsumptionWh = powerConsumptionWh;
    }

    getAvailableBattery(batteryList, accessoryPowerConsumption){
        let availableBatteryList = [];
        for (let i = 0 ; i < batteryList.length; i++){
            if(batteryList[i]["maxDraw"] * batteryList[i]["endVoltage"] >= this.powerConsumptionWh + accessoryPowerConsumption){
                let battery = {
                    batteryName: batteryList[i]["batteryName"],
                    durationTime: this.getDurationTime(batteryList[i]["capacityAh"], batteryList[i]["voltage"], this.powerConsumptionWh, accessoryPowerConsumption)
                }
                availableBatteryList.push(battery);
            }
        }
        // batteryNameで結果をソートする
        const order = [
            {key: "batteryName", reverse: false}
        ];

        return availableBatteryList.sort(Camera.sort_by(order));
    }

    getDurationTime(capacityAh, voltage, powerConsumptionWh, accessoryPowerConsumption){
        let durationTime = capacityAh * voltage / (powerConsumptionWh + accessoryPowerConsumption);
        return durationTime.toFixed(1);
    }

    // ソート関数（デフォルトで昇順）
    // https://qiita.com/ShaderKid/items/ac790b1f2dc387477d4f
    static sort_by(list){
        return (a, b) => {
            for (let i=0; i<list.length; i++) {
                const order_by = list[i].reverse ? 1 : -1;
                if (a[list[i].key] < b[list[i].key]) return order_by;
                if (a[list[i].key] > b[list[i].key]) return order_by * -1;
            }
            return 0;
        };
    }
}

// cameraから一意なbrand名のリストを作成
let brandList = {};
for (let i = 0; i < camera.length; i++){
    if (brandList[camera[i].brand] == undefined){
        brandList[camera[i].brand] = camera[i].brand;
    }
}

let brandSelect = document.getElementById("brandSelect");
let modelSelect = document.getElementById("modelSelect");
let accessoryPowerConsumptionInput = document.getElementById("accessory-power-consumption-input");
let userInputs = document.getElementsByClassName("user-input");

// brandの選択肢作成
for (var key in brandList){
    let choice = document.createElement("option");
    choice.innerHTML = key;
    choice.value = key;
    brandSelect.append(choice);
}

// brand選択時にmodelの選択肢作成
brandSelect.addEventListener('change', function(event){
    modelSelect.innerHTML = `<option value="" selected="selected"></option>`;
    for (let i = 0; i < camera.length; i++){
        if (event.target.value === camera[i].brand){
            let choice = document.createElement("option");
            choice.innerHTML = camera[i].model;
            choice.value = camera[i].model;
            modelSelect.append(choice);
        }
    }
})

// key:model value:powerConsumptionの連想配列
let cameraDict = {};
for (let i = 0; i < camera.length; i++){
    cameraDict[camera[i].model] = camera[i].powerConsumptionWh;
}

// 各入力欄が変更された時に検索結果を表示
for (let userInput of userInputs) {
    userInput.addEventListener('change', function(){
        if (brandSelect.value != "" || modelSelect.value != "" || accessoryPowerConsumptionInput.value != ""){
            let selectedCamera = new Camera(brandSelect.value, modelSelect.value, cameraDict[modelSelect.value]);
            let availableBatteryList = selectedCamera.getAvailableBattery(battery, Number(accessoryPowerConsumptionInput.value));
            let candidates = document.getElementById("candidates")
            candidates.innerHTML = "";
            for (let i = 0; i < availableBatteryList.length; i++){
                let card =
                `
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h5>${availableBatteryList[i].batteryName}</h5>
                            </div>
                            <div class="col-6">
                                <h5>Estimated ${availableBatteryList[i].durationTime} hours on selected setup</h5>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                candidates.innerHTML += card;
            }
        } else {
            candidates.innerHTML = "";
        }
    })
}
