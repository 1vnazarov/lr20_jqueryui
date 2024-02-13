$(function () {
    $("input[type='submit']").button();
    $("label").addClass("ui-widget");
    $("select").selectmenu();
    $("input[type='text']").addClass("ui-widget ui-widget-content");
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
                stationSelect.empty();
                if (data.length == 0) stationSelect.append($(new Option("Выберите вокзал")))
                for (const station of data) {
                    stationSelect.append($(new Option(station.name, station.code)));
                }
                $("select").selectmenu("refresh");
            },
        });
    });
});