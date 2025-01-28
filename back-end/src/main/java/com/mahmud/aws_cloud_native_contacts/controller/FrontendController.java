package com.mahmud.aws_cloud_native_contacts.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController implements ErrorController {
    
    @RequestMapping(value = {
        "/",
        "/login",
        "/register",
        "/profile",
        "/contacts",
        "/forgot-password",
        "/reset-password"
    })
    public String forward() {
        return "forward:/index.html";
    }

    @RequestMapping("/error")
    public String handleError() {
        return "forward:/index.html";
    }
}
