$(document).ready(function() {

    $(document).on('click','.showFormButton',function () {
      $('#orderId').val($(this).attr('selectedOrderId'));

    });

    const showFormBtn = document.getElementById("showFormBtn");
    const formContainer = $("#formContainer");
    const showTableBtn = document.getElementById("showTableBtn");
    const orderTable = $("#orderTable");
         showFormBtn.addEventListener("click", function() {
            formContainer.show();
            orderTable.addClass("hidden");


            const form = document.getElementById("form");

                form.addEventListener("submit", function(e) {

                    let addressMatch = false;
                    e.preventDefault();
                    let errorMessage ="";
                    document.getElementById("error").innerHTML = errorMessage;

                    const customerName = $("#customerName").val();
                    const productName = $("#productName").val();
                    const address = $("#address").val();
                    const payment = $("#payment").val();
                    const price = $("#price").val();
                    let matchFound = false;

                    const url2 = "http://localhost:8084/customer/getCustomer/"+customerName;
                    fetch(url2)
                        .then(response => response.json())
                        .then(data => {

                            if (data.length==0) {
                                console.log("customer Name is wrong");
                                let errorMessage = "customer Name is wrong";
                                document.getElementById("error").innerHTML = errorMessage;
                                }
                            else{
                            const url = "http://localhost:8080/product/getByName/"+productName;
                            fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                data.forEach(function(obj) {
                                    console.log(obj.price);
                                    if(obj.price==price){
                                        matchFound = true;

                                    }
                                });
                                if (data.length==0) {
                                console.log("product Name is wrong");
                                let errorMessage = "product Name is wrong";
                                document.getElementById("error").innerHTML = errorMessage;
                                } else if(!matchFound){
                                     console.log("price is not same");
                                     let errorMessage = "price is wrong";
                                     document.getElementById("error").innerHTML = errorMessage;
                                 }
                                 else{
                                        $.getJSON("/order/allOrderDetails", function(order) {

                                            order.forEach(function(obj) {
                                            console.log(obj.fullAddress);
                                            let string1 = obj.fullAddress;
                                                console.log(string1.localeCompare(address));

                                                if (string1.localeCompare(address) == 0) {
                                                  addressMatch = true;

                                                }


                                            });
                                                console.log(addressMatch);
                                                if(!addressMatch){
                                                    console.log("address is wrong");
                                                    let errorMessage = "address is wrong";
                                                    document.getElementById("error").innerHTML = errorMessage;
                                                }
                                                else{
                                                        console.log("entering the final state");
                                                        let jsonData = { "customerName": customerName, "productName": productName, "price":price, "address":address, "payment":payment};
                                                            fetch("/order/postOrderDetails", {
                                                                method: "POST",
                                                                body: JSON.stringify(jsonData),
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                }
                                                            })
                                                            .then(response => response.json())
                                                            .then(

                                                            document.getElementById("error").innerHTML = "Successfully created order"
                                                            )
                                                            .catch(error => console.error(error));

                                                }
                                        });
                                 }


                                })
                            }



                        });









        });
        });





















    showTableBtn.addEventListener("click", function() {
        orderTable.removeClass("hidden");
        formContainer.hide();
        $.getJSON("/order/allOrderDetails", function(order) {
            $('#orderTable').DataTable({
                data: order,
                columns: [
                    { data: 'orderId' },
                    { data: 'customerName' },
                    { data: 'productName' },
                    { data: 'price' },
                    {
                      data: null,
                      defaultContent: "",
                      createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html("<button selectedOrderId="+cellData.orderId+" class='showFormButton'>Show Form</button>");
                                    }
                    }
                ]
            });
            const showFormButton = document.querySelector(".showFormButton");
            const formContainer = document.querySelector("#formOrderContainer");
            const detailsForm = document.querySelector("#inputForm");
            showFormButton.addEventListener("click", () => {
                  formContainer.style.display = "block";


                });
        });
    });

});









