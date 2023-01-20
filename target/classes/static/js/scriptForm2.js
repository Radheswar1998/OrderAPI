$(document).ready(function() {
    //Select elements

    const inputForm = document.querySelector("#inputForm");
    const detailsForm = document.querySelector("#detailsForm");


    //Event listener for show form button


    //Event listener for input form submit
    inputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Get the input value
      const name = document.querySelector("#orderId").value;

      // Update the details form
      detailsForm.querySelector("#orderId2").value = name;
      //detailsForm.querySelector("#status").value = status;

      $.getJSON("/order/allOrderDetails", function(order) {
        order.forEach(function(obj) {
            if(obj.orderId==name){
                customerName = obj.customerName;
                statusId = obj.statusId;
            }
        });
        detailsForm.querySelector("#customerName2").value = customerName;
        });

        $.getJSON("/order/allOrderDetails", function(order) {
                order.forEach(function(obj) {
                    if(obj.orderId==name){

                        status = obj.description;
                    }
                });
                detailsForm.querySelector("#status").value = status;
                });



      // Show the details form
      inputForm.style.display = "none";
      detailsForm.style.display = "block";
      $(this).submit();
    });
    detailsForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const statusIdUpdated = $("#statusId").val();
          const orderIdUpdated =  $("#orderId2").val();
          const data = { "statusId": statusIdUpdated, "orderId":orderIdUpdated};
          console.log(data);
          fetch("/order/updateStatus", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then($(this).submit())

          document.getElementById("error").innerHTML = "successfully updated Status";
          });


});