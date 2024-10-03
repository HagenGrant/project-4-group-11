$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});


// call Flask API endpoint
function makePredictions() {
    var country = $("#country").val();
    var amount_usd = $("#amount_usd").val();
    var transaction_type = $("#transaction_type").val();
    var month = $("#month").val();
    var industry = $("#industry").val();
    var destination_country = $("#destination_country").val();
    var reported_by_authority = $("#reported_by_authority").val();
    var money_laundering_risk_score = $("#money_laundering_risk_score").val();
    var shell_companies_involved = $("#shell_companies_involved").val();
    var tax_haven_country = $("#tax_haven_country").val();


    // check if inputs are valid

    // create the payload
    var payload = {
        "country": country,
        "amount_usd": amount_usd,
        "transaction_type": transaction_type,
        "month": month,
        "industry": industry,
        "destination_country": destination_country,
        "reported_by_authority": reported_by_authority,
        "money_laundering_risk_score": money_laundering_risk_score,
        "shell_companies_involved": shell_companies_involved,
        "tax_haven_country": tax_haven_country
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            var prob = parseFloat(returnedData["prediction"]);

            if (prob > 0.5) {
                $("#output").text(`You will be apprehended by the authorities shortly for money laundering. Resistance is futile. Score of:${prob}!`);
            } else {
                $("#output").text(`Congrats! Your transaction was not illegal! With a score of: ${prob}`);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
