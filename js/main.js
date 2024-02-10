$(function() {
    const cities = ["Москва", "Волгоград", "Псков", "Гдов", "Пестово", "Санкт-Петербург", "Саратов", "Тверь"];
    $("#departure_city").autocomplete({ source: cities });
    $("#arrival_city").autocomplete({ source: cities });

    $("#departure_city, #arrival_city").on("change", function () {
        const obj = this;
        const city = $(obj).val();
        $.ajax({
            url: `https://busstation.сделай.site/api/station?query=${city}`,
            success: function (data) {
                data = data.data.items;
                const stationSelect = $(`#${$(obj).attr("id").replace("city", "station")}`);
                console.log(stationSelect, data.data);
                stationSelect.empty();
                for (const station of data) {
                    stationSelect.append(`<option value="${station.code}">${station.name}</option>`);
                }
            },
        });
    });
});