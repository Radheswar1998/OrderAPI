package com.order.app.repository;

import com.order.app.entity.OrderInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OrderInfoRepository extends CrudRepository<OrderInfo,Long> {

    @Query(value = "SELECT MAX(transcation_id) FROM orders;",nativeQuery = true)
    public long findMaxTransaction();

    @Query(value = "select customer_id from customer where customer_name=:customerName",nativeQuery = true)
    public long findCustomerId(String customerName);

    @Query(value = "select product_id from product where product_name=:productName",nativeQuery = true)
    public long findProductId(String productName);

    @Query(value = "select payment_id from payment where payment_type=:payment",nativeQuery = true)
    public long findPaymentId(String payment);

    @Query(value="select * from address where CONCAT(address.address_line1, \" \", address.address_line2, \", \", address.city, \", \", address.state, \" \", address.zip) like %:address%",nativeQuery = true)
    public long findAddressId(String address);
}
