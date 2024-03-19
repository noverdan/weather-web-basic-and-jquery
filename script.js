$("document").ready(function () {
    getData()
});

function getData(city = "Jakarta") {
    $.ajax({
        url: `https://api.weatherapi.com/v1/current.json?q=${city}&lang=en&key=bd19a6ef82f848a1b1215029241803`,
        method: 'GET',
        beforeSend: function () {
            isLoading(true);
        },
        success: function (response) {
            let temp_c = response.current.temp_c;
            let humidity = response.current.humidity;
            let textInfo = response.current.condition.text;
            let city = response.location.name;
            let country = response.location.country;
            let img = response.current.condition.icon;
            let time = response.location.localtime;
            console.log(response);
            $(".temp_c").text(temp_c);
            $(".location").text(city + ", " + country);
            $(".humidity").text("Humidity: " + humidity);
            $(".text-info").text(textInfo);
            $(".img-cloud").attr("src", "https:" + img);
            $(".time").text(time + " Localtime");
            $('#msg-error').hide();

        },
        error: function (xhr, status, error) {
            let message = xhr.responseJSON.error.message
            $(".error__title").text(message);
            $('#msg-error').show();
        },
        complete: function () {
            isLoading(false);
        }
    });
}

$("#submit").click(function () {
    let city = $(".input").val();
    if (!city) {
        $(".error__title").text("City cannot be empty");
        $('#msg-error').show();
        return
    }
    getData(city);
})

$('.error__close').click(function () {
    $('#msg-error').hide();
})

function isLoading(params) {
    if (params) {
        $('#loading').css('display', 'flex');
    } else {
        $('#loading').css('display', 'none');
    }
}