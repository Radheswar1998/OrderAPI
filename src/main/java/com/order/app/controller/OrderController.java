package com.order.app.controller;

import com.order.app.entity.Order;
import com.order.app.entity.OrderInfo;
import com.order.app.model.OrderInformation;
import com.order.app.repository.OrderInfoRepository;
import com.order.app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderInfoRepository orderInfoRepository;

    @GetMapping("/allOrderDetails")
    public List<Order> getAllProductsDetails(){
        List<Order> ordersInDB = (List<Order>) orderRepository.findAll();
        return ordersInDB;

    }

    @PostMapping("/postOrderDetails")
    public OrderInfo createOrder(@RequestBody OrderInformation order){
        long statusId = 1;
        OrderInfo newOrder = new OrderInfo();
        newOrder.setOrderId(null);
        newOrder.setCustomerId(orderInfoRepository.findCustomerId(order.getCustomerName()));
        newOrder.setPaymentId(orderInfoRepository.findPaymentId(order.getPayment()));
        newOrder.setProductId(orderInfoRepository.findProductId(order.getProductName()));
        newOrder.setAddressId(orderInfoRepository.findAddressId(order.getAddress()));
        newOrder.setStatusId(statusId);
        newOrder.setTransactionId(orderInfoRepository.findMaxTransaction()+1);
        orderInfoRepository.save(newOrder);
        return newOrder;
    }




}
