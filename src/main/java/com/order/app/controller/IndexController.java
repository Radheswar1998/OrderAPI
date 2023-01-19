package com.order.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class IndexController {

    @RequestMapping("/index")
    public String indexPage(){
        return "index";
    }

    @RequestMapping("/")
    public String mainPage(){
        return "index";
    }
    @RequestMapping("/orderDetails")
    public String orderPage(){
        return "order";
    }

}
